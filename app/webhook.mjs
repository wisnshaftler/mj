import express from "express";
import path from "path";
import dbconnection from "./dbconnection.mjs";
import validator from "./validator.mjs";
import fs from "fs";
import { JSDOM, ResourceLoader, VirtualConsole } from "jsdom";

const __dirname = path.resolve();

const webhook_router = express.Router();


webhook_router.post("/imagine", async (req, res) => {
    if (!validator.notFalsy(req.body.response)) {
        res.status(400).send({ status: 0, msg: "Bad request" })
        return;
    }

    if (!validator.isObject(req.body.response)) {
        res.status(400).send({ status: 0, msg: "Bad request" })
        return;
    }

    let sql = `update jobs set imageUrls = ?, progress = ? , tnlResponse = ? where uniqueRequestHash = ?`;
    dbconnection.query(sql, [req.body.response.imageUrls.join(","), req.body.progress, JSON.stringify(req.body.response), req.body.response.ref]);

    const resourceLoader = new ResourceLoader({
        strictSSL: true,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    });

    res.status(200).send({ status: 1, msg: "Success" });

    const virtualConsole = new VirtualConsole();

    //download image from URL
    console.log(req.body.response.imageUrls[0])
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body><h1>AAA</h1></body></html>', {
        referrer: undefined,
        contentType: "text/html",
        includeNodeLocations: true,
        runScripts: "dangerously",
        resources: "usable",
        pretendToBeVisual: true,
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        cookieJar: true,
        storageQuota: 10000000,
        resources: resourceLoader,
        VirtualConsole: virtualConsole
    });

    virtualConsole.on("error", (...data) => console.log(data));
    virtualConsole.on("warn", (...data) => console.log(data));
    virtualConsole.on("info", (...data) => console.log(data));
    virtualConsole.on("dir", (...data) => console.log(data));

    const domResult = await dom.window.eval(` new Promise(resolve=>{
            const img = document.createElement("img");
            img.src  = "https://picsum.photos/200/300"
            img.onload = function(){
                resolve("im loaded");
            }
            img.error = function(){
                resolve("im error");
            }
            document.body.appendChild(img)
        })
    `);
    console.log(domResult)

});


export default webhook_router;