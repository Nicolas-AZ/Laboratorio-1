import { Router } from 'express';

import { TodoDatasourceImpl, TodoRepositoryImpl } from '../infraestructure';
import { TodoController } from './controller';
import { createAuthMiddleware } from './dependencies';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);
		const controller = new TodoController(repository);

		// * Authentication middleware
		const authMiddleware = createAuthMiddleware();

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', [authMiddleware.validateJWT], controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		// rest of operations
		// ...

		return router;
	}
}