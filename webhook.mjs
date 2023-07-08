import express from "express";
import path from "path";

const __dirname = path.resolve();

const webhook_router = express.Router();

webhook_router.get("/image_callback", (req, res)=>{
    console.log("in the image callback");
    res.send({ received : true });
});


export default webhook_router;