import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import PaymentController from "./paymentController.ts";
import paymentRouter from "./paymentRouter.ts";
import express from 'express';

export const db = await open({
  filename: './database/sqlite/local-vault-agent.db',
  driver: sqlite3.Database,
});

const app = express();
const port = 3000;

const paymentController = new PaymentController(db);

app.use(express.json());
app.use(paymentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});