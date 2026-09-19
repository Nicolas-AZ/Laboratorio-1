import { Router } from 'express';

import { TodoCompletionNotifier } from '../domain';
import { LogTodoObserver, NotificationTodoObserver, TodoDatasourceImpl, TodoRepositoryImpl } from '../infraestructure';
import { TodoController } from './controller';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export class TodoRoutes {
	static get routes(): Router {
		const router = Router();

		//* This datasource can be change
		const datasource = new TodoDatasourceImpl();
		const repository = new TodoRepositoryImpl(datasource);

		//* Observer pattern: se suscriben los observadores que deben
		//* reaccionar cuando una tarea se marca como completada.
		const todoCompletionNotifier = new TodoCompletionNotifier();
		todoCompletionNotifier.subscribe(new LogTodoObserver());
		todoCompletionNotifier.subscribe(new NotificationTodoObserver());

		const controller = new TodoController(repository, todoCompletionNotifier);

		// * Authentication middleware
		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

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