import styles from './MainPage.module.scss';
import Button from '../../shared/ui/button/Button';
import TodoList from '../../shared/ui/todo-list/TodoList';
import {useSelector} from "react-redux";
import {getTodos} from "../../store/services/todo-list/selectors/getTodoById.ts";

const MainPage = () => {
	const todos = useSelector(getTodos);
    
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
				<TodoList todos={todos}/>
			</div>
		</div>
	);
};

export default MainPage;
