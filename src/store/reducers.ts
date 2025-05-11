import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './services/session/slice/sessionSlice';
import todoListSlice from './services/todo-list/slice/todoListSlice';
import { TodoReactAPI } from '../app/api/todoReactAPI';

export const reducers = combineReducers({
	session: sessionSlice,
	todos: todoListSlice,
	[TodoReactAPI.reducerPath]: TodoReactAPI.reducer,
});
