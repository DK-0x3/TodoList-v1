import styles from './TodoCard.module.scss';
import Button from '../button/Button';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';
import TimeSvg from '../../assets/svg/time.svg';
import ITodo from '../../../entities/models/ITodo';
import { DateUtils } from '../../utils/Date';
import Priority from '../../../entities/models/Priority';

export interface ITodoCardProps {
	todo: ITodo;
}

const TodoCard = (props: ITodoCardProps) => {
	const {
		todo,
	} = props;

	const priorityToText: Record<Priority, string> = {
		[Priority.LOW]: 'Низкий',
		[Priority.MEDIUM]: 'Средний',
		[Priority.HIGH]: 'Высокий',
	};

	return (
		<div className={styles.TodoCard}>
			<div className={styles.TodoCardMain}>
				<Button size='small' className={styles.TodoCardMainButton}>
					Выполнить
				</Button>
				<span>
					{todo.title}
				</span>
				<div className={`${styles.TodoCardMainPriority} 
  									${todo.priority === Priority.HIGH ? styles.high : ''}
  									${todo.priority === Priority.MEDIUM ? styles.medium : ''}
  									${todo.priority === Priority.LOW ? styles.low : ''}`}>
					{priorityToText[todo.priority]}
				</div>
				<Button>
					<img src={DeleteSvg} alt='deleteTodo'/>
				</Button>
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
					{DateUtils.formatDateToRussian(todo.dateCompleted)}
				</span>
			</div>
		</div>
	);
};

export default TodoCard;
