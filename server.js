const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require ("./routes/authRoutes");

const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("DB connected successfully"))
.catch((err)=>console.log("Unable to connect to DB",err));

app.use("/api/auth",authRoutes);
app.listen(process.env.PORT, ()=>console.log("Server Started at PORT",process.env.PORT));