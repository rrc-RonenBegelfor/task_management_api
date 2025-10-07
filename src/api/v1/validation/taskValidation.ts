import Joi from "joi";
import { TaskRequestModel } from "../models/taskRequestModel";


export const taskSchemas = {
    create: {
        body: Joi.object<TaskRequestModel>({
            userId: Joi.string().required().messages({
                "any.required": "User id is required",
                "string.empty": "User id cannot be empty",
            }),
            title: Joi.string().required().messages({
                "any.required": "Title is required",
                "string.empty": "Title cannot be empty",
            }),
            priority: Joi.string().valid("low" , "medium" , "high").required().messages({
                "any.required": "Priority is required",
                "any.only": "Priority must be one of 'low', 'medium', or 'high'",
            }),
            status: Joi.string().valid("open", "in-progress", "completed").required().messages({
                "any.required": "Status is required",
                "any.only": "Status must be one of 'open', 'in-progress', or 'completed'",
            }),
            dueDate: Joi.date().required().messages({
                "any.required": "Due date is required",
                "date.base": "Due date must be a valid date",
            }),
        }),
    }};