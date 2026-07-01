import mongoose from "mongoose";

const ConnectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed", err);
    }
}

export default ConnectDB