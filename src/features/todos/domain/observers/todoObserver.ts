import { type TodoEntity } from '../entities';

export interface TodoObserver {
	onTodoCompleted: (todo: TodoEntity) => void;
}