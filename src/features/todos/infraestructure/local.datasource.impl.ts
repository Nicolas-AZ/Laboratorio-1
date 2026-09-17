import { ONE, ZERO, AppError } from '../../../core';
import { type PaginationDto, type PaginationResponseEntity } from '../../shared';
import {
	TodoEntity,
	type CreateTodoDto,
	type GetTodoByIdDto,
	type UpdateTodoDto,
	type TodoDatasource
} from '../domain';

const SEED_TODOS = [
	{
		id: 1,
		text: 'First TODO...',
		isCompleted: false
	},
	{
		id: 2,
		text: 'Second TODO...',
		isCompleted: false
	}
];

type RawTodo = (typeof SEED_TODOS)[number];


export class TodoDatasourceImpl implements TodoDatasource {
	private readonly todos: RawTodo[];

	constructor(seed: RawTodo[] = SEED_TODOS) {
		this.todos = [...seed];
	}

	public async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		const { page, limit } = pagination;

		const todos = this.todos;
		const total = this.todos.length;

		const totalPages = Math.ceil(total / limit);
		const nextPage = page < totalPages ? page + ONE : null;
		const prevPage = page > ONE ? page - ONE : null;

		return {
			results: todos.slice((page - ONE) * limit, page * limit).map((todo) => TodoEntity.fromJson(todo)),
			currentPage: page,
			nextPage,
			prevPage,
			total,
			totalPages
		};
	}

	public async getById(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const todo = this.todos.find((todo) => todo.id === getByIdDto.id);
		if (!todo) throw AppError.notFound(`Todo with id ${getByIdDto.id} not found`);
		return TodoEntity.fromJson(todo);
	}

	public async create(createDto: CreateTodoDto): Promise<TodoEntity> {
		const createdTodo = { id: this.todos.length + ONE, ...createDto, isCompleted: false };
		this.todos.push(createdTodo);
		return TodoEntity.fromJson(createdTodo);
	}

	public async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		const { id } = await this.getById(updateDto);
		const index = this.todos.findIndex((todo) => todo.id === id);

		this.todos[index] = {
			...this.todos[index],
			...Object.fromEntries(Object.entries(updateDto).filter(([_, v]) => v !== undefined))
		};

		return TodoEntity.fromJson(this.todos[index]);
	}

	public async delete(getByIdDto: GetTodoByIdDto): Promise<TodoEntity> {
		const { id } = await this.getById(getByIdDto);
		const index = this.todos.findIndex((todo) => todo.id === id);
		const deletedTodo = this.todos.splice(index, ONE)[ZERO];
		return TodoEntity.fromJson(deletedTodo);
	}
}