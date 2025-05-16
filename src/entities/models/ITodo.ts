import Priority from './Priority';

interface ITodo {
    id: number;
    title: string;
    description: string;
    priority: Priority;
    isDone: boolean;
    dateCompleted: string;
}

export default ITodo;
