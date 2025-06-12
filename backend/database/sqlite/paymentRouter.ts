import express, { Request, Response } from 'express';
import PaymentController from './paymentController.ts';

const router = express.Router();

router.post('/payments', async (req: Request, res: Response) => {
  try {
    const payment = req.body;
    const paymentController = new PaymentController(req.app.locals.db);
    await paymentController.createPayment(payment);
    res.status(201).json({ message: 'Payment created successfully' });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

router.get('/payments/:id', async (req: Request, res: Response) => {
  try {
    const paymentId = parseInt(req.params.id, 10);
    const paymentController = new PaymentController(req.app.locals.db);
    const payment = await paymentController.getPaymentById(paymentId);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ error: 'Payment not found' });
    }
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

router.put('/payments/:id/status', async (req: Request, res: Response) => {
  try {
    const paymentId = parseInt(req.params.id, 10);
    const { status } = req.body;
    const paymentController = new PaymentController(req.app.locals.db);
    await paymentController.updatePaymentStatus(paymentId, status);
    res.status(200).json({ message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

export default router;