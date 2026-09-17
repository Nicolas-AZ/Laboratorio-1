import { type TodoEntity } from '../entities';

export interface TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[];
}

export class AllTodosStrategy implements TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[] {
		return todos;
	}
}

export class CompletedTodosStrategy implements TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[] {
		return todos.filter((todo) => todo.isCompleted);
	}
}

export class PendingTodosStrategy implements TodoFilterStrategy {
	filter(todos: TodoEntity[]): TodoEntity[] {
		return todos.filter((todo) => !todo.isCompleted);
	}
}