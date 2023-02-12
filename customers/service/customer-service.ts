import { randomUUID } from "crypto";
import { CustomerRepository } from "../repository/customer-repository";
import { CreateCustomerDto, CustomerEntity } from "../types";

export class CustomerService {
	constructor(private customerRepository: CustomerRepository) { }

	mapper(dto: CreateCustomerDto): CustomerEntity {
		return { name: dto.name, uuid: randomUUID(), order_id: randomUUID() };
	}

	async create(dto: CreateCustomerDto): Promise<void> {
		try {
			const customerEntity = this.mapper(dto);
			await this.customerRepository.insert(customerEntity);
		} catch (error) {
			throw new Error(error as string)
		}
	}

	async get(options: { name: string, order_id: string }): Promise<CustomerEntity[]> {
		try {
			const customerEntity = await this.customerRepository.select(options);
			return customerEntity;
		} catch (error) {
			throw new Error(error as string)
		}
	}
}