import styles from './CreatePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { DateUtils } from '../../shared/utils/Date';
import ROUTES from '../../app/routing/routes';
import ITodo from '../../entities/models/ITodo';
import toast from 'react-hot-toast';
import Priority from '../../entities/models/Priority';
import DropDownMenu, { IDropDownMenuValue } from '../../shared/ui/drop-down-menu/DropDownMenu';
import { InputApp } from '../../shared/ui/input/InputApp';
import TimeSvg from '../../shared/assets/svg/time.svg';
import Button from '../../shared/ui/button/Button';
import { useAddTodoMutation } from '../../app/api/todoReactAPI';

const CreatePage = () => {
	const navigate = useNavigate();
	const [addTodo] = useAddTodoMutation();

	const todo: ITodo = {
		id: '',
		title: '',
		description: '',
		priority: Priority.LOW,
		isDone: false,
		dateCompleted: new Date().toISOString(),
	};
	const [currentTodo, setCurrentTodo] = useState<ITodo>(todo);

	// Все хуки вызываем без условий
	const [date, setDate] = useState<string>(currentTodo.dateCompleted);
    
	const titleInitial = currentTodo?.title ?? '';
	const descriptionInitial = currentTodo?.description ?? '';
	const [title, setTitle] = useState(titleInitial);
	const [description, setDescription] = useState(descriptionInitial);

	// --- сначала handleSave
	const handleSave = () => {
		if (title.trim() === '') {
			toast('Ошибка, заполни заголовок!', {
				icon: '✖',
				duration: 1000,
				style: {
					borderRadius: '10px',
					background: 'var(--background-color)',
					color: '#ff0000',
				},
			});
			return;
		}
		if (description.trim() === '') {
			toast('Ошибка, заполни заголовок!', {
				icon: '✔',
				duration: 1000,
				style: {
					borderRadius: '10px',
					background: 'var(--background-color)',
					color: '#ff0000',
				},
			});
			return;
		}
        
		if (!currentTodo) return;
		const newTodo: ITodo = {
			...currentTodo,
			dateCompleted: date,
			title,
			description,
		};
		addTodo(newTodo);
		toast('Сохранено!', {
			icon: '✔',
			duration: 1000,
			style: {
				borderRadius: '10px',
				background: 'var(--background-color)',
				color: '#fff',
			},
		});
		navigate(ROUTES.HOME);
	};

	// --- потом handleSaveShortcut
	const handleSaveShortcut = useCallback((event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 's') {
			event.preventDefault();
			handleSave();
		}
	}, [title, description, currentTodo]);

	useEffect(() => {
		window.addEventListener('keydown', handleSaveShortcut);

		return () => {
			window.removeEventListener('keydown', handleSaveShortcut);
		};
	}, [handleSaveShortcut]);

	if (!currentTodo) return <div>Загрузка...</div>;

	const priority: Map<Priority, IDropDownMenuValue> = new Map();
	priority.set(Priority.LOW, {
		value: 'Низкий',
		color: 'var(--priorityLow)',
	});
	priority.set(Priority.MEDIUM, {
		value: 'Средний',
		color: 'var(--priorityMedium)',
	});
	priority.set(Priority.HIGH, {
		value: 'Высокий',
		color: 'var(--priorityHigh)',
	});

	const lowPriority = priority.get(currentTodo.priority);
	const initialValue = lowPriority ? lowPriority : {
		value: 'ошибка',
		color: '#FF0000',
	};

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value; // в формате 'YYYY-MM-DD'
		if (!isNaN(Date.parse(newDate))) {
			setDate(DateUtils.formatToUTC(newDate));
		} else {
			console.warn('Невалидная дата');
		}
	};

	const handleSetPriority = (priority: Priority) => {
		setCurrentTodo(prevTodo => ({
			...prevTodo,
			priority: priority,
		}));
	};

	const handleCompleted = () => {
		setCurrentTodo(prevTodo => ({
			...prevTodo,
			isDone: true,
		}));
		navigate(ROUTES.HOME);
	};

	return (
		<div className={styles.CreateTodo}>
			<InputApp
				className={styles.CreateTodoTitle}
				value={currentTodo.title}
				onChange={(text) => setTitle(text)}
			/>
			<InputApp
				className={styles.CreateTodoDescription}
				value={currentTodo.description}
				onChange={(text) => setDescription(text)}
			/>

			<div className={styles.CreateTodoProperties}>
				<div className={styles.Date}>
					<img style={{ justifySelf: 'right', alignSelf: 'center' }} src={TimeSvg}/>
					<div className={styles.Title}>
						<span style={{ fontSize: '20px', fontWeight: 'bold' }}>
							{DateUtils.formatUTCToRussian(date)}
						</span>
						<input
							type='date'
							defaultValue={DateUtils.formatUTCToInputDate(currentTodo.dateCompleted)}
							onChange={handleDateChange}
						/>
					</div>
				</div>

				<div className={styles.ActionButtons}>
					<Button onClick={handleCompleted} size='medium' className={styles.CompletedButton}>
						Выполнить
					</Button>
					<Button onClick={handleSave} size='medium' className={styles.SaveButton}>
						Сохранить
					</Button>
				</div>

				<div className={styles.Priorities}>
					<DropDownMenu onSelect={handleSetPriority} values={priority} initialValue={initialValue}/>
				</div>
			</div>
		</div>
	);
};

export default CreatePage;