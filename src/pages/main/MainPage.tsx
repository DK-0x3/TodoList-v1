import styles from './MainPage.module.scss';
import TodoList from '../../shared/ui/todo-list/TodoList';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getActiveTodos } from '../../store/services/todo-list/selectors/getActiveTodos';

const MainPage = () => {
	let { sort, search } = useParams<string>();
	if (!sort) {
		sort = 'date';
	}
	if (!search) {
		search = '';
	}

	let todos = useSelector(getActiveTodos);

	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	// Обработка изменения текста в поле поиска
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchTerm(query);

		navigate(`/${sort}/${query ? query : ''}`);
	};
    
	return (
		<div className={styles.MainPage}>
			<header className={styles.MainPageHeader}>
				<span className={styles.MainPageTitle}>Мои задачи</span>
				<input
					className={styles.MainPageSearch}
					placeholder='Поиск'
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				<div className={styles.MainPageSearchFilters}>
					<Link className={styles.ButtonSorted} to='/date'>По дате</Link>
					<Link className={styles.ButtonSorted} to='/priority'>По важности</Link>
				</div>
			</header>
			<div className={styles.MainPageTodos}>
				<TodoList search={search} sorted={sort} todos={todos}/>
			</div>
		</div>
	);
};

export default MainPage;
