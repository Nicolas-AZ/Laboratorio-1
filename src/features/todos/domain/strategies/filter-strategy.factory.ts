import {
  FilterTodoStrategy,
  AllTodosStrategy,
  CompletedTodosStrategy,
  PendingTodosStrategy,
} from './todo-filter.strategy';

export class FilterStrategyFactory {
  static getStrategy(completed?: string): FilterTodoStrategy {
    if (completed === 'true') return new CompletedTodosStrategy();
    if (completed === 'false') return new PendingTodosStrategy();
    return new AllTodosStrategy();
  }
}