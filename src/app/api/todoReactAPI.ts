import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import ITodo from '../../entities/models/ITodo';
import {
	updateTodo as updateTodoInSlice,
	addTodos as addTodosInSlice,
	removeTodo as removeTodoFromSlice,
} from '../../store/services/todo-list/slice/todoListSlice';
import Priority from '../../entities/models/Priority';

export interface IResponseTodo {
	message: {
		id: number;
		title: string;
		description: string;
		priority: Priority;
		done: boolean;
		dateCompleted: string;
	}[];
}

export interface IResponseAddTodo {
	message: ITodo,
	status: string,
}

export const TodoReactAPI = createApi({
	reducerPath: 'todoAPI',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1941/api/', credentials: 'include' }),
	tagTypes: ['Todos'],
	endpoints: builder => ({
		fetchTodos: builder.query<ITodo[], void>({
			query: () => 'todo',

			transformResponse: (response: IResponseTodo): ITodo[] => {
				return response.message.map(todo => ({
					id: todo.id,
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
					isDone: todo.done,
				}));
			},

			providesTags: ['Todos'],
		}),

		addTodo: builder.mutation<IResponseAddTodo, ITodo>({
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
					console.log(data);
					dispatch(addTodosInSlice([data.message]));
				} catch (err) {
					console.error('Ошибка при обновлении todo:', err);
				}
			},
		}),

		updateTodo: builder.mutation<null, Partial<ITodo>>({
			query: (todo) => ({
				url: `todo/${todo.id}`,
				method: 'PUT',
				body: {
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
					done: todo.isDone,
				},
			}),
			invalidatesTags: ['Todos'],

			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;

					const updatedTodo: ITodo = {
						id: arg.id ?? Math.random(),
						title: arg.title ?? '',
						description: arg.description ?? '',
						priority: arg.priority ?? Priority.LOW,
						dateCompleted: arg.dateCompleted ?? '',
						isDone: arg.isDone ?? false,
					};

					dispatch(updateTodoInSlice(updatedTodo));
				} catch (err) {
					console.error('Ошибка при обновлении todo:', err);
				}
			},
		}),

		deleteTodo: builder.mutation<{ success: boolean; id: number }, number>({
			query: (id) => ({
				url: `todo/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todos'],

			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(removeTodoFromSlice(id));
				} catch (err) {
					console.error('Ошибка при удалении todo:', err);
				}
			},
		})

	}),
});

export const {
	useFetchTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = TodoReactAPI;