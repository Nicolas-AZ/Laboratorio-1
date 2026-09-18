// src\features\todos\presentation\routes.ts

import { type RequestHandler, Router } from "express";

import { TodoDatasourceImpl, TodoRepositoryImpl } from "../infraestructure";
import { TodoController } from "./controller";

export class TodoRoutes {
  static getRoutes(authMiddleware: RequestHandler): Router {
    const router = Router();

    //* This datasource can be change
    const datasource = new TodoDatasourceImpl();
    const repository = new TodoRepositoryImpl(datasource);
    const controller = new TodoController(repository);

    router.get("/", controller.getAll);
    router.get("/:id", controller.getById);
    router.post("/", [authMiddleware], controller.create);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);

    // rest of operations
    // ...

    return router;
  }
}
