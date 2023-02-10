import { CustomerRepository } from "./customer-repository";

describe('CustomerRepository', () => {
	describe('inital setup', () => {
		it('should be defined', () => {
			expect(CustomerRepository).toBeDefined();
		});
		it('should be a class', () => {
			expect(typeof CustomerRepository).toBe('function');
		});
		it('should have a constructor', () => {
			expect(CustomerRepository.prototype.constructor).toBeDefined();
		});
		it('should have a constructor that takes no arguments', () => {
			expect(CustomerRepository.prototype.constructor.length).toBe(0);
		});
		it('should have a constructor that returns an instance of CustomerRepository', () => {
			expect(new CustomerRepository()).toBeInstanceOf(CustomerRepository);
		}
		);
	})
});
