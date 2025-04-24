import Priority from "./Priority.ts";
import {Status} from "./TodoStatus.ts";

interface ITodo {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    dateCompleted: string;
    isDeleted: boolean;
}

export default ITodo;
