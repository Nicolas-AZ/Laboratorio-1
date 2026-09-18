import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';
import { type TodoFilterStrategy } from '../strategies';

export interface GetTodosUseCase {
	execute: (
		pagination: PaginationDto,
		filterStrategy?: TodoFilterStrategy
	) => Promise<PaginationResponseEntity<TodoEntity[]>>;
}

export class GetTodos implements GetTodosUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(
		pagination: PaginationDto,
		filterStrategy?: TodoFilterStrategy
	): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return filterStrategy !== undefined
			? await this.repository.getAll(pagination, filterStrategy)
			: await this.repository.getAll(pagination);
	}
}
