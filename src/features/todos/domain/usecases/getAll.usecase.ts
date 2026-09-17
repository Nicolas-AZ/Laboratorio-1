import { type PaginationResponseEntity } from '../../../shared';
import { type GetTodosDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';

export interface GetTodosUseCase {
	execute: (query: GetTodosDto) => Promise<PaginationResponseEntity<TodoEntity[]>>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(query: GetTodosDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.repository.getAll(query);
	}
}
