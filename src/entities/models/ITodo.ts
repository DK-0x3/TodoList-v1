import Priority from './Priority';
import { Status } from './TodoStatus';

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
