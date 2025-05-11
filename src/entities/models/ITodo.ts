import Priority from './Priority';

interface ITodo {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    isDone: boolean;
    dateCompleted: string;
    isDeleted: boolean;
}

export default ITodo;
