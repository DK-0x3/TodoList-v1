import styles from './TodoCard.module.scss';
import Button from '../button/Button';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';
import TimeSvg from '../../assets/svg/time.svg';
import ITodo from "../../../entities/models/ITodo.ts";

export interface ITodoCardProps {
	todo: ITodo;
}

const TodoCard = (props: ITodoCardProps) => {
	const {
		todo,
	} = props;

	return (
		<div className={styles.TodoCard}>
			<div className={styles.TodoCardMain}>
				<Button size='small' className={styles.TodoCardMainButton}>
					Выполнить
				</Button>
				<span>
					{todo.title}
				</span>
				<div className={styles.TodoCardMainPriority}>
					{todo.priority}
				</div>
				<Button>
					<img src={DeleteSvg} alt='deleteTodo'/>
				</Button>
			</div>

			<div className={styles.TodoCardMainDescription}>
				{todo.description}
			</div>

			<div className={styles.TodoCardMainTime}>
				<img src={TimeSvg}/>
				<span>
					{todo.dateCompleted}
				</span>
			</div>
		</div>
	);
};

export default TodoCard;
