import { createAppAsyncThunk } from '../../../types/createAppAsyncThunk';
import ITodo from '../../../../entities/models/ITodo';
import { TodoAPI } from '../../../../app/api/todoApi';

export const updateTodoAsync = createAppAsyncThunk(
	'todoList/updateTodoAsync',
	async (data: Partial<ITodo>, { rejectWithValue }) => {
		try {
			return TodoAPI.updateTodo(data);
		} catch (error) {
			return rejectWithValue('Failed to update todo');
		}
	}
);