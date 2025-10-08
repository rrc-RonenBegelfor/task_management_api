import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Task } from "../models/taskModel";
import {
    createDocument,
    getDocumentById
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

export const getTaskById = async (id: string): Promise<Task> => {
    try {
        const doc: DocumentSnapshot | null = await getDocumentById(
            collection,
            id
        );
 
        if (!doc) {
            throw new Error(`Task with ID ${id} not found`);
        }
 
        const data: DocumentData | undefined = doc.data();
        const task: Task = {
            id: doc.id,
            ...data,
        } as Task;
 
        return structuredClone(task);
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteTask = async (id: string): Promise<void> => {
    try {
        const task: Task = await getTaskById(id);
        
        if (!task) {
            throw new Error(`Task with ID ${id} does not exist`);
        }
    } catch (error: unknown) {
        throw error;
    }
};