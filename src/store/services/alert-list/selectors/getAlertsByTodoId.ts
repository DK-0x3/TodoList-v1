import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const selectAlerts = (state: RootState) => state.alerts.alerts;

export const makeGetAlertsByTodoId = () => createSelector(
	[selectAlerts, (_: RootState, todoId: number) => todoId],
	(alerts, todoId) => alerts.filter(alert => alert.todoId === todoId)
);