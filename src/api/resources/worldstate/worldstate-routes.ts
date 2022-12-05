import express from 'express'
import controller from './worldstate-controller'
import requireUser from '../../../middleware/require-user'

const router = express.Router()

router.post('/create', requireUser, controller.createWorldState)
router.get('/get/', requireUser, controller.readAll)
router.delete('/delete/:worldID', requireUser, controller.deleteWorldState)

export = router