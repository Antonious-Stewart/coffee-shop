import { CustomerService } from "../service/customer-service";
import { CreateCustomerDto } from "../types";
import { CustomerDto } from "../types/dtos/customer-dto";

export class CustomerController {
	constructor(private readonly customerService: CustomerService) { }

	async createCustomer(dto: CreateCustomerDto): Promise<void> {
		try {
			await this.customerService.create(dto);
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}

	async getCustomer(options: { name: string, order_id: string }): Promise<CustomerDto[]> {
		try {
			return this.customerService.get(options);
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}

	async updateCustomer(options: { name: string, order_id: string }, values: { name: string }): Promise<void> {
		try {
			console.log(options.name)
			await this.customerService.update(options, values);
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}

	async deleteCustomer(options: { name: string, order_id: string }): Promise<void> {
		try {
			await this.customerService.delete(options);
		} catch (error) {
			console.error(error);
			throw new Error(error as string);
		}
	}
}