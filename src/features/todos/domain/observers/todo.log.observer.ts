import { type TodoEntity } from '../entities';
import { type TodoObserver } from './todo.observer';

export class TodoLogObserver implements TodoObserver {
	update(todo: TodoEntity): void {
		console.log(`[TODO LOG] La tarea ${todo.id} fue completada`);
	}
}

