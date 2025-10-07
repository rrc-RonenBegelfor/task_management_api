export interface TaskRequestModel {
    userId: string;
    title: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "completed";
    dueDate: Date;
}