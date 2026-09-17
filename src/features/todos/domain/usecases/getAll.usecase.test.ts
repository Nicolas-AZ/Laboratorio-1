import { PaginationDto } from '../../../shared';
import { TodoEntity } from '../entities';
import { TodoRepository } from '../repositories/respository';
import { AllTodosStrategy } from '../strategies/todo-filter.strategy';
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
		const paginationDto = PaginationDto.create({ page: 1, limit: 10 });
		const filterStrategy = new AllTodosStrategy();

		const paginationResult = {
			results: [new TodoEntity(1, 'Test Todo')],
			currentPage: 1,
			nextPage: null,
			prevPage: null,
			total: 1,
			totalPages: 1
		};

		repository.getAll.mockResolvedValue(paginationResult);

		const result = await getTodosUseCase.execute(paginationDto, filterStrategy);

		expect(repository.getAll).toHaveBeenCalledWith(paginationDto, filterStrategy);
		expect(result).toBe(paginationResult);
	});

	test('should throw an error if repository.getAll fails', async () => {
		const paginationDto = PaginationDto.create({ page: 1, limit: 10 });
		const filterStrategy = new AllTodosStrategy();
		const errorMessage = 'GetAll failed';

		repository.getAll.mockRejectedValue(new Error(errorMessage));

		await expect(getTodosUseCase.execute(paginationDto, filterStrategy)).rejects.toThrow(errorMessage);
	});
});
