import express from "express";
import path from "path";

const __dirname = path.resolve();

const webhook_router = express.Router();

webhook_router.post("/imagine", async (req, res)=>{
    //save in the table
});


export default webhook_router;