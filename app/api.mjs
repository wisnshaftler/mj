import express from "express";
import path from "path";
import crypto from "crypto";
import siteSettings from "../config.mjs";
import scheduler from "./scheduler.mjs";
import exp from "constants";
import dbconnection from "./dbconnection.mjs";

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
    }, siteSettings.imageWebhook);

    res.status(200).send({ status: 1, msg: "Received", msgId: uniqueRequestHash });
})

api_router.get("/status/:id", async (req, res) => {
    const uniqueRequestHash = req.params.id;

    //check in db for the status
    const dbResult = await dbconnection.query("SELECT * FROM jobs WHERE uniqueRequestHash =?", [uniqueRequestHash]);
    console.log(dbResult);
    console.log(dbResult.length);
    console.log(dbResult[0].progress)
    console.log(dbResult[0].imageUrls)
    

    if(dbResult.length == 0) {
        return res.status(200).send({ status: 0, msg: "Not found" });
    }
    if(dbResult.length > 1 && parseInt(dbResult[0].progress) < 100) {
        return res.status(200).send({ status: 0, msg: "processing", progress: dbResult[0].progress });
    }

    return res.status(200).send({ status:1 , msg:"done", progress: 100, imageUrls: dbResult[0].imageUrls });
});

export default api_router;