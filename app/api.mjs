import express from "express";
import path from "path";
import crypto from "crypto";
import siteSettings from "../config.mjs";
import scheduler from "./scheduler.mjs";
import exp from "constants";

const __dirname = path.resolve();

const api_router = express.Router();


api_router.post("/imagine", (req, res) => {
    const customerId = req.body.customerId;
    const prompt = req.body.prompt;
    const deviceData = req.body.deviceData;
    const hash = req.body.hash;
    const siteHash = req.body.siteHash;

    const localHash = crypto.createHash('sha256').update(customerId + siteSettings.secret).digest('hex');
    const uniqueRequestHash = crypto.createHash("sha256").update(customerId + siteSettings.secret + prompt + String(Date.now())).digest('hex');;

    if (localHash != hash) {
        return res.status(200).send({ status: 0, msg: "hash not match" });
        
    }

    //give job to the next leg;
    scheduler.addTask(siteSettings.tnlImagine, siteHash, "POST", {
        customerId, prompt, deviceData, hash, uniqueRequestHash, webhook: siteSettings.imageWebhook
    }, "webhook");

    res.status(200).send({ status: 1, msg: "Received" });
})

api_router.get("/status/:id", (req, res) => {
    console.log("received")
    res.status(200).send({ status: 1 });
});

export default api_router;