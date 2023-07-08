import express from "express";
import path from "path";

const __dirname = path.resolve();

const api_router = express.Router();


api_router.get("/status/:id", (req, res)=>{
    console.log("received")
    res.status(200).send({ status:1  });
});