import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

//Providing limit for JSON data to prevent server from crashing
app.use(express.json({limit: "16kb"}))

//URL data configuration for special characters and white spaces
app.use(express.urlencoded({extended: true, limit: "16kb"}));

//Storing assets such as favicon and images in 'public' folder
app.use(express.static("public"))

//Accessing and setting (CRUD) cookies on client's browser
app.use(cookieParser())

export { app }