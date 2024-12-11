import { rejects } from 'assert'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'
export const createToken = (id:string,email:string,expiresIn:string) => {
    const payload = {id,email}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    })
    return token
}

export const verifyToken = async (req,res,next) => {
    const token = req.signedCookies['auth_token']
    if(!token || token.trim() === "")
    {
        return res.status(401).json({message: "token not recieved"})
    }
    return new Promise<void>((resolve,reject)=> {
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err)
            {
                reject(err.message)
                return res.status(401).json({messsage: "Token Expired"})
            }else{
                resolve()
                res.locals.jwtData = success
                return next()
            }
        })
    })
}