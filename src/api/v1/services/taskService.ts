import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Task } from "../models/taskModel";
import {
    createDocument,
} from "../repositories/firestoreRepository";

const collection: string = "tasks";

export const createTask = async (taskData: {
    userId: string;
    title: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "completed";
    dueDate: Date;
}): Promise<Task> => {
    try { 
        const dateNow: Date = new Date();
        const newTask: Partial<Task> = {
            ...taskData,
            createdAt: dateNow,
            updatedAt: dateNow,
        };

        const taskId: string = await createDocument<Task>(collection, newTask);

        return structuredClone(({id: taskId, ...newTask} as Task));
    } catch (error: unknown){
        throw error;
    }
};