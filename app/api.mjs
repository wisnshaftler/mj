import express from "express";
import path from "path";
import crypto from "crypto";
import siteSettings from "../config.mjs";
import { Scheduler } from "timers/promises";

const __dirname = path.resolve();

const api_router = express.Router();


api_router.post("/imagine", (req, res)=> {
    const customerId = req.body.customerId;
    const prompt = req.body.prompt;
    const deviceData = req.body.deviceData;
    const hash = req.body.hash;

    const localHash = crypto.createHash('sha256').update(customerId+ siteSettings.secret).digest('hex');
    if(localHash != hash) {
        return res.status(200).send({ status: 0, msg: "hash not match" });
    }

    //give job to the next leg;

})

api_router.get("/status/:id", (req, res)=>{
    console.log("received")
    res.status(200).send({ status:1  });
});

