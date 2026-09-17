import { type TodoEntity } from '../entities';

export interface TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[];
}

export class AllTodosFilterStrategy implements TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[] {
		return todos;
	}
}

export class CompletedTodosFilterStrategy implements TodoFilterStrategy {
	constructor(private readonly completed: boolean) {}

	filter(todos: TodoEntity[]): TodoEntity[] {
		return todos.filter((todo) => todo.isCompleted === this.completed);
	}
}

export const resolveTodoFilterStrategy = (completed?: boolean): TodoFilterStrategy => {
	return completed === undefined ? new AllTodosFilterStrategy() : new CompletedTodosFilterStrategy(completed);
};
