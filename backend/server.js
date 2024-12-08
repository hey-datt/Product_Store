// const express = require('express');

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import productRoutes from "./routes/product.routes.js"
import cors from 'cors'

dotenv.config();
const app = express();

app.use(
    cors({
        origin: "http://localhost:3002", // Your frontend's origin (React app)
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        credentials: true, // Allow cookies (if necessary)
    })
);

//step-6
app.use(express.json()); //A middleware that allows to accept json data in req.body

//step-2
// app.get("/", (req, res) => {
//     res.send("Server is ready");
// }); // --> if we use /products, it displays all the products in db
const PORT = process.env.PORT || 4000;


//step-1
app.listen(PORT, () => {
    //step-4
    connectDB();

    console.log(`Server started at "http://localhost:${PORT}`);
});

//step-3 -> go to "config/db.config.js"

//step-5 -> go to models/product.model.js

//step-7 -> creating a route folder and make the codebase looks good-> go to routes/product.routes.js
//step-8 to step-12 in "routes/product.routes.js"

//step - 13
app.use("/api/products", productRoutes)

//step-14 -> go to "controllers/product.controller.js"
