import { type UpdateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { TodoCompletionNotifier } from '../observers';
import { type TodoRepository } from '../repositories/respository';

export interface UpdateTodoUseCase {
	execute: (data: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	
	constructor(
		private readonly repository: TodoRepository,
		private readonly notifier: TodoCompletionNotifier = new TodoCompletionNotifier()
	) {}

	async execute(data: UpdateTodoDto): Promise<TodoEntity> {
		const result = await this.repository.update(data);

		if (this.isMarkingAsCompleted(data)) {
			this.notifier.notify(result);
		}

		return result;
	}

	private isMarkingAsCompleted(data: UpdateTodoDto): boolean {
		return data.isCompleted === true || (data.isCompleted as unknown) === 'true';
	}
}