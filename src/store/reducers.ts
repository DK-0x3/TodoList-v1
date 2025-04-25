import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from './services/session/slice/sessionSlice.ts';
import todoListSlice from "./services/todo-list/slice/todoListSlice.ts";

export const reducers = combineReducers({
	session: sessionSlice,
	todos: todoListSlice,
});
