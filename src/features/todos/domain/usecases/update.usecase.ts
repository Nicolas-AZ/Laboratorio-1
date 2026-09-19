import { GetTodoByIdDto, type UpdateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/respository';
import { TodoLogObserver, TodoNotificationObserver, TodoCompletionSubject } from '../observers';

export interface UpdateTodoUseCase {
	execute: (data: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(data: UpdateTodoDto): Promise<TodoEntity> {
		const getTodoByIdDto = GetTodoByIdDto.create({ id: data.id });
		const todo = await this.repository.getById(getTodoByIdDto);
		const updatedTodo = await this.repository.update(data);

		if (!todo.isCompleted && updatedTodo.isCompleted) {
			const subject = new TodoCompletionSubject();

			subject.subscribe(new TodoLogObserver());
			subject.subscribe(new TodoNotificationObserver());

			subject.notify(updatedTodo);
		}

		return updatedTodo;
	}
}
