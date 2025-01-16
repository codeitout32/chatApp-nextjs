import express from "express"
import { createMessage, createPrivateChat, getChats } from "../controllers/chatController"
import { auth } from "../middleware/auth"

const router = express.Router()

router.use(auth)

router.get('/',auth, getChats)

router.post('/private', auth, createPrivateChat)
router.post('/:chatId', createMessage)

export default router