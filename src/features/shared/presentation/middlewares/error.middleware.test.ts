import { type Response, type NextFunction, type Request } from 'express';

import { ErrorMiddleware } from './error.middleware';
import { AppError } from '../../../../core';

describe('ErrorMiddleware', () => {
	const originalEnv = process.env.NODE_ENV;

	const buildRes = (): Response => {
		const res: Partial<Response> = {
			statusCode: 200,
			json: jest.fn().mockReturnThis()
		};
		return res as Response;
	};

	const next: NextFunction = jest.fn();
	const req = {} as Request;

	afterEach(() => {
		process.env.NODE_ENV = originalEnv;
		jest.restoreAllMocks();
	});

	test('should NOT include the stack when NODE_ENV is production', () => {
		process.env.NODE_ENV = 'production';
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const error = AppError.badRequest('Invalid data');
		const res = buildRes();

		ErrorMiddleware.handleError(error, req, res, next);

		expect(res.json).toHaveBeenCalledWith(
			expect.objectContaining({ name: 'BadRequestError', message: 'Invalid data', stack: undefined })
		);
		expect(next).toHaveBeenCalled();
	});

	test('should include the stack when NODE_ENV is development', () => {
		process.env.NODE_ENV = 'development';
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const error = AppError.badRequest('Invalid data');
		const res = buildRes();

		ErrorMiddleware.handleError(error, req, res, next);

		const jsonMock = res.json as jest.Mock;
		const responseBody = jsonMock.mock.calls[0][0];
		expect(responseBody.stack).toBeDefined();
	});

	test('should log the error on the server side regardless of environment', () => {
		process.env.NODE_ENV = 'production';
		const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

		const error = AppError.notFound('Todo not found');
		const res = buildRes();

		ErrorMiddleware.handleError(error, req, res, next);

		expect(errorSpy).toHaveBeenCalledWith(error);
	});

	test('should return a generic response for non-AppError errors, without leaking details', () => {
		process.env.NODE_ENV = 'production';
		jest.spyOn(console, 'error').mockImplementation(() => {});

		const error = new Error('Something exploded unexpectedly');
		const res = buildRes();

		ErrorMiddleware.handleError(error, req, res, next);

		expect(res.json).toHaveBeenCalledWith({
			name: 'InternalServerError',
			message: 'An internal server error occurred'
		});
	});
});