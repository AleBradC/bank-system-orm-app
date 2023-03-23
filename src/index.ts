import express from "express";
import dotenv from "dotenv";

import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";

dotenv.config();

const app = express();

const connectDB = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.USERNAME,
  database: process.env.DATABASE_NAME,
  entities: [Client, Banker, Transaction],
  synchronize: true,
});

connectDB
  .initialize()
  .then(() => {
    console.log("Connected to Postgres");

    app.use(express.json());

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to Postgres", error);
  });
