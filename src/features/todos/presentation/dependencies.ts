import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../../auth';

export const createAuthMiddleware = () => {
	const authDatasource = new AuthDatasourceImpl();
	const authRepository = new AuthRepositoryImpl(authDatasource);

	return new AuthMiddleware(authRepository);
};