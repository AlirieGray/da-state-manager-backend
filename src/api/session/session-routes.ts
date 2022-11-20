import express from 'express'
import controller from './session-controller'
import requireUser from '../../middleware/require-user'

const router = express.Router()

router.post('/login', controller.createUserSession)
router.post('/logout', requireUser, controller.deleteUserSession)
router.get('/get', requireUser, controller.getUserSessions)

export = router