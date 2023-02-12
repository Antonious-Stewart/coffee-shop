import { NextFunction, Request, Response, Router } from 'express';
import { CustomerController } from '../controller/customer-controller';
import { CustomerRepository } from '../repository/customer-repository';
import { CustomerService } from '../service/customer-service';
import { catchAsyncErrors } from '../../util';

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const router = Router();

router.route('/')
	.get(catchAsyncErrors(async (req: Request<any, unknown, { name: string, order_id: string }>, res: Response, next: NextFunction) => {
		const customers = await customerController.getCustomer(req.body);
		res.status(200).json({ message: 'success', data: customers });
	}))
	.post(catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
		await customerController.createCustomer(req.body);
		res.status(201).send();
	}));

router.route('/:name')
	.put(catchAsyncErrors(async (req: Request<{ name: string }, unknown, { order_id: string, name: string }>, res: Response, next: NextFunction) => {
		await customerController.updateCustomer({ name: req.params.name, order_id: req.body.order_id }, { name: req.body.name });
		res.status(200).send();
	}))
	.delete(catchAsyncErrors(async (req: Request<{ name: string }, unknown, { order_id: string }>, res: Response, next: NextFunction) => {
		await customerController.deleteCustomer({ name: req.params.name, order_id: req.body.order_id });
		res.status(200).send();
	}));

export default router;