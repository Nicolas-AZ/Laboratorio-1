import { type TodoEntity } from '../entities';

export interface TodoFilterStrategy {
    matches(todo: TodoEntity): boolean;
}

export class AllTodosStrategy implements TodoFilterStrategy {
    matches(_todo: TodoEntity): boolean { return true; }
}

export class CompletedTodosStrategy implements TodoFilterStrategy {
    constructor(private readonly completed: boolean) {}
    matches(todo: TodoEntity): boolean { return todo.isCompleted === this.completed; }
}
