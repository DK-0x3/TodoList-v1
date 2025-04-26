import styles from './TodoCard.module.scss';
import Button from '../button/Button';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';
import EditSvg from '../../../shared/assets/svg/edit.svg';
import TimeSvg from '../../assets/svg/time.svg';
import ITodo from '../../../entities/models/ITodo';
import { DateUtils } from '../../utils/Date';
import Priority from '../../../entities/models/Priority';
import { useNavigate } from 'react-router-dom';

export interface ITodoCardProps {
	todo: ITodo;
}

const TodoCard = (props: ITodoCardProps) => {
	const {
		todo,
	} = props;
	const navigate = useNavigate();

	const priorityToText: Record<Priority, string> = {
		[Priority.LOW]: 'Низкий',
		[Priority.MEDIUM]: 'Средний',
		[Priority.HIGH]: 'Высокий',
	};

	const handleEditTodo = () => {
		navigate(`edit/${todo.id}`);
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
					<img src={EditSvg} onClick={handleEditTodo} alt='editTodo'/>
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
					{DateUtils.formatUTCToRussian(todo.dateCompleted)}
				</span>
			</div>
		</div>
	);
};

export default TodoCard;
