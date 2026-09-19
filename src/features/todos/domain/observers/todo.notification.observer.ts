import { type TodoEntity } from '../entities';
import { type TodoObserver } from './todo.observer';

export class TodoNotificationObserver implements TodoObserver {
	update(todo: TodoEntity): void {
		console.log(`[NOTIFICACIÓN] La tarea ${todo.id} se completó correctamente`);
	}
}

