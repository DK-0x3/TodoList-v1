// mockServer.js
import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Enum-подобные константы
const Priority = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
};

const Status = {
	COMPLETED: 'completed',
	NOT_COMPLETED: 'not_completed',
};

// Стартовые Todo
let todos = [
	{
		id: uuidv4(),
		title: 'Купить продукты',
		description: 'Молоко, хлеб, сыр',
		priority: Priority.MEDIUM,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-29T09:32:00.000Z',
		isDeleted: false,
	},
	{
		id: uuidv4(),
		title: 'Сделать домашку',
		description: 'Математика и физика',
		priority: Priority.HIGH,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-28T09:32:00.000Z',
		isDeleted: false,
	},
	{
		id: '1',
		title: 'Первая задача',
		description: 'Описание первой задачи',
		priority: Priority.LOW,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-24T09:32:00.000Z',
		isDeleted: false,
	},
	{
		id: '2',
		title: 'Вторая задача',
		description: 'Описание второй задачи',
		priority: Priority.HIGH,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-25T10:15:00.000Z',
		isDeleted: false,
	},
	{
		id: '3',
		title: 'Третья задача',
		description: 'Описание третьей задачи',
		priority: Priority.HIGH,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-23T14:20:00.000Z',
		isDeleted: false,
	},
	{
		id: '4',
		title: 'Четвёртая задача',
		description: 'Описание четвёртой задачи',
		priority: Priority.LOW,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-26T11:00:00.000Z',
		isDeleted: false,
	},
	{
		id: '5',
		title: 'Пятая задача',
		description: 'Описание пятой задачи',
		priority: Priority.MEDIUM,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-27T09:00:00.000Z',
		isDeleted: false,
	},
	{
		id: '6',
		title: 'Шестая задача',
		description: 'Описание шестой задачи',
		priority: Priority.HIGH,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-28T08:30:00.000Z',
		isDeleted: false,
	},
	{
		id: '7',
		title: 'Седьмая задача',
		description: 'Описание седьмой задачи',
		priority: Priority.LOW,
		status: Status.COMPLETED,
		dateCompleted: '2025-04-22T07:45:00.000Z',
		isDeleted: false,
	},
	{
		id: '8',
		title: 'Восьмая задача',
		description: 'Описание восьмой задачи',
		priority: Priority.MEDIUM,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-21T15:00:00.000Z',
		isDeleted: false,
	},
	{
		id: '9',
		title: 'Девятая задача',
		description: 'Описание девятой задачи',
		priority: Priority.HIGH,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-20T13:15:00.000Z',
		isDeleted: false,
	},
	{
		id: '10',
		title: 'Десятая задача',
		description: 'Описание десятой задачи',
		priority: Priority.LOW,
		status: Status.NOT_COMPLETED,
		dateCompleted: '2025-04-19T17:20:00.000Z',
		isDeleted: true,
	},
];

// Роуты
app.get('/api/todos', (req, res) => {
	res.json(todos);
});

app.post('/api/todos', (req, res) => {
	const { title, description, priority, status, dateCompleted, isDeleted } = req.body;

	if (!title || !description || !priority) {
		return res.status(400).json({ error: 'Заполните все поля!' });
	}

	const newTodo = {
		id: uuidv4(),
		title,
		description,
		priority,
		status,
		dateCompleted,
		isDeleted,
	};

	todos.push(newTodo);
	res.status(201).json(newTodo);
});

// Роут для изменения Todo
app.put('/api/todos/:id', (req, res) => {
	const { id } = req.params;
	const { title, description, priority, status, isDeleted } = req.body;

	// Находим todo по id
	const todoIndex = todos.findIndex(todo => todo.id === id);

	if (todoIndex === -1) {
		return res.status(404).json({ error: 'Todo не найдено!' });
	}

	// Обновляем поля
	if (title) todos[todoIndex].title = title;
	if (description) todos[todoIndex].description = description;
	if (priority) todos[todoIndex].priority = priority;
	if (status) todos[todoIndex].status = status;
	if (isDeleted) todos[todoIndex].isDeleted = isDeleted;

	res.json(todos[todoIndex]);
});

// Запуск сервера
app.listen(PORT, () => {
	console.log(`Mock server работает на http://localhost:${PORT}`);
});
