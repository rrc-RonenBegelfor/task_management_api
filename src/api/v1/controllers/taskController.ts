import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as taskService from "../services/taskService";
import { Task } from "../models/taskModel";
import { successResponse } from "../models/responseModel";
import { taskSchemas } from "../validation/taskValidation";

export const createTask = async (
req: Request,
res: Response,
next: NextFunction,
): Promise<void> => {
    try {
        const { error, value } = taskSchemas.create.body.validate(req.body, { abortEarly: false});

        if (error) {
            res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message),
          });

          return;
        }

        const task: Task = value;

        await taskService.createTask({ ...task });
        res.status(HTTP_STATUS.OK).json(successResponse({}, "Task created"));  
    } catch (error: unknown) {
        next(error)
    }
};

export const deleteTask = async (
req: Request,
res: Response,
next: NextFunction,
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await taskService.deleteTask(id);
        res.status(HTTP_STATUS.OK).json(
            successResponse("Task deleted")
        );
    } catch (error: unknown) {
        next(error)
    }
};
