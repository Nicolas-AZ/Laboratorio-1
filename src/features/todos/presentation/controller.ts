// src/features/todos/presentation/controller.ts

import { type NextFunction, type Request, type Response } from 'express';

import { type SuccessResponse, HttpCode, ONE, TEN } from '../../../core';
import { PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
    CreateTodo,
    DeleteTodo,
    GetTodoById,
    UpdateTodo,
    CreateTodoDto,
    GetTodoByIdDto,
    UpdateTodoDto,
    GetTodos,
    FilterStrategyFactory,
    type TodoEntity,
    type TodoRepository
} from '../domain';

interface Params {
    id: string;
}

interface RequestBody {
    text: string;
    isCompleted: string;
}

interface RequestQuery {
    page: string;
    limit: string;
    completed?: string;
}

export class TodoController {
    //* Dependency injection
    constructor(private readonly repository: TodoRepository) {}

    public getAll = (
        req: Request<unknown, unknown, unknown, RequestQuery>,
        res: Response<SuccessResponse<PaginationResponseEntity<TodoEntity[]>>>,
        next: NextFunction
    ): void => {
        const { page = ONE, limit = TEN, completed } = req.query;
        const paginationDto = PaginationDto.create({ page: +page, limit: +limit });

        new GetTodos(this.repository)
            .execute(paginationDto)
            .then((result) => {
                // Seleccionamos la estrategia de filtrado basada en req.query.completed
                const strategy = FilterStrategyFactory.getStrategy(completed);

                // Aplicamos el filtro al arreglo devuelto dentro del objeto paginado
                if ('data' in result && Array.isArray(result.data)) {
                    result.data = strategy.filter(result.data);
                } else if ('items' in result && Array.isArray((result as any).items)) {
                    (result as any).items = strategy.filter((result as any).items);
                } else if ('results' in result && Array.isArray((result as any).results)) {
                    (result as any).results = strategy.filter((result as any).results);
                }

                res.json({ data: result });
            })
            .catch((error) => {
                next(error);
            });
    };

    public getById = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>, next: NextFunction): void => {
        const { id } = req.params;
        const getTodoByIdDto = GetTodoByIdDto.create({ id: Number(id) });
        new GetTodoById(this.repository)
            .execute(getTodoByIdDto)
            .then((result) => res.json({ data: result }))
            .catch(next);
    };

    public create = (
        req: Request<unknown, unknown, RequestBody>,
        res: Response<SuccessResponse<TodoEntity>>,
        next: NextFunction
    ): void => {
        const { text } = req.body;
        const createDto = CreateTodoDto.create({ text });
        new CreateTodo(this.repository)
            .execute(createDto)
            .then((result) => res.status(HttpCode.CREATED).json({ data: result }))
            .catch(next);
    };

    public update = (
        req: Request<Params, unknown, RequestBody>,
        res: Response<SuccessResponse<TodoEntity>>,
        next: NextFunction
    ): void => {
        const { id } = req.params;
        const { text, isCompleted } = req.body;
        const updateDto = UpdateTodoDto.create({ id: Number(id), text, isCompleted });
        new UpdateTodo(this.repository)
            .execute(updateDto)
            .then((result) => res.json({ data: result }))
            .catch(next);
    };

    public delete = (req: Request<Params>, res: Response<SuccessResponse<TodoEntity>>, next: NextFunction): void => {
        const { id } = req.params;
        const getTodoByIdDto = GetTodoByIdDto.create({ id: Number(id) });
        new DeleteTodo(this.repository)
            .execute(getTodoByIdDto)
            .then((result) => res.json({ data: result }))
            .catch(next);
    };
}