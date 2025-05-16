// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoListSlice } from '../types/ITodoListSlice';
import ITodo from '../../../../entities/models/ITodo';

const initialState: ITodoListSlice = {
	todos: [],
	status: 'success',
};

const todoListSlice = createSlice({
	name: 'todoList',
	initialState,
	reducers: {
		addTodos: (state, action: PayloadAction<ITodo[]>) => {
			action.payload.forEach(newTodo => {
				const exists = state.todos.some(todo => todo.id === newTodo.id);
				if (!exists) {
					state.todos.push(newTodo);
				}
			});
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload);
		},
		updateTodo: (state, action: PayloadAction<ITodo>) => {
			const index = state.todos.findIndex(todo => todo.id === action.payload.id);

			if (index === -1) {
				state.todos.push(action.payload);
			} else {
				state.todos[index] = action.payload;
			}
		},
	}
});

export const { addTodos, removeTodo, updateTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
