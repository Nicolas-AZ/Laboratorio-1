import { TodoEntity } from '../entities/todo.entity';

export interface FilterTodoStrategy {
  filter(todos: TodoEntity[]): TodoEntity[];
}

export class AllTodosStrategy implements FilterTodoStrategy {
  filter(todos: TodoEntity[]): TodoEntity[] {
    return todos;
  }
}

export class CompletedTodosStrategy implements FilterTodoStrategy {
  filter(todos: TodoEntity[]): TodoEntity[] {
    return todos.filter((todo) => todo.completedAt !== null);
  }
}

export class PendingTodosStrategy implements FilterTodoStrategy {
  filter(todos: TodoEntity[]): TodoEntity[] {
    return todos.filter((todo) => todo.completedAt === null);
  }
}