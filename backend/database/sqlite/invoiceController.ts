import { Database, Statement } from 'sqlite';

interface Invoice {
  id?: number;
  invoice_no: string;
  issue_date: string;
  due_date: string;
  total_amount: number;
  currency: string;
  vendor: string;
}

class InvoiceController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createInvoice(invoice: Invoice): Promise<void> {
    const sql = `INSERT INTO invoices (invoice_no, issue_date, due_date, total_amount, currency, vendor) VALUES (?, ?, ?, ?, ?, ?)`;
    const stmt: Statement = await this.db.prepare(sql);
    await stmt.run(
      invoice.invoice_no,
      invoice.issue_date,
      invoice.due_date,
      invoice.total_amount,
      invoice.currency,
      invoice.vendor
    );
    await stmt.finalize();
  }

  async getInvoiceById(id: number): Promise<Invoice | undefined> {
    const sql = `SELECT * FROM invoices WHERE id = ?`;
    const stmt: Statement = await this.db.prepare(sql);
    const invoice = await stmt.get(id);
    await stmt.finalize();
    return invoice;
  }

  async updateInvoice(id: number, invoice: Partial<Invoice>): Promise<void> {
    // Only update provided fields
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(invoice)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    if (fields.length === 0) return;
    const sql = `UPDATE invoices SET ${fields.join(', ')} WHERE id = ?`;
    const stmt: Statement = await this.db.prepare(sql);
    await stmt.run(...values, id);
    await stmt.finalize();
  }

  async deleteInvoice(id: number): Promise<void> {
    const sql = `DELETE FROM invoices WHERE id = ?`;
    const stmt: Statement = await this.db.prepare(sql);
    await stmt.run(id);
    await stmt.finalize();
  }
}

export default InvoiceController;