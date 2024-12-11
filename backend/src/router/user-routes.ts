import { Router } from "express"
import { getAllUsers, login, logout, register, verifyUser } from "../controllers/user-controller.js"
import { loginValidator, signupValidator, validate } from "../utils/validator.js"
import { verifyToken } from "../utils/token-manager.js"

const userRouter = Router()
userRouter.get("/",getAllUsers)
userRouter.post("/signup",validate(signupValidator), register)
userRouter.post("/login",validate(loginValidator), login)
userRouter.get("/auth-status",verifyToken, verifyUser)
userRouter.get("/logout",verifyToken, logout)


export default userRouter