import { type TodoEntity, type TodoObserver } from '../../domain';

export class LogTodoObserver implements TodoObserver {
	public onTodoCompleted = (todo: TodoEntity): void => {
		console.log(`[LOG] Todo #${todo.id} ("${todo.text}") marcado como completado - ${new Date().toISOString()}`);
	};
}