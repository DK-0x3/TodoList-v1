import { FC } from 'react';
import { IAlert } from '../../entities/models/IAlert';
import styles from './AlertList.module.scss';
import { AlertCard } from '../alert-card/AlertCard';

export interface IAlertListProps {
    alerts: IAlert[];
}

export const AlertList: FC<IAlertListProps> = (props) => {
	const { alerts } = props;

	return (
		<div className={styles.AlertList}>
			{
				alerts.map(alert => (
					<AlertCard key={alert.id} alert={alert}/>
				))
			}
		</div>
	);
};