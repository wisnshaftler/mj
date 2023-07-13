import express from "express";
import path from "path";
import dbconnection from "./dbconnection.mjs";
import validator from "./validator.mjs";

const __dirname = path.resolve();

const webhook_router = express.Router();

webhook_router.post("/imagine", async (req, res)=>{
    if(!validator.notFalsy(req.body.response)) {
        res.status(400).send({status:0, msg: "Bad request"})
        return;
    }

    if(!validator.isObject(req.body.response)) {
        res.status(400).send({status:0, msg: "Bad request"})
        return;
    }

    let sql = `update jobs set imageUrls = ?, progress = ? , tnlResponse = ? where uniqueRequestHash = ?`;
    dbconnection.query(sql, [req.body.response.imageUrls.join(","), req.body.progress, JSON.stringify(req.body.response), req.body.response.ref]);

    //
    res.status(200).send({status: 1, msg: "Success"});
});


export default webhook_router;