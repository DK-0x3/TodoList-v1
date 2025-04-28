import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodoListSlice } from '../types/ITodoListSlice';
import ITodo from '../../../../entities/models/ITodo';
import { removeTodoAsync } from '../thunk/removeTodoAsync';
import { addTodoAsync } from './addTodoAsync';
import { updateTodoAsync } from './updateTodoAsync';

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
		removeTodo: (state, action: PayloadAction<string>) => {
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(removeTodoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(removeTodoAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.todos = state.todos.filter(todo => todo.id !== action.payload);
			})
			.addCase(removeTodoAsync.rejected, (state, action) => {
				state.status = 'failed';
				console.log(action.payload);
			})
			.addCase(addTodoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.todos.push(action.payload); // Добавляем todo в состояние
			})
			.addCase(addTodoAsync.rejected, (state, action) => {
				state.status = 'failed';
				console.log(action.payload);
			})
			.addCase(updateTodoAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateTodoAsync.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const index = state.todos.findIndex(todo => todo.id === action.payload.id);
				if (index !== -1) {
					state.todos[index] = action.payload; // Обновляем todo в состоянии
				}
			})
			.addCase(updateTodoAsync.rejected, (state, action) => {
				state.status = 'failed';
				console.log(action.payload);
			});
	},
});

export const { addTodos, removeTodo, updateTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
