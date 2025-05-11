import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import axios from 'axios';

export const removeTodoAsync = createAppAsyncThunk(
	'todoList/removeTodoAsync',
	async (id: string, { rejectWithValue }) => {
		try {
			await axios.delete(`http://localhost:1941/api/todos/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue('Failed to delete todo');
		}
	}
);