import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import { config } from './config/config'
import userRoutes from './api/resources/user/user-routes'
import worldstateRoutes from './api/resources/worldstate/worldstate-routes'
import sessionRoutes from './api/session/session-routes'
import deserializeUser from './middleware/deserialize-user'

const router = express()

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority'})
    .then(() => {
        console.log('connected')
        StartServer()
    })
    .catch(e => {
        console.log(e)
    })

const StartServer = () => {
    router.use((req,res,next) => {
        console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)
        
        res.on('finish', () => {
            console.log(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`)
        })

        next()
    })

    router.use(express.urlencoded({extended: true}))
    router.use(express.json())
    router.use(deserializeUser)
    router.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', "*")
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
            return res.status(200).json({})
        }

        next()
    })

    /** User Routes **/
    router.use('/users', userRoutes)

    /** Session Routes **/
    router.use('/session', sessionRoutes)

    /** World State Routes */
    router.use('/worldstates', worldstateRoutes)

    /** Health check **/
    router.get('/ping', (req, res, next) => res.status(200).json(200).json({message: 'pong'}))

    /** Error Handling **/
    router.use((req, res, next) => {
        const error = new Error('route not found')
        console.error(error)
        return res.status(404).json({message: error.message})
    })

    http.createServer(router).listen(config.server.port, () => console.log(`Listening on port: ${config.server.port}`))
}
