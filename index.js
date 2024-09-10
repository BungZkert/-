import express from "express";

import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();


const app =  express();

// using middlewares//
app.use(express.json());

const port  = process.env.PORT;

app.get("/", (req, res)=>{
    res.send("server is working");
}); 

app.use("/uploads",express.static("uploads")); 

// import routes//
import userRoutes from './routes/user.js'
import coureRoutes from './routes/course.js'
import adminRoutes from './routes/admin.js'

//user routes//
app.use("/api", userRoutes);
app.use("/api", coureRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
    connectDb()
});