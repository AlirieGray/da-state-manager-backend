import express from 'express'
import controller from './session-controller'
import requireUser from '../../middleware/require-user'

const router = express.Router()

router.post('/new', controller.createUserSession)
router.delete('/delete', requireUser, controller.deleteUserSession)
router.get('/get', requireUser, controller.getUserSessions)

export = router