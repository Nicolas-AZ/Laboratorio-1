// src\features\todos\infraestructure\repository.impl.ts

import { type PaginationResponseEntity } from '../../shared';

import {
	type TodoEntity,
	type TodoDatasource,
	type GetTodoByIdDto,
	type UpdateTodoDto,
	type CreateTodoDto,
	type GetTodosDto,
	type TodoRepository
} from '../domain';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(query: GetTodosDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.datasource.getAll(query);
	}

	async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.datasource.getById(getByIdDto);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		return await this.datasource.update(updateDto);
	}

	async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		return await this.datasource.delete(getByIdDto);
	}
}
