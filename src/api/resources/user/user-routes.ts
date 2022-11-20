import express from 'express'
import controller from './user-controller'

const router = express.Router()

router.post('/create', controller.createUser)
router.get('/get/:userID', controller.readUser)
router.get('/get/', controller.readAll)
router.patch('/get/:userID', controller.updateUser)
router.delete('/get/:userID', controller.deleteUser)

export = router