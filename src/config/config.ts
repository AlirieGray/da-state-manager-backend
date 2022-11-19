import dotenv from 'dotenv';
dotenv.config()

const MONGO_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w8ubkmf.mongodb.net/thedasDB`

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5555;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}