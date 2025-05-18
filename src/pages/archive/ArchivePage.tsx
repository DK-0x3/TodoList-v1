import styles from './ArchivePage.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTodos } from '../../store/services/todo-list/selectors/getTodos';
import { useState } from 'react';
import TodoList from '../../shared/ui/todo-list/TodoList';

const ArchivePage = () => {
	let { sort, search } = useParams<string>();
	if (!sort) {
		sort = 'date';
	}
	if (!search) {
		search = '';
	}

	let todos = useSelector(getTodos);
	todos = todos.filter(todo => todo.isDone);

	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	// Обработка изменения текста в поле поиска
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchTerm(query);

		navigate(`archive/${sort}/${query ? query : ''}`);
	};

	return (
		<div className={styles.MainPage}>
			<header className={styles.MainPageHeader}>
				<span className={styles.MainPageTitle}>Архив задач</span>
				<input
					className={styles.MainPageSearch}
					placeholder='Поиск'
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<div className={styles.MainPageSearchFilters}>
					<Link className={styles.ButtonSorted} to='/archive/date'>По дате</Link>
					<Link className={styles.ButtonSorted} to='/archive/priority'>По важности</Link>
				</div>
			</header>
			<div className={styles.MainPageTodos}>
				<TodoList search={search} sorted={sort} todos={todos}/>
			</div>
		</div>
	);
};

export default ArchivePage;