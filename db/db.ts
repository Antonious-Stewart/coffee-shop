import { Client } from 'pg';
import envs from '../../envs';

export default (() => {
	let instance: Client;

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
			}
			return instance;
		} catch (error) {
			console.error(error);
			throw new Error('Error connecting to DB');
		}
	}
	return getInstance();
})();