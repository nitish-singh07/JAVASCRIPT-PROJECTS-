import mongoose from "mongoose";

const connectMongoDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {

        console.log("error connecting to MongoDB",error.message);
        
    }
};

export default connectMongoDB;