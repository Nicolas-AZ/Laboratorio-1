import { type TodoEntity } from '../entities';
import { type TodoObserver } from './todoObserver';

export class TodoCompletionNotifier {
	private readonly observers: TodoObserver[] = [];

	public subscribe(observer: TodoObserver): void {
		this.observers.push(observer);
	}

	public notify(todo: TodoEntity): void {
		this.observers.forEach((observer) => observer.onTodoCompleted(todo));
	}
}