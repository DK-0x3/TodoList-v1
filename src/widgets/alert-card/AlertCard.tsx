import styles from './AlertCard.module.scss';
import { IAlert } from '../../entities/models/IAlert';
import TimeSvg from '../../shared/assets/svg/time.svg';
import deleteSvg from '../../shared/assets/svg/delete.svg';
import { DateUtils } from '../../shared/utils/Date';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/types/useAppDispatch';
import { removeAlert, updateAlert } from '../../store/services/alert-list/slice/alertListSlice';

export interface IAlertCardProps {
	alert: IAlert;
}

export const AlertCard = (props: IAlertCardProps) => {
	const { alert } = props;
	const dispatch = useAppDispatch();

	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [title, setTitle] = useState(alert.title);
	const titleInputRef = useRef<HTMLInputElement>(null);

	const [isEditingDate, setIsEditingDate] = useState(false);
	const [date, setDate] = useState(alert.date); // ISO-строка
	const dateInputRef = useRef<HTMLInputElement>(null);

	// Автофокус для title
	useEffect(() => {
		if (isEditingTitle) {
			titleInputRef.current?.focus();
		}
	}, [isEditingTitle]);

	// Автофокус для date
	useEffect(() => {
		if (isEditingDate) {
			dateInputRef.current?.focus();
		}
	}, [isEditingDate]);

	const handleTitleBlur = () => {
		setIsEditingTitle(false);

		dispatch(updateAlert({
			...alert,
			title: title,
		}));
	};

	const handleDateBlur = () => {
		setIsEditingDate(false);

		dispatch(updateAlert({
			...alert,
			date: date,
		}));
	};

	const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			titleInputRef.current?.blur();
		}
	};

	const handleDateKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			dateInputRef.current?.blur();
		}
	};

	const handleDeleteAlert = () => {
		setIsEditingTitle(false);
		dispatch(removeAlert(alert.id));
	};

	const toLocalDatetimeValue = (isoString: string): string => {
		const date = new Date(isoString);
		const pad = (n: number) => n.toString().padStart(2, '0');

		const year = date.getFullYear();
		const month = pad(date.getMonth() + 1);
		const day = pad(date.getDate());
		const hours = pad(date.getHours());
		const minutes = pad(date.getMinutes());

		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	return (
		<div className={styles.AlertCard}>
			{isEditingTitle ? (
				<input
					ref={titleInputRef}
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={handleTitleBlur}
					onKeyDown={handleTitleKeyDown}
					className={styles.AlertCardInput}
				/>
			) : (
				<span onClick={() => setIsEditingTitle(true)} className={styles.AlertCardTitle}>
					{title}
				</span>
			)}

			<div className={styles.AlertCardDateTime}>
				<img src={TimeSvg} alt="time icon" />
				{isEditingDate ? (
					<input
						ref={dateInputRef}
						type="datetime-local"
						value={toLocalDatetimeValue(date)}
						onChange={(e) => setDate(new Date(e.target.value).toISOString())}
						onBlur={handleDateBlur}
						onKeyDown={handleDateKeyDown}
						className={styles.AlertCardInput}
					/>
				) : (
					<span onClick={() => setIsEditingDate(true)}>
						{DateUtils.formatDateTimeUTCToRussian(date)}
					</span>
				)}
			</div>

			<img
				style={{ alignSelf: 'center', justifySelf: 'center', cursor: 'pointer' }}
				src={deleteSvg}
				onClick={handleDeleteAlert}
			/>
		</div>
	);
};