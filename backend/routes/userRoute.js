// first import express from express package
import express from "express"

// import all from 'userController.js'
import { loginUser, registerUser, adminUser } from "../controllers/userController.js"



const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminUser)

export default userRouter;