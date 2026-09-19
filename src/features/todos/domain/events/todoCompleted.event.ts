import { type TodoEntity } from '../entities';

export interface TodoCompletedObserver {
	onTodoCompleted: (todo: TodoEntity) => Promise<void> | void;
}

export class TodoCompletedEvents {
	private readonly observers: TodoCompletedObserver[] = [];

	public subscribe(observer: TodoCompletedObserver): void {
		this.observers.push(observer);
	}

	public async notify(todo: TodoEntity): Promise<void> {
		await Promise.all(this.observers.map(async (observer) => await observer.onTodoCompleted(todo)));
	}
}
