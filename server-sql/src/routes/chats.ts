import express from "express"
import { createPrivateChat, getChats } from "../controllers/chatController"
import { auth } from "../middleware/auth"

const router = express.Router()

router.get('/', getChats)

router.post('/private', auth, createPrivateChat)

export default router