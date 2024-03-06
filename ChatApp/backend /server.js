import express from "express";
import dotenv from "dotenv";


import authRoutes from "./routes/auth.Route.js"
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json()); 
app.use("/api/auth",authRoutes);

dotenv.config();


app.use("/api/auth",authRoutes);



app.get("/", (req,res) => {
  
    res.send("<h2>This is root route of the Chat application which we will build for learning purpose</h2>");

});




app.listen(PORT,() => {
    connectMongoDB();
    console.log(`server is running on port ${PORT}`)
})