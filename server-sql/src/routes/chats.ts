import express from "express"
import { getChats } from "../controllers/chatController"

const router = express.Router()

router.get('/', getChats)

export default router