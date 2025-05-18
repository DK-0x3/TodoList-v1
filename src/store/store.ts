import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './reducers';
import { TodoReactAPI } from '../app/api/todoReactAPI';

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(TodoReactAPI.middleware),
});

store.subscribe(() => {
	const state = store.getState();
	try {
		const serialized = JSON.stringify(state.alerts);
		localStorage.setItem('alertList', serialized);
	} catch (e) {
		console.error('Ошибка сохранения alertList в localStorage', e);
	}
});

// Экспорт типов для глобального состояния и dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppThunk<ReturnType = void> = (
	dispatch: AppDispatch,
	getState: () => RootState
) => ReturnType;