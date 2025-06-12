DROP TABLE IF EXISTS invoices;

CREATE TABLE invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_no VARCHAR(50),
    issue_date DATE,
    due_date DATE,
    total_amount REAL,
    currency VARCHAR(10),
    vendor VARCHAR(200)
);