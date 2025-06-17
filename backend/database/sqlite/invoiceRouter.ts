import express, { Request, Response } from 'express';
import InvoiceController from './invoiceController.ts';

const router = express.Router();

router.post('/invoices', async (req: Request, res: Response) => {
  try {
    const invoice = req.body;
    const invoiceController = new InvoiceController(req.app.locals.db);
    await invoiceController.createInvoice(invoice);
    res.status(201).json({ message: 'Invoice created successfully' });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

router.get('/invoice/:id', async (req: Request, res: Response) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const invoiceController = new InvoiceController(req.app.locals.db);
    const invoice = await invoiceController.getInvoiceById(invoiceId);
    if (invoice) {
      res.status(200).json(invoice);
    } else {
      res.status(404).json({ error: 'Invoice not found' });
    }
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

router.get('/invoices', async (req: Request, res: Response) => {
  try {
    const invoiceController = new InvoiceController(req.app.locals.db);
    const invoices = await invoiceController.getInvoices();
    if (invoices) {
      res.status(200).json(invoices);
    } else {
      res.status(404).json({ error: 'No invoice found' });
    }
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

router.put('/invoice/:id', async (req: Request, res: Response) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const updateFields = req.body;
    const invoiceController = new InvoiceController(req.app.locals.db);
    await invoiceController.updateInvoice(invoiceId, updateFields);
    res.status(200).json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

router.delete('/invoice/:id', async (req: Request, res: Response) => {
  try {
    const invoiceId = parseInt(req.params.id, 10);
    const invoiceController = new InvoiceController(req.app.locals.db);
    await invoiceController.deleteInvoice(invoiceId);
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

export default router;