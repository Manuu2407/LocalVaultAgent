import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import invoiceRouter from "./invoiceRouter.ts";
import express from 'express';

export const db = await open({
  filename: './database/sqlite/local-vault-agent.db',
  driver: sqlite3.Database,
});

const invoicesSchema = await Deno.readTextFile('./database/sqlite/invoices.sql');
await db.exec(invoicesSchema);

const app = express();
const port = 3000;

app.locals.db = db;

app.use(express.json());
app.use(invoiceRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});