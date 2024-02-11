import { app } from "./app.js";
import connectDB from "./database/db.js";
import dotenv from 'dotenv';


dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch( err => {
    console.log("Mongo DB connection failed !!! ", err);
})