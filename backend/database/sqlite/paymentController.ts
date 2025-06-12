import { Database, Statement } from 'sqlite';

class PaymentController {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  async createPayment(payment: any): Promise<void> {
    const sql = `INSERT INTO payments (amount, currency, status, due_date) VALUES (?, ?, ?, ?)`;
    const stmt: Statement = await this.db.prepare(sql);
    await stmt.run(payment.amount, payment.currency, payment.status);
    await stmt.finalize();
  }

  async getPaymentById(id: number): Promise<any> {
    const sql = `SELECT * FROM payments WHERE id = ?`;
    const stmt: Statement = await this.db.prepare(sql);
    const payment = await stmt.get(id);
    await stmt.finalize();
    return payment;
  }

  async updatePaymentStatus(id: number, status: string): Promise<void> {
    const sql = `UPDATE payments SET status = ? WHERE id = ?`;
    const stmt: Statement = await this.db.prepare(sql);
    await stmt.run(status, id);
    await stmt.finalize();
  }
}

export default PaymentController;