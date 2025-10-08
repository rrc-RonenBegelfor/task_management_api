import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as taskService from "../services/taskService";
import { Task } from "../models/taskModel";

export const createTask = async (
req: Request,
res: Response,
next: NextFunction,
): Promise<void> => {
    try {
        const { userId, title, priority, status, dueDate} = req.body;

        const newTask: Task = await taskService.createTask({ userId, title, priority, status, dueDate});

        res.status(HTTP_STATUS.CREATED).json({
            message: "Task created successfully",
        });
    } catch (error: unknown) {
        next(error)
    }
};
