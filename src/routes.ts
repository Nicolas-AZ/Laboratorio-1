// src\routes.ts

import { Router } from 'express';

import { TodoRoutes } from './features/todos';
import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl, AuthRoutes } from './features/auth';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();
		const authDatasource = new AuthDatasourceImpl();
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

		router.use('/auth', AuthRoutes.routes);
		router.use('/todos', TodoRoutes.routes(authMiddleware.validateJWT));

		// rest of routes
		// ...

		return router;
	}
}
