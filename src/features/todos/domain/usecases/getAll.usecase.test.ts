import { TodoEntity } from '../entities';
import { GetTodosDto } from '../dtos';
import { TodoRepository } from '../repositories/respository';
import { GetTodos, GetTodosUseCase } from './getAll.usecase';

describe('tests in getAll.usecase.ts', () => {
	let repository: jest.Mocked<TodoRepository>;
	let getTodosUseCase: GetTodosUseCase;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			getAll: jest.fn(),
			getById: jest.fn(),
			update: jest.fn(),
			delete: jest.fn()
		} as jest.Mocked<TodoRepository>;

		getTodosUseCase = new GetTodos(repository);
	});

	test('should call repository.getAll with correct parameters', async () => {
		const query = GetTodosDto.create({ page: 1, limit: 10 });

		const paginationResult = {
			results: [new TodoEntity(1, 'Test Todo')],
			currentPage: 1,
			nextPage: null,
			prevPage: null,
			total: 1,
			totalPages: 1
		};

		repository.getAll.mockResolvedValue(paginationResult);

		const result = await getTodosUseCase.execute(query);

		expect(repository.getAll).toHaveBeenCalledWith(query);
		expect(result).toBe(paginationResult);
	});

	test('should throw an error if repository.getAll fails', async () => {
		const query = GetTodosDto.create({ page: 1, limit: 10 });
		const errorMessage = 'GetAll failed';

		repository.getAll.mockRejectedValue(new Error(errorMessage));

		await expect(getTodosUseCase.execute(query)).rejects.toThrow(errorMessage);
	});
});
