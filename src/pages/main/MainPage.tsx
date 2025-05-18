import styles from './MainPage.module.scss';
import TodoList from '../../shared/ui/todo-list/TodoList';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
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
					<NavLink
						className={({ isActive }) =>
							`${styles.ButtonSorted} ${isActive ? styles.Active : ''}`
						}
						to="/date"
					>
						По дате
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							`${styles.ButtonSorted} ${isActive ? styles.Active : ''}`
						}
						to="/priority"
					>
						По важности
					</NavLink>
				</div>
			</header>
			<div className={styles.MainPageTodos}>
				<TodoList search={search} sorted={sort} todos={todos}/>
			</div>
		</div>
	);
};

export default MainPage;
