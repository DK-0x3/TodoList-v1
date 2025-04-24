import styles from './TodoList.module.scss';
import ITodo from "../../../entities/models/ITodo.ts";
import {FC} from "react";
import TodoCard from "../todo-card/TodoCard.tsx";

export interface ITodoListProps {
    todos: ITodo[]
}

const TodoList: FC<ITodoListProps> = ({ todos }) => {
    return (
        <div className={styles.TodoList}>
            {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
            ))}
        </div>
    );
};

export default TodoList;
