import { useTranslation } from 'react-i18next';
import styles from './MainPage.module.scss';
import Button from '../../shared/ui/button/Button';
import TodoCard from '../../shared/ui/todo-card/TodoCard';

const MainPage = () => {
	const { t } = useTranslation();
    
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
				<TodoCard/>
			</div>
		</div>
	);
};

export default MainPage;