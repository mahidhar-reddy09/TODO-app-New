import express from "express";
import routes from "./routes/index.js";
import cors from 'cors';
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(routes)
app.listen(8800, () => {
    console.log("Connected to port 8800!")
})