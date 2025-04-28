import styles from './TodoList.module.scss';
import ITodo from '../../../entities/models/ITodo';
import { FC, useEffect } from 'react';
import TodoCard, { TodoCardStatus } from '../todo-card/TodoCard';
import { DateUtils } from '../../utils/Date';
import { parseISO, startOfDay } from 'date-fns';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { updateTodo } from '../../../store/services/todo-list/slice/todoListSlice';
import { Status } from '../../../entities/models/TodoStatus';

export interface ITodoListProps {
    todos: ITodo[];
	sorted: string;
	search: string | null;
}

const TodoList: FC<ITodoListProps> = ({ todos, sorted, search }) => {
	const dispatch = useAppDispatch();

	const today = startOfDay(new Date());
	useEffect(() => {
		todos.forEach((todo) => {
			if (todo.isDeleted) return;
			if (todo.status === Status.COMPLETED) return;

			let date = parseISO(todo.dateCompleted);

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
	}, [todos, dispatch, today]);

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
							<TodoCard status={
								(todo.status === Status.NOT_COMPLETED && !todo.isDeleted)
									? TodoCardStatus.DEFAULT
									: (todo.status === Status.COMPLETED
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
