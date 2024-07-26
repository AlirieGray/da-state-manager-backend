import SessionModel, { SessionDocument } from "./session-model"
import { Request, Response } from "express";
import { validatePassword } from "../resources/user/user-service";
import { signJWT } from '../../utils/jwt'
import { config } from '../../config/config'
import {findSessions, createSession, updateSession} from './session-service'

async function createUserSession(req: Request, res: Response) {
    // validate the user's password
    const user = await validatePassword(req.body)

    if (!user) {
        return res.status(401).send('Invalid email or password')
    }

    // create a session
    const session = await createSession(user._id, req.get('user-agent') || '')

    // create an access token
    const accessToken = signJWT(
        {...user, session: session._id},
        { expiresIn: config.jwt.accessTokenTtl }
    )

    // create a refresh token
    const refreshToken = signJWT(
        {...user, session: session._id},
        { expiresIn: config.jwt.refreshTokenTtl }
    )

    res.cookie('accessToken', accessToken, {
        maxAge: 8.64e7, // one day
        httpOnly: true,
        domain: config.domain,
        path: '/',
        sameSite: 'strict',
        secure: config.environment == 'DEV' ? false : true,
    })


    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: config.domain,
        path: '/',
        sameSite: 'strict',
        secure: config.environment == 'DEV' ? false : true,
    })

    // return access and refresh tokens
    return res.send({ accessToken, refreshToken })
}

async function getUserSessions(req: Request, res: Response) {
    const userID = res.locals.user._id

    const sessions = await findSessions({user: userID, valid: true})
   
    return res.send(sessions)
}

async function deleteUserSession(req: Request, res: Response) {
    const sessionID = res.locals.user.session

    await updateSession({_id: sessionID}, {valid: false})

    return res.status(200).send({
        accessToken: null,
        refreshToken: null
    })
}

export default { createUserSession, getUserSessions, deleteUserSession }