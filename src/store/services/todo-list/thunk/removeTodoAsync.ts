import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import axios from 'axios';

export const removeTodoAsync = createAppAsyncThunk(
	'todoList/removeTodoAsync',
	async (id: string, { rejectWithValue }) => {
		try {
			await axios.delete(`http://localhost:4000/api/todos/${id}`);
			return id; // Возвращаем ID удалённого todo
		} catch (error) {
			return rejectWithValue('Failed to delete todo');
		}
	}
);