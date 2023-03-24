import express from "express";
import dotenv from "dotenv";

import { DataSource } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";

import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransaction } from "./routes/create_transaction";
import { connectBankerToClient } from "./routes/connect_banker_to_client";
import { deleteClient } from "./routes/delete_client";

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
    app.use(createClientRouter);
    app.use(createBankerRouter);
    app.use(createTransaction);
    app.use(connectBankerToClient);
    app.use(deleteClient);

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to Postgres", error);
  });
