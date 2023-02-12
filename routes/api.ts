import { Router } from 'express';
import customerRouter from '../customers/api/customer-route';

const router = Router();

router.use('/api/customers', customerRouter);

export default router;