import { type TodoEntity } from '../entities';

export interface TodoObserver {
	update(todo: TodoEntity): void;
}

export class TodoCompletionSubject {
	private observers: TodoObserver[] = [];

	subscribe(observer: TodoObserver): void {
		this.observers.push(observer);
	}

	notify(todo: TodoEntity): void {
		this.observers.forEach((observer) => observer.update(todo));
	}
}
