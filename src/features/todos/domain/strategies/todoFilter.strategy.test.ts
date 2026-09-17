import { TodoEntity } from '../entities';
import { resolveTodoFilterStrategy } from './todoFilter.strategy';

describe('tests in todoFilter.strategy.ts', () => {
	const todos = [new TodoEntity(1, 'Pending', false), new TodoEntity(2, 'Done', true)];

	test('should return only completed todos when the completed strategy is selected', () => {
		const result = resolveTodoFilterStrategy(true).filter(todos);

		expect(result).toEqual([todos[1]]);
	});

	test('should return all todos when no filter strategy is selected', () => {
		const result = resolveTodoFilterStrategy().filter(todos);

		expect(result).toEqual(todos);
	});
});
