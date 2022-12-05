import jwt from 'jsonwebtoken'
import { config } from '../config/config'

const privateKey: string = config.jwt.privateKey
const publicKey: string = config.jwt.publicKey

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)

        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch(e: any) {
        return {
            valid: false,
            expired: e.message === 'jwt expired'
        }
    }
}