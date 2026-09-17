import { AppError } from '../../../../core';
import { GetTodosDto } from './getTodos.dto';

describe('tests in getTodos.dto.ts', () => {
	test('should create a query DTO with a completed filter', () => {
		const dto = GetTodosDto.create({ page: 1, limit: 10, completed: 'true' });

		expect(dto).toEqual({ page: 1, limit: 10, completed: true });
	});

	test('should reject an invalid completed filter', () => {
		expect(() => GetTodosDto.create({ page: 1, limit: 10, completed: 'yes' })).toThrow(AppError);
	});
});
