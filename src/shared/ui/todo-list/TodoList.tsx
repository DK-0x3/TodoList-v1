import styles from './TodoList.module.scss';
import ITodo from '../../../entities/models/ITodo';
import { FC } from 'react';
import TodoCard, { TodoCardStatus } from '../../../widgets/todo-card/TodoCard';
import { DateUtils } from '../../utils/Date';

export interface ITodoListProps {
	todos: ITodo[];
	sorted: string;
	search: string | null;
}

const TodoList: FC<ITodoListProps> = ({ todos, sorted, search }) => {
	let searchTodos: ITodo[] = todos;

	if (search !== null) {
		searchTodos = todos.filter(todo =>
			(todo.title && todo.title.toLowerCase().includes(search.toLowerCase())) ||
			(todo.description && todo.description.toLowerCase().includes(search.toLowerCase()))
		);
	}

	let groupedTodos: Record<string, ITodo[]>;

	switch (sorted) {
	case 'date': {
		groupedTodos = DateUtils.groupTodosByDate(searchTodos);
		break;
	}
	case 'priority': {
		groupedTodos = DateUtils.groupTodosByPriority(searchTodos);
		break;
	}
	default: {
		groupedTodos = DateUtils.groupTodosByDate(searchTodos);
		break;
	}
	}

	return (
		<div className={styles.TodoList}>
			{
				Object.entries(groupedTodos).map(([groupDate, groupTodos]) => (
					<div key={groupDate} className={styles.TodoListGroup}>
						<h2
							className={`${styles.TodoListGroupDate} 
							${groupDate === 'Просрочено' ? styles.overdue : ''}`}
						>
							{groupDate}
						</h2>
						{groupTodos.map((todo) => (
							<TodoCard status={
								(!todo.isDone)
									? TodoCardStatus.DEFAULT
									: (todo.isDone
										? TodoCardStatus.COMPLETED
										: TodoCardStatus.DELETED)
							} key={todo.id} todo={todo} />
						))}
					</div>
				))
			}
		</div>
	);
};

export default TodoList;
