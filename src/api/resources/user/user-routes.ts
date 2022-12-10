import express from 'express'
import controller from './user-controller'
import requireUser from '../../../middleware/require-user'

const router = express.Router()

router.post('/create', controller.createUser)
router.get('/get/:userID', requireUser, controller.readUser)
router.get('/get/', requireUser, controller.readAll)
router.get('/get/me', requireUser, controller.getCurrentUser)
router.patch('/get/:userID', requireUser, controller.updateUser)
router.delete('/delete/:userID', requireUser, controller.deleteUser)

export = router