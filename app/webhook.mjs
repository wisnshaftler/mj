import express from "express";
import path from "path";
import dbconnection from "./dbconnection.mjs";

const __dirname = path.resolve();

const webhook_router = express.Router();

webhook_router.post("/imagine", async (req, res)=>{
    if(req.body.respons == )
});


export default webhook_router;