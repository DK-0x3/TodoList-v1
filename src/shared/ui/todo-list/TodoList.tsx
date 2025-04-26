import styles from './TodoList.module.scss';
import ITodo from '../../../entities/models/ITodo';
import { FC } from 'react';
import TodoCard from '../todo-card/TodoCard';
import { DateUtils } from '../../utils/Date';
import { parseISO, startOfDay } from 'date-fns';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { updateTodo } from '../../../store/services/todo-list/slice/todoListSlice';

export interface ITodoListProps {
    todos: ITodo[];
	sorted: string;
	search: string | null;
}

const TodoList: FC<ITodoListProps> = ({ todos, sorted, search }) => {
	const dispatch = useAppDispatch();

	const today = startOfDay(new Date());
	todos.forEach((todo) => {
		if (todo.isDeleted) return;

		let date = parseISO(todo.dateCompleted);

		// Если дата в прошлом — меняем дату задачи на сегодня в UTC
		if (date < today) {
			const todayUtc = new Date(Date.UTC(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()
			));
			const newTodo: ITodo = {
				...todo,
				dateCompleted: todayUtc.toISOString(),
			};
			
			dispatch(updateTodo(newTodo));
		}
	});

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
