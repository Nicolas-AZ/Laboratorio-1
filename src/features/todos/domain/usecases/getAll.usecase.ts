import { type TodoFilterStrategy } from '../strategies/todo-filter.strategy';
import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';

export interface GetTodosUseCase {
	execute: (pagination: PaginationDto, strategy?: TodoFilterStrategy) => Promise<PaginationResponseEntity<TodoEntity[]>>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(pagination: PaginationDto, strategy?: TodoFilterStrategy): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return strategy ? await this.repository.getAll(pagination, strategy) : await this.repository.getAll(pagination);
	}
}
