import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAlertListSlice } from '../types/IAlertListSlice';
import { IAlert } from '../../../../entities/models/IAlert';

const loadInitialState = (): IAlertListSlice => {
	try {
		const serialized = localStorage.getItem('alertList');
		if (serialized) {
			return JSON.parse(serialized);
		}
	} catch (e) {
		console.error('Ошибка загрузки alertList из localStorage', e);
	}

	// Если ничего нет, верни дефолт
	return {
		alerts: [],
		nextId: 0,
	};
};

// const initialState: IAlertListSlice = {
// 	alerts: [
// 		{
// 			id: 0,
// 			todoId: 20,
// 			date: '2025-05-19T17:20:00.000Z',
// 			title: 'Yasdhjsdfb'
// 		},
// 		{
// 			id: 1,
// 			todoId: 20,
// 			date: '2025-05-18T17:20:00.000Z',
// 			title: 'ioppoiiolpo;iop'
// 		},
// 		{
// 			id: 2,
// 			todoId: 20,
// 			date: '2025-05-20T17:20:00.000Z',
// 			title: 'dfghfjhfghdgfbfbdvsb'
// 		}
// 	],
// 	nextId: 3,
// };

const alertListSlice = createSlice({
	name: 'alertList',
	initialState: loadInitialState(),
	reducers: {
		addAlert: (state, action: PayloadAction<IAlert>) => {
			state.alerts.push({
				...action.payload,
				id: state.nextId,
			});
			state.nextId++;
		},
		removeAlert: (state, action: PayloadAction<number>) => {
			state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
		},
		updateAlert: (state, action: PayloadAction<IAlert>) => {
			const index = state.alerts.findIndex(alert => alert.id === action.payload.id);

			if (index === -1) {
				state.alerts.push(action.payload);
			} else {
				state.alerts[index] = action.payload;
			}
		},
	}
});

export const { addAlert, removeAlert, updateAlert } = alertListSlice.actions;
export default alertListSlice.reducer;