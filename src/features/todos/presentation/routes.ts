// src\features\todos\presentation\routes.ts

import { Router } from 'express';

import { authMiddleware } from '../../../core';
import { TodoCompletedLogger, TodoDatasourceImpl, TodoRepositoryImpl } from '../infraestructure';
import { TodoCompletedEvents } from '../domain';
import { TodoController } from './controller';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const todoCompletedEvents = new TodoCompletedEvents();
		todoCompletedEvents.subscribe(new TodoCompletedLogger());

		const datasource = new TodoDatasourceImpl(todoCompletedEvents);
		const repository = new TodoRepositoryImpl(datasource);
		const controller = new TodoController(repository);

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
