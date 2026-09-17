import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';
import { type TodoFilterStrategy } from '../strategies/todo-filter.strategy';

export interface GetTodosUseCase {
	execute: (
		pagination: PaginationDto,
		filterStrategy: TodoFilterStrategy
	) => Promise<PaginationResponseEntity<TodoEntity[]>>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(
		pagination: PaginationDto,
		filterStrategy: TodoFilterStrategy
	): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.repository.getAll(pagination, filterStrategy);
	}
}
