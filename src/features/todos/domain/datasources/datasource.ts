// src\features\todos\domain\datasources\datasource.ts

import { type PaginationResponseEntity } from '../../../shared';
import { type UpdateTodoDto, type CreateTodoDto, type GetTodoByIdDto, type GetTodosDto } from '../dtos';
import { type TodoEntity } from '../entities';

export abstract class TodoDatasource {
	abstract create(createDto: CreateTodoDto): Promise<TodoEntity>;
	abstract getAll(query: GetTodosDto): Promise<PaginationResponseEntity<TodoEntity[]>>;
	abstract getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity>;
}
