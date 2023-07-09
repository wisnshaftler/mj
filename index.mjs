import express from 'express';
import path from "path";
import cookieParser from 'cookie-parser';
import cors from "cors";
import siteSettings from "./config.mjs";
import webhook_router from './webhook.mjs';

import * as dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 5555;
const server = express();

const __dirname = path.resolve();

const corsOptions = {
    origin: 'http://localhost:3000', // replace with your React app's URL
    optionsSuccessStatus: 200,
    credentials: true, // enable cookies
}
server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.use('/public', express.static(path.join(__dirname, 'PUBLIC')));
//server.use("/temp", jwt.authenticateCookie, express.static(path.join(__dirname, "TEMP")))

server.use("/webhooks", webhook_router);

server.get("/", (req, res)=>{
    res.send({ default: "default"})
})

server.listen(PORT, function (e) {
    console.log(`Server is up and running in port ${PORT}`);
})