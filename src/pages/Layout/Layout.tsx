import { Outlet, useNavigate } from 'react-router-dom';
import styles from './Loyout.module.scss';
import Button from '../../shared/ui/button/Button';
import ROUTES from '../../app/routing/routes';

const Layout = () => {
	const navigate = useNavigate();

	const handleGetTodos = () => {
		navigate(ROUTES.HOME);
	};

	const handleGetTodosArchive = () => {
		navigate('/archive/date');
	};

	const handleGetTodosCreate = () => {
		navigate('/create');
	};

	return (
		<div className={styles.Layout}>
			<div className={styles.LayoutHeader}>
				<Button onClick={handleGetTodos} className={styles.CreateTodo} size={'large'} fullWidth={true}>
					Список задач
				</Button>
				<Button onClick={handleGetTodosCreate} className={styles.CreateTodo} size={'large'} fullWidth={true}>
					Создать задачу
				</Button>
				<Button onClick={handleGetTodosArchive} className={styles.ArchiveTodo} size={'large'} fullWidth={true}>
					Архив задач
				</Button>
			</div>
			<div className={styles.LayoutContent}>
				<Outlet/>
			</div>
		</div>
	);
};
export default Layout;
