import mongoose from "mongoose"

async function connectToDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        throw new Error("cant connect to mongodb")
    }
}

async function disconnectFromDB() {
    try {
        mongoose.disconnect()
    } catch (error) {
        throw new Error("cant disconnect from mongodb")
    }
}

export {connectToDB, disconnectFromDB}