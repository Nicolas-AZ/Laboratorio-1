import { AuthDatasourceImpl, AuthMiddleware, AuthRepositoryImpl } from '../features/auth';

const authDatasource = new AuthDatasourceImpl();
const authRepository = new AuthRepositoryImpl(authDatasource);

export const authMiddleware = new AuthMiddleware(authRepository);
