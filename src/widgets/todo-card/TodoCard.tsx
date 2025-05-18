import styles from './TodoCard.module.scss';
import DeleteSvg from '../../shared/assets/svg/delete.svg';
import EditSvg from '../../shared/assets/svg/edit.svg';
import AlertSvg from '../../shared/assets/svg/alert.svg';
import TimeSvg from '../../shared/assets/svg/time.svg';
import ITodo from '../../entities/models/ITodo';
import { DateUtils } from '../../shared/utils/Date';
import { useNavigate } from 'react-router-dom';
import { PriorityUtils } from '../../shared/utils/Priority';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LowIcon from '../../shared/assets/svg/lowSuccess.svg';
import MediumIcon from '../../shared/assets/svg/mediumSuccess.svg';
import HighIcon from '../../shared/assets/svg/highSuccess.svg';
import Priority from '../../entities/models/Priority';
import { useDeleteTodoMutation, useUpdateTodoMutation } from '../../app/api/todoReactAPI';
import { useModal } from '../modal/ui/ModalContext';
import { AlertModal } from '../alert-modal/AlertModal';

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
	const [isEnter, setIsEnter] = useState(false);
	const [updateTodo] = useUpdateTodoMutation();
	const [deleteTodo] = useDeleteTodoMutation();
	const { openModal } = useModal();

	const handleEditTodo = (ev: React.MouseEvent<HTMLDivElement>) => {
		ev.stopPropagation();

		if (ev.button === 0) {
			navigate(`edit/${todo.id}`);
		}
	};

	const handleAlertModal = (ev: React.MouseEvent<HTMLDivElement>) => {
		ev.preventDefault();
		ev.stopPropagation();

		openModal(<AlertModal todo={todo} />);
	};
	
	const handleCompleteTodo = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		const result = confirm(`Вы уверены, что хотите Выполнить задачу? \n\n${todo.title}`);
		if (result) {
			const newTodo: ITodo = {
				...todo,
				isDone: true,
			};
			updateTodo(newTodo);
		} else {
			// Cancel
		}
	};

	const handleDeleteTodo = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		const result = confirm(`Вы уверены, что хотите Удалить задачу? \n\n${todo.title}`);
		if (result) {
			deleteTodo(todo.id);
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
			onMouseMove={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
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
								>
									<img
										style={{ cursor: 'pointer' }}
										src={AlertSvg}
										alt="AlertTodo"
										onClick={handleAlertModal}/>
								</motion.div>
							)}
						</AnimatePresence>
					)
				}

				{
					status === TodoCardStatus.DEFAULT && (
						<AnimatePresence>
							{isEnter && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
								>
									<img
										style={{ cursor: 'pointer' }}
										src={EditSvg}
										alt="EditTodo"
										onClick={handleEditTodo}/>
								</motion.div>
							)}
						</AnimatePresence>
					)
				}

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
								alt="DeleteTodo"
								onClick={handleDeleteTodo}/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<div className={styles.TodoCardMainDescription}>
				<span>
					{todo.description}
				</span>
			</div>

			<div className={styles.TodoCardMainTime}>
				<img src={TimeSvg}/>
				<span>
					{DateUtils.formatDateUTCToRussian(todo.dateCompleted)}
				</span>
			</div>
		</div>
	);
};

export default TodoCard;
