export const tryCatchWrapper = <T>(fn: Function) => async (...args: any[]): Promise<T> => {
	try {
		return await fn(...args);
	} catch (error) {
		console.error(error);
		throw new Error('Error executing function');
	}
}