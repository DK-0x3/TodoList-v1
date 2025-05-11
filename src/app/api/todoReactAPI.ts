import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '../../entities/models/ITodo';
import {
	updateTodo as updateTodoInSlice,
	addTodos as addTodosInSlice,
} from '../../store/services/todo-list/slice/todoListSlice';
import Priority from '../../entities/models/Priority';

export interface IResponseTodo {
	id: string;
	title: string;
	description: string;
	priority: Priority;
	done: boolean;
	dateCompleted: string;
	isDeleted: boolean;
}

export const TodoReactAPI = createApi({
	reducerPath: 'todoAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1941/api/' }),
	tagTypes: ['Todos'],
	endpoints: builder => ({
		fetchTodos: builder.query<ITodo[], void>({
			query: () => 'todos',

			// Тип данных, который возвращает сервер
			transformResponse: (response: IResponseTodo[]): ITodo[] => {
				return response.map(todo => ({
					id: todo.id,
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
					isDone: todo.done,
					isDeleted: todo.isDeleted,
				}));
			},

			providesTags: ['Todos'],
		}),

		addTodo: builder.mutation<ITodo, Partial<ITodo>>({
			query: (todo) => ({
				url: 'todo',
				method: 'POST',
				body: {
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
				},
			}),
			invalidatesTags: ['Todos'],

			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(addTodosInSlice([data]));
				} catch (err) {
					console.error('Ошибка при обновлении todo:', err);
				}
			},
		}),

		updateTodo: builder.mutation<ITodo, Partial<ITodo>>({
			query: (todo) => ({
				url: `todo/${todo.id}`,
				method: 'PUT',
				body: {
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
					done: todo.isDone,
					isDeleted: todo.isDeleted,
				},
			}),
			invalidatesTags: ['Todos'],

			async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
					dispatch(updateTodoInSlice(data));
				} catch (err) {
					console.error('Ошибка при обновлении todo:', err);
				}
			},
		}),
	}),
});

export const {
	useFetchTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
} = TodoReactAPI;