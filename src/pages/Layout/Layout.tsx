import { Outlet } from 'react-router-dom';
import styles from './Loyout.module.scss';
import Button from '../../shared/ui/button/Button';

const Layout = () => {
	return (
		<div className={styles.Layout}>
			<div className={styles.LayoutHeader}>
				<Button className={styles.CreateTodo} size={'large'} fullWidth={true}>Создать задачу</Button>
				<Button className={styles.ArchiveTodo} size={'large'} fullWidth={true}>Архив задач</Button>
			</div>
			<div className={styles.LayoutContent}>
				<Outlet/>
			</div>
		</div>
	);
};
export default Layout;