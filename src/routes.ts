// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';
import { AuthRoutes, AuthDatasourceImpl, AuthRepositoryImpl, AuthMiddleware } from './features/auth';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

		router.use('/auth', AuthRoutes.routes);
		router.use('/todos', TodoRoutes.getRoutes(authMiddleware.validateJWT));

		// rest of routes
		// ...

		return router;
	}
}
