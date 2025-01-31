import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

/*CONFIGURATIONS */
dotenv.config();

const app = express(); // create express app
app.use(express.json()) // to parse json
app.use(helmet()); // to secure headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // to fix cors error
app.use(morgan("common")); // to log requests
app.use(bodyParser.json()) // to parse json
app.use(bodyParser.urlencoded({ extended: false })) // to parse url
app.use(cors()); // to enable cors

console.log("hello")

/*MONGOOSE SETUP */
