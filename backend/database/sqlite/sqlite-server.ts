import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import InvoiceController from "./invoiceController.ts";
import paymentRouter from "./invoiceRouter.ts";
import express from 'express';

export const db = await open({
  filename: './database/sqlite/local-vault-agent.db',
  driver: sqlite3.Database,
});

const invoicesSchema = await Deno.readTextFile('./database/sqlite/invoices.sql');
await db.exec(invoicesSchema);

const app = express();
const port = 3000;

const paymentController = new InvoiceController(db);

app.use(express.json());
app.use(paymentRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});