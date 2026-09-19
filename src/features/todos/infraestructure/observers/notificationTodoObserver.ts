import { type TodoEntity, type TodoObserver } from '../../domain';

export class NotificationTodoObserver implements TodoObserver {
	public onTodoCompleted = (todo: TodoEntity): void => {
		console.log(`[NOTIFICATION] Notificación simulada enviada: la tarea "${todo.text}" fue completada.`);
	};
}