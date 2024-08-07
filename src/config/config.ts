import dotenv from 'dotenv';
dotenv.config()

const MONGO_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w8ubkmf.mongodb.net/thedasDB&authSource=admin`

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5555

const PUBLIC_JWT_KEY = process.env.PUBLIC_KEY ? (process.env.PUBLIC_KEY as string) : ''

const PRIVATE_JWT_KEY = process.env.PRIVATE_KEY ? (process.env.PRIVATE_KEY as string) : ''

const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR || 10)

const DOMAIN = process.env.DOMAIN ? (process.env.DOMAIN as string) : 'localhost'

// DEV, STAGING, PROD
const ENVIRONMENT = process.env.ENVIRONMENT ? (process.env.ENVIRONMENT as string) : 'DEV'

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    },
    salt: {
        saltWorkFactor: SALT_WORK_FACTOR
    },
    jwt: {
        publicKey: PUBLIC_JWT_KEY,
        privateKey: PRIVATE_JWT_KEY,
        accessTokenTtl: '1d',
        refreshTokenTtl: '1y'
    },
    domain: DOMAIN,
    environment: ENVIRONMENT,
}
