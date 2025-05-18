import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './services/session/slice/sessionSlice';
import todoListSlice from './services/todo-list/slice/todoListSlice';
import { TodoReactAPI } from '../app/api/todoReactAPI';
import alertListSlice from './services/alert-list/slice/alertListSlice';

export const reducers = combineReducers({
	session: sessionSlice,
	todos: todoListSlice,
	alerts: alertListSlice,
	[TodoReactAPI.reducerPath]: TodoReactAPI.reducer,
});
