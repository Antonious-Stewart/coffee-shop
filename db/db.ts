import { Client } from 'pg';
import envs from '../../envs';

export default (async () => {
	let instance: Client;

	const createCustomersTable = async (): Promise<void> => {
		await instance.query('CREATE TABLE IF NOT EXISTS customers (uuid UUID PRIMARY KEY, name VARCHAR(255), order_id UUID, FOREIGN KEY (order_id) REFERENCES orders(uuid))');
	}

	const createOrdersTable = async (): Promise<void> => {
		await instance.query('CREATE TABLE IF NOT EXISTS orders (uuid UUID PRIMARY KEY, customer_id UUID, products TEXT[], FOREIGN KEY (customer_id) REFERENCES customers(uuid))');
	}

	const createProductsTable = async (): Promise<void> => {
		await instance.query('CREATE TABLE IF NOT EXISTS products (uuid UUID PRIMARY KEY, name VARCHAR(255), price NUMERIC, quantity INT)');
	}

	const getInstance = async () => {
		try {
			if (!instance) {
				const client = new Client({
					database: envs.databaseName,
					user: envs.databaseUser,
					host: envs.databaseHost,
					port: Number(envs.databasePort),
				})
				instance = client;
				await instance.connect();
				console.log('Connected to DB');
				await createCustomersTable();
				await createOrdersTable();
				await createProductsTable();
			}
			return instance.query;
		} catch (error) {
			console.error(error);
			throw new Error('Error connecting to DB');
		}
	}
	return await getInstance();

})();