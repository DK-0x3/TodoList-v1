import styles from './TodoCard.module.scss';
import DeleteSvg from '../../../shared/assets/svg/delete.svg';
import TimeSvg from '../../assets/svg/time.svg';
import ITodo from '../../../entities/models/ITodo';
import { DateUtils } from '../../utils/Date';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/types/useAppDispatch';
import { Status } from '../../../entities/models/TodoStatus';
import { updateTodoAsync } from '../../../store/services/todo-list/slice/updateTodoAsync';
import { PriorityUtils } from '../../utils/Priority';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LowIcon from '../../assets/svg/lowSuccess.svg';
import MediumIcon from '../../assets/svg/mediumSuccess.svg';
import HighIcon from '../../assets/svg/highSuccess.svg';
import Priority from '../../../entities/models/Priority';

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
	const [isEnter, setIsEnter] = useState(false);

	const handleEditTodo = () => {
		navigate(`edit/${todo.id}`);
	};
	
	const handleCompleteTodo = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		const result = confirm(`Вы уверены, что хотите Выполнить задачу? \n\n${todo.title}`);
		if (result) {
			const newTodo: ITodo = {
				...todo,
				status: Status.COMPLETED,
			};
			dispatch(updateTodoAsync(newTodo));
		} else {
			// Cancel
		}
	};

	const handleDeleteTodo = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		const result = confirm(`Вы уверены, что хотите Удалить задачу? \n\n${todo.title}`);
		if (result) {
			const newTodo: ITodo = {
				...todo,
				isDeleted: true,
			};
			dispatch(updateTodoAsync(newTodo));
		} else {
			// Cancel
		}
	};

	const handleMouseEnter = () => {
		setIsEnter(true);
	};

	const handleMouseLeave = () => {
		setIsEnter(false);
	};

	const imgContent = () => {
		if (status === TodoCardStatus.DEFAULT) {
			if (isEnter) {
				switch (todo.priority) {
				case Priority.LOW:
					return <img src={LowIcon} alt="low" onClick={handleCompleteTodo} style={{ cursor: 'pointer' }} />;
				case Priority.MEDIUM:
					return <img src={MediumIcon}
						alt="medium" onClick={handleCompleteTodo} style={{ cursor: 'pointer' }} />;
				case Priority.HIGH:
					return <img src={HighIcon} alt="high" onClick={handleCompleteTodo} style={{ cursor: 'pointer' }} />;
				default:
					return <img src={LowIcon} alt="low" onClick={handleCompleteTodo} style={{ cursor: 'pointer' }} />;
				}
			} else {
				return (
					<div
						className={styles.TodoCardMainButton}
						style={{ backgroundColor: PriorityUtils.priorityToColor(todo.priority) }}
					>
					</div>
				);
			}
		} else if (status === TodoCardStatus.COMPLETED) {
			switch (todo.priority) {
			case Priority.LOW:
				return <img src={LowIcon} alt="low" />;
			case Priority.MEDIUM:
				return <img src={MediumIcon} alt="medium" />;
			case Priority.HIGH:
				return <img src={HighIcon} alt="high" />;
			default:
				return <img src={LowIcon} alt="low" />;
			}
		} else if (status === TodoCardStatus.DELETED) {
			return (
				<img
					src={DeleteSvg}
					alt="deleteTodo"/>
			);
		}
	};

	return (
		<div
			className={styles.TodoCard}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleEditTodo}
		>
			<div className={styles.TodoCardMain}>
				<div>
					{imgContent()}
				</div>

				<span>
					{todo.title}
				</span>

				{
					status === TodoCardStatus.DEFAULT && (
						<AnimatePresence>
							{isEnter && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className={styles.TodoCardDelete}
								>
									<img
										className={styles.TodoCardDelete}
										src={DeleteSvg}
										alt="deleteTodo"
										onClick={handleDeleteTodo}/>
								</motion.div>
							)}
						</AnimatePresence>
					)
				}
			</div>

			<div className={styles.TodoCardMainDescription}>
				<span>
					{todo.description}
				</span>
			</div>

			<div className={styles.TodoCardMainTime}>
				<img src={TimeSvg}/>
				<span>
					{DateUtils.formatUTCToRussian(todo.dateCompleted)}
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
