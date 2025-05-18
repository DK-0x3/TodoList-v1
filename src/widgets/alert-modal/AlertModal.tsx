import styles from './AlertModal.module.scss';
import ITodo from '../../entities/models/ITodo';
import { AlertList } from '../alert-list/AlertList';
import { useAppSelector } from '../../store/types/useAppSelector';
import { useMemo } from 'react';
import { makeGetAlertsByTodoId } from '../../store/services/alert-list/selectors/getAlertsByTodoId';
import { useAppDispatch } from '../../store/types/useAppDispatch';
import { addAlert } from '../../store/services/alert-list/slice/alertListSlice';

export interface IAlertModalProps {
	todo: ITodo;
}

export const AlertModal = (props: IAlertModalProps) => {
	const {
		todo,
	} = props;
	const dispatch = useAppDispatch();

	const getAlertsByTodoId = useMemo(() => makeGetAlertsByTodoId(), []);
	const alerts = useAppSelector(state => getAlertsByTodoId(state, todo.id));

	const handleCreateAlert = () => {
		dispatch(addAlert({
			id: 0,
			date: new Date().toISOString(),
			title: 'Новое оповещение',
			todoId: todo.id,
		}));
	};

	return (
		<div className={styles.AlertModal}>
			<div className={styles.AlertModalTitle}>
				<h2>Оповещения</h2>
				<button
					onClick={handleCreateAlert}
				>
					+
				</button>
			</div>

			<div>
				<AlertList alerts={alerts}/>
			</div>
		</div>
	);
};