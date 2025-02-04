import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

import Product from './models/Product.js';
import KPI from "./models/KPI.js";
import Transaction from "./models/Transaction.js"

import { kpis, products, transactions } from "./data/data.js";

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

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes);


/*MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));  

    // ADD DATA ONE TIME OR AS NEEDED
    //  await mongoose.connection.db.dropDatabase(); // before inserting data drop database
    // KPI.insertMany(kpis); // insert data into database
    //  Product.insertMany(products);
    //  Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
