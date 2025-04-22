import styles from './TodoCard.module.scss';
import Button from '../button/Button';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';

const TodoCard = () => {
	return (
		<div className={styles.TodoCard}>
			<div className={styles.TodoCardMain}>
				<Button className={styles.TodoCardMainButton}>
					Выполнить
				</Button>
				<span>Название задачи</span>
				<div className={styles.TodoCardMainButton}>
					важность
				</div>
				<Button>
					<img src={DeleteSvg} alt='deleteTodo'/>
				</Button>
			</div>
			<div></div>
			<div></div>
		</div>
	);
};

export default TodoCard;