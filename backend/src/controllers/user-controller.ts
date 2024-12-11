import User from "../models/User.js"
import { hash, compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js"

export const getAllUsers = async (req, res) =>
{
    try {
        const users = await User.find()
        return res.status(200).json({
            users
        })
    } catch (error) {
        console.log(error)
       return res.status(400).json({success: false })
    }
}

export const register = async (req, res) =>
{
    const{email, name, password} = req.body;    
    try {
        const userAlreadyExists = await User.findOne({
            $or: [
                {email:email},
                {name:name}
            ]
        });
        if(userAlreadyExists)
        {
            return res.status(401).json({success: false, message: "User already exists"});
        }
        const hashedPassword = await hash(password, 10);
        const user = new User(
            {
                email,
                name,
                password: hashedPassword,
            }
        )
        await user.save();

        res.clearCookie("auth_token",{
            httpOnly: true,
            domain: "localhost",
            signed: true
        })

        const token = createToken(user._id.toString(), user.email, "7d")
            const expires = new Date()
            expires.setDate(expires.getDate() + 7)
            res.cookie("auth_token", token, {
                path: "/",
                domain: "localhost",
                expires,
                httpOnly: true,
                signed: true
            })
        
        res.status(201).json({
            success: true,
            message: "ok",
            name:user.name,
            email:user.email
        })
        

    }catch(error){
        return res.status(400).json({success: false, message: error.message});
    }
 }
export const login = async (req, res, next) =>
{
    try {
        const{email, password} = req.body; 
        const user = await User.findOne({ email }) 
        if (!user)
        {
            return res.status(401).json({message: "user doesn't exist"})
        }  
        const correctPassword = await compare(password, user.password)
        if(!correctPassword)
        {
            return res.status(403).send("Incorrect Password")
        }

        res.clearCookie("auth_token",{
            httpOnly: true,
            domain: "localhost",
            signed: true
        })

        const token = createToken(user._id.toString(), user.email, "7d")
        const expires = new Date()
        expires.setDate(expires.getDate() + 7)
        res.cookie("auth_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        })

        return res.status(200).json({message:"ok", name:user.name,email:user.email})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: error.message});
    }
}

export const verifyUser = async (req, res, next) =>
{
    try {
        const user = await User.findById(res.locals.jwtData.id ) 
        if (!user)
        {
            return res.status(401).json({message: "user not registered or token issue"})
        }  
        if(user._id.toString() !== res.locals.jwtData.id)
        {
            return res.status(401).json({message: "Permissions mismatch"})
        }

        return res.status(200).json({message:"ok", name:user.name,email:user.email})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: error.message});
    }
}

export const logout = async (req, res, next) =>
{
    try {
        const user = await User.findById(res.locals.jwtData.id ) 
        if (!user)
        {
            return res.status(401).json({message: "user not registered or token issue"})
        }  
        if(user._id.toString() !== res.locals.jwtData.id)
        {
            return res.status(401).json({message: "Permissions mismatch"})
        }

        res.clearCookie("auth_token",{
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path:"/"
        })

        return res.status(200).json({message:"ok", name:user.name,email:user.email})
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, message: error.message});
    }
}



    

