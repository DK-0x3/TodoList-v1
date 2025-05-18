import { RootState } from '../../../store';
import { createSelector } from '@reduxjs/toolkit';

const getTodos = (state: RootState) => state.todos.todos;

export const getActiveTodos = createSelector(
	[getTodos],
	(todos) => todos.filter(todo => !todo.isDone)
);