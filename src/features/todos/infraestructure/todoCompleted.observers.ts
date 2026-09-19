import { type TodoCompletedObserver, type TodoEntity } from '../domain';

export class TodoCompletedLogger implements TodoCompletedObserver {
	public onTodoCompleted(todo: TodoEntity): void {
		console.log(`[TODO_COMPLETED] id=${todo.id} text="${todo.text}"`);
	}
}

export class TodoCompletedConsoleNotifier implements TodoCompletedObserver {
	public onTodoCompleted(todo: TodoEntity): void {
		console.log(`[TODO_NOTIFICATION] Todo ${todo.id} was completed`);
	}
}
