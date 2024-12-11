import  { OpenAIApi, ChatCompletionRequestMessage }  from "openai";
import { configureOpenAI } from "../config/openai.config.js";
import User from "../models/User.js"
import { model } from "mongoose";

export const generateChatCompletion = async (req,res,next) => {
    const{ message } = req.body
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) 
            return res.status(401).json({message:"User not registered or token issue"})
        //gett all chats
        const chats = user.chats.map(({role, content}) => ({role, content})) as ChatCompletionRequestMessage[]
        //send all chats w new one
        chats.push({content: message, role:"user"})
        user.chats.push({content:message,role:"user"})
        const config = configureOpenAI()
        const openai = new OpenAIApi(config)
        const chatResponse = await openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages: chats,
        })
        user.chats.push(chatResponse.data.choices[0].message)
        await user.save();
        return res.status(200).json({chats: user.chats})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Something went wrong"})
    }
    

}

export const sendChatsToUser = async (req, res, next) =>
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
    
            return res.status(200).json({message:"ok", chats:user.chats})
        } catch (error) {
            console.log(error);
            return res.status(400).json({success: false, message: error.message});
        }
    }
    

export const deleteChats = async (req, res, next) =>
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
            //@ts-ignore
            user.chats = []
            await user.save()
    
            return res.status(200).json({message:"ok"})
        } catch (error) {
            console.log(error);
            return res.status(400).json({success: false, message: error.message});
        }
    }