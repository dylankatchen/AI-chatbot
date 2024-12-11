import { Router } from "express"
import userRouter from "./user-routes.js"
import chatRouter from "./chat-routes.js"

const router = Router()

router.use("/user", userRouter)
router.use("/chat", chatRouter)

export default router