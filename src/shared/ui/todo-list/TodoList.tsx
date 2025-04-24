import styles from './TodoList.module.scss';
import ITodo from '../../../entities/models/ITodo';
import { FC } from 'react';
import TodoCard from '../todo-card/TodoCard';
import { DateUtils } from '../../utils/Date';

export interface ITodoListProps {
    todos: ITodo[]
}

const TodoList: FC<ITodoListProps> = ({ todos }) => {
	const groupedTodos = DateUtils.groupTodosByDate(todos);

	return (
		<div className={styles.TodoList}>
			{
				Object.entries(groupedTodos).map(([groupDate, groupTodos]) => (
					<div key={groupDate} className={styles.TodoListGroup}>
						<h2 className={styles.TodoListGroupDate}>{groupDate}</h2>
						{groupTodos.map((todo) => (
							<TodoCard key={todo.id} todo={todo} />
						))}
					</div>
				))
			}
		</div>
	);
};

export default TodoList;
