import { AppDataSource } from "./data-source";
require('dotenv').config() //you cannot access env vars if you dont import this file at you entry point
// import express from "express";//not working
const express = require("express");
const app = express();
import { supplierRouter } from "./routers/supplierRouter";
import "reflect-metadata";
app.use(express.json() ) //if you dont add this you will get req body as undefined 
app.use("/supplier", supplierRouter);
const port = process.env.PORT;
app.get("/", (req, res) =>res.send('welcome to e commerce website')) 
AppDataSource.initialize()
  .then(async () => {
    console.log("connected to database");
  })
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

