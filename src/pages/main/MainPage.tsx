import { useTranslation } from 'react-i18next';
import styles from './MainPage.module.scss';
import Button from '../../shared/ui/button/Button';
import { useAppDispatch } from '../../store/types/useAppDispatch';
import ITodo from '../../entities/models/ITodo';
import Priority from '../../entities/models/Priority';
import { Status } from '../../entities/models/TodoStatus';
import { addTodos } from '../../store/services/todo-list/slice/todoListSlice';
import TodoList from '../../shared/ui/todo-list/TodoList';

const MainPage = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const testTodos: ITodo[] = [
		{
			id: '1',
			title: 'Первая задача',
			description: 'Описание первой задачи',
			priority: Priority.LOW,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-24T09:32:00.000Z',
			isDeleted: false,
		},
		{
			id: '2',
			title: 'Вторая задача',
			description: 'Описание второй задачи',
			priority: Priority.HIGH,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-25T10:15:00.000Z',
			isDeleted: false,
		},
		{
			id: '3',
			title: 'Третья задача',
			description: 'Описание третьей задачи',
			priority: Priority.HIGH,
			status: Status.COMPLETED,
			dateCompleted: '2025-04-23T14:20:00.000Z',
			isDeleted: false,
		},
		{
			id: '4',
			title: 'Четвёртая задача',
			description: 'Описание четвёртой задачи',
			priority: Priority.LOW,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-26T11:00:00.000Z',
			isDeleted: false,
		},
		{
			id: '5',
			title: 'Пятая задача',
			description: 'Описание пятой задачи',
			priority: Priority.MEDIUM,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-27T09:00:00.000Z',
			isDeleted: false,
		},
		{
			id: '6',
			title: 'Шестая задача',
			description: 'Описание шестой задачи',
			priority: Priority.HIGH,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-28T08:30:00.000Z',
			isDeleted: false,
		},
		{
			id: '7',
			title: 'Седьмая задача',
			description: 'Описание седьмой задачи',
			priority: Priority.LOW,
			status: Status.COMPLETED,
			dateCompleted: '2025-04-22T07:45:00.000Z',
			isDeleted: false,
		},
		{
			id: '8',
			title: 'Восьмая задача',
			description: 'Описание восьмой задачи',
			priority: Priority.MEDIUM,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-21T15:00:00.000Z',
			isDeleted: false,
		},
		{
			id: '9',
			title: 'Девятая задача',
			description: 'Описание девятой задачи',
			priority: Priority.HIGH,
			status: Status.NOT_COMPLETED,
			dateCompleted: '2025-04-20T13:15:00.000Z',
			isDeleted: false,
		},
		{
			id: '10',
			title: 'Десятая задача',
			description: 'Описание десятой задачи',
			priority: Priority.LOW,
			status: Status.COMPLETED,
			dateCompleted: '2025-04-19T17:20:00.000Z',
			isDeleted: false,
		},
	];

	dispatch(addTodos(testTodos));
    
	return (
		<div className={styles.MainPage}>
			<header className={styles.MainPageHeader}>
				<span className={styles.MainPageTitle}>Мои задачи</span>
				<input className={styles.MainPageSearch} placeholder='Поиск'/>
				<div className={styles.MainPageSearchFilters}>
					<Button>По дате</Button>
					<Button>По важности</Button>
				</div>
			</header>
			<div className={styles.MainPageTodos}>
				<TodoList todos={testTodos}/>
			</div>
		</div>
	);
};

export default MainPage;
