import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITodoListSlice} from "../types/ITodoListSlice.ts";
import ITodo from "../../../../entities/models/ITodo.ts";

const initialState: ITodoListSlice = {
    todos: [],
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
            state.todos.forEach((todo, index) => {
                if (todo.id === action.payload.id) {
                    state.todos[index] = action.payload;
                }
            });
        },
    },
});

export const { addTodos, removeTodo, updateTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
