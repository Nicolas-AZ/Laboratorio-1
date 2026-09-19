// src\features\todos\presentation\routes.ts

import { Router, type RequestHandler } from 'express';

import { TodoDatasourceImpl, TodoRepositoryImpl } from '../infraestructure';
import { TodoController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const controller = new TodoController(repository);

		// * Authentication middleware
		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', [authMiddleware.validateJWT], controller.create);
		router.put('/:id', [authMiddleware.validateJWT as RequestHandler, controller.update as unknown as RequestHandler]);
		router.delete('/:id', [authMiddleware.validateJWT as RequestHandler, controller.delete as unknown as RequestHandler]);
		// rest of operations
		// ...

		return router;
	}
}
