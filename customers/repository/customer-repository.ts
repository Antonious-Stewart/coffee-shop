import db from '../../db/db';
import { QueryOptions } from '../../shared/types/query-options/query-options';
import { CustomerEntity } from '../types';

export class CustomerRepository {

	async insert(customerEntity: CustomerEntity): Promise<void> {
		try {
			const queryText = `INSERT INTO customers (name, uuid, order_id) VALUES ($1, $2, $3)`;
			await (await db).query(queryText, [customerEntity.name, customerEntity.uuid, customerEntity.order_id]);
		} catch (error) {
			throw new Error(error as string)
		}
	}

	async select(options: { name: string, order_id: string }): Promise<CustomerEntity[]> {
		try {
			const queryText = `SELECT * FROM customers Where name = $1 AND order_id = $2`;
			const customer = await (await db).query(queryText, [options.name, options.order_id]);
			const customerEntity = customer.rows as CustomerEntity[];
			return customerEntity;
		} catch (error) {
			throw new Error(error as string)
		}
	}
}