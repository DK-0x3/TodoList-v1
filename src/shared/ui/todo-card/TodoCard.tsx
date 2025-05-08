import styles from './TodoCard.module.scss';
import Button from '../button/Button';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';
import EditSvg from '../../../shared/assets/svg/edit.svg';
import TimeSvg from '../../assets/svg/time.svg';
import ITodo from '../../../entities/models/ITodo';
import { DateUtils } from '../../utils/Date';
import Priority from '../../../entities/models/Priority';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { Status } from '../../../entities/models/TodoStatus';
import { updateTodoAsync } from '../../../store/services/todo-list/slice/updateTodoAsync';
import { PriorityUtils } from '../../utils/Priority';

export enum TodoCardStatus {
	DEFAULT = 'DEFAULT',
	DELETED = 'DELETED',
	COMPLETED = 'COMPLETED',
}

export interface ITodoCardProps {
	todo: ITodo;
	status: TodoCardStatus,
}

const TodoCard = (props: ITodoCardProps) => {
	const {
		todo,
		status,
	} = props;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleEditTodo = () => {
		navigate(`edit/${todo.id}`);
	};
	
	const handleCompleteTodo = () => {
		const newTodo: ITodo = {
			...todo,
			status: Status.COMPLETED,
		};
		dispatch(updateTodoAsync(newTodo));
	};

	const handleDeleteTodo = () => {
		const newTodo: ITodo = {
			...todo,
			isDeleted: true,
		};
		dispatch(updateTodoAsync(newTodo));
	};

	return (
		<div className={styles.TodoCard}>
			<div className={styles.TodoCardMain}>
				<div>
					<div
						className={styles.TodoCardMainButton}
						style={{ backgroundColor: PriorityUtils.priorityToColor(todo.priority) }}
					>
					</div>
				</div>

				<span>
					{todo.title}
				</span>
			</div>
			{/*<div className={styles.TodoCardMain}>*/}
			{/*	{status === TodoCardStatus.DEFAULT && (*/}
			{/*		<Button onClick={handleCompleteTodo} size="small" className={styles.TodoCardMainButton}>*/}
			{/*			Выполнить*/}
			{/*		</Button>*/}
			{/*	)}*/}

			{/*	{status === TodoCardStatus.COMPLETED && (*/}
			{/*		<div className={styles.TodoCardStatusCompleted}>*/}
			{/*			Выполнено!*/}
			{/*		</div>*/}
			{/*	)}*/}

			{/*	{status === TodoCardStatus.DELETED && (*/}
			{/*		<div className={styles.TodoCardStatusDeleted}>*/}
			{/*			Удалено*/}
			{/*		</div>*/}
			{/*	)}*/}

			{/*	<span>*/}
			{/*		{todo.title}*/}
			{/*	</span>*/}
			{/*	<div className={`${styles.TodoCardMainPriority} */}
			{/*						${todo.priority === Priority.HIGH ? styles.high : ''}*/}
			{/*						${todo.priority === Priority.MEDIUM ? styles.medium : ''}*/}
			{/*						${todo.priority === Priority.LOW ? styles.low : ''}`}>*/}
			{/*		{priorityToText[todo.priority]}*/}
			{/*	</div>*/}
			{/*	{status === TodoCardStatus.DEFAULT && (*/}
			{/*		<Button>*/}
			{/*			<img src={EditSvg} onClick={handleEditTodo} alt='editTodo'/>*/}
			{/*		</Button>*/}
			{/*	)}*/}
			{/*	{status === TodoCardStatus.DEFAULT && (*/}
			{/*		<Button onClick={handleDeleteTodo}>*/}
			{/*			<img src={DeleteSvg} alt='deleteTodo'/>*/}
			{/*		</Button>*/}
			{/*	)}*/}
			{/*</div>*/}

			{/*<div className={styles.TodoCardMainDescription}>*/}
			{/*	{todo.description}*/}
			{/*</div>*/}

			{/*<div className={styles.TodoCardMainTime}>*/}
			{/*	<img src={TimeSvg}/>*/}
			{/*	<span>*/}
			{/*		{DateUtils.formatUTCToRussian(todo.dateCompleted)}*/}
			{/*	</span>*/}
			{/*</div>*/}
		</div>
	);
};

export default TodoCard;
