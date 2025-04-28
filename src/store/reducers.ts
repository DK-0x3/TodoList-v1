import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './services/session/slice/sessionSlice';
import todoListSlice from './services/todo-list/slice/todoListSlice';

export const reducers = combineReducers({
	session: sessionSlice,
	todos: todoListSlice,
});
