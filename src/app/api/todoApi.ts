import ITodo from '../../entities/models/ITodo';
import axios from 'axios';

class TodoApi {
	// Функция для получения todos
	public fetchTodos = async (): Promise<ITodo[]> => {
		const response = await axios.get('http://localhost:4000/api/todos');
		return response.data;
	};

	// Функция для добавления todo
	public addTodo = async (todo: Partial<ITodo>): Promise<ITodo> => {
		const response = await axios.post<ITodo>('http://localhost:1941/api/todo',
			{
				title: todo.title,
				description: todo.description,
				priority: todo.priority,
				dateCompleted: todo.dateCompleted,
			}
		);
		return response.data;
	};

	// Функция для обновления todo
	public updateTodo = async (data: Partial<ITodo>): Promise<ITodo> => {
		const response = await axios.put(
			`http://localhost:4000/api/todos/${data.id}`,
			data
		);
		return response.data;
	};
}

export const TodoAPI = new TodoApi();