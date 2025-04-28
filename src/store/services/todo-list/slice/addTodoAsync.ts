import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import ITodo from '../../../../entities/models/ITodo';
import axios from 'axios';

export const addTodoAsync = createAppAsyncThunk(
	'todoList/addTodoAsync',
	async (todo: Partial<ITodo>, { rejectWithValue }) => {
		try {
			const response = await axios.post('http://localhost:4000/api/todos', todo);
			return response.data; // Возвращаем добавленный todo
		} catch (error) {
			return rejectWithValue('Failed to add todo');
		}
	}
);