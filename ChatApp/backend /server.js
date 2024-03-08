import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import authRoutes from "./routes/auth.Route.js"
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7000;

app.use(express.json()); 
app.use(cookieParser());

app.use("/api/auth",authRoutes);




app.use("/api/auth",authRoutes);



app.get("/", (req,res) => {
  
    res.send("<h2>This is root route of the Chat application which we will build for learning purpose</h2>");

});




app.listen(PORT,() => {
    connectMongoDB();
    console.log(`server is running on port ${PORT}`)
})