// src\features\todos\domain\strategies\todoFilter.strategy.ts

import { type TodoEntity } from '../entities';

/**
 * Strategy contract: any way of deciding whether a TodoEntity
 * should be included in a result set must implement this.
 */
export abstract class TodoFilterStrategy {
	abstract matches(todo: TodoEntity): boolean;
}

/** No filtering: every todo matches. */
export class AllTodosFilterStrategy extends TodoFilterStrategy {
	public matches(_todo: TodoEntity): boolean {
		return true;
	}
}

/** Only todos marked as completed. */
export class CompletedTodoFilterStrategy extends TodoFilterStrategy {
	public matches(todo: TodoEntity): boolean {
		return todo.isCompleted;
	}
}

/** Only todos still pending. */
export class PendingTodoFilterStrategy extends TodoFilterStrategy {
	public matches(todo: TodoEntity): boolean {
		return !todo.isCompleted;
	}
}

/**
 * Picks the right TodoFilterStrategy from the raw `completed`
 * query param, so callers never need an if/else chain.
 */
export class TodoFilterStrategyFactory {
	public static create(completed?: string | boolean): TodoFilterStrategy {
		if (completed === true || completed === 'true') return new CompletedTodoFilterStrategy();
		if (completed === false || completed === 'false') return new PendingTodoFilterStrategy();
		return new AllTodosFilterStrategy();
	}
}
