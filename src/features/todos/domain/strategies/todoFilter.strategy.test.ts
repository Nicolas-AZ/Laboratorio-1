import { TodoEntity } from '../entities';
import {
	AllTodosFilterStrategy,
	CompletedTodoFilterStrategy,
	PendingTodoFilterStrategy,
	TodoFilterStrategyFactory
} from './todoFilter.strategy';

describe('tests in todoFilter.strategy.ts', () => {
	const completedTodo = new TodoEntity(1, 'Completed todo', true);
	const pendingTodo = new TodoEntity(2, 'Pending todo', false);

	test('AllTodosFilterStrategy should match every todo', () => {
		const strategy = new AllTodosFilterStrategy();
		expect(strategy.matches(completedTodo)).toBe(true);
		expect(strategy.matches(pendingTodo)).toBe(true);
	});

	test('CompletedTodoFilterStrategy should match only completed todos', () => {
		const strategy = new CompletedTodoFilterStrategy();
		expect(strategy.matches(completedTodo)).toBe(true);
		expect(strategy.matches(pendingTodo)).toBe(false);
	});

	test('PendingTodoFilterStrategy should match only pending todos', () => {
		const strategy = new PendingTodoFilterStrategy();
		expect(strategy.matches(completedTodo)).toBe(false);
		expect(strategy.matches(pendingTodo)).toBe(true);
	});

	describe('TodoFilterStrategyFactory', () => {
		test('should return CompletedTodoFilterStrategy for "true"', () => {
			expect(TodoFilterStrategyFactory.create('true')).toBeInstanceOf(CompletedTodoFilterStrategy);
		});

		test('should return PendingTodoFilterStrategy for "false"', () => {
			expect(TodoFilterStrategyFactory.create('false')).toBeInstanceOf(PendingTodoFilterStrategy);
		});

		test('should return AllTodosFilterStrategy when nothing is passed', () => {
			expect(TodoFilterStrategyFactory.create()).toBeInstanceOf(AllTodosFilterStrategy);
		});
	});
});
