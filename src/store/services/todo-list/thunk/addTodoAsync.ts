import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import ITodo from '../../../../entities/models/ITodo';
import axios from 'axios';

export const addTodoAsync = createAppAsyncThunk(
	'todoList/addTodoAsync',
	async (todo: Partial<ITodo>, { rejectWithValue }) => {
		try {
			const response = await axios.post('http://localhost:4000/api/todo',
				{
					title: todo.title,
					description: todo.description,
					priority: todo.priority,
					dateCompleted: todo.dateCompleted,
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue('Failed to add todo');
		}
	}
);