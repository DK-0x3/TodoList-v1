import { format, isThisWeek, isToday, isTomorrow, parseISO } from 'date-fns';
import ITodo from '../../entities/models/ITodo';
import { ru } from 'date-fns/locale';
import Priority from '../../entities/models/Priority';

class DateUtil {
	public groupTodosByDate = (todos: ITodo[]): Record<string, ITodo[]> => {
		const groups: Record<string, ITodo[]> = {
			'Сегодня': [],
			'Завтра': [],
			'На этой неделе': [],
			'Позже': [],
		};

		todos.forEach((todo) => {
			const date = parseISO(todo.dateCompleted);
			let group = 'Позже';

			if (isToday(date)) {
				group = 'Сегодня';
			} else if (isTomorrow(date)) {
				group = 'Завтра';
			} else if (isThisWeek(date, { weekStartsOn: 1 })) {
				group = 'На этой неделе';
			}

			groups[group].push(todo);
		});

		// Удаляем пустые группы
		Object.keys(groups).forEach((key) => {
			if (groups[key].length === 0) {
				delete groups[key];
			}
		});

		return groups;
	};

	public groupTodosByPriority = (todos: ITodo[]): Record<string, ITodo[]> => {
		const groups: Record<string, ITodo[]> = {
			'Низкий приоритет': [],
			'Средний приоритет': [],
			'Высокий приоритет': [],
		};

		todos.forEach((todo) => {
			if (todo.priority === Priority.LOW) {
				groups['Низкий приоритет'].push(todo);
			} else if (todo.priority === Priority.MEDIUM) {
				groups['Средний приоритет'].push(todo);
			} else if (todo.priority === Priority.HIGH) {
				groups['Высокий приоритет'].push(todo);
			}
		});

		// Удаляем пустые группы
		Object.keys(groups).forEach((key) => {
			if (groups[key].length === 0) {
				delete groups[key];
			}
		});

		return groups;
	};

	public formatUTCToRussian = (utcString: string): string => {
		const date = parseISO(utcString);
		return format(date, 'd MMMM yyyy', { locale: ru });
	};

	public formatUTCToInputDate = (utcString: string): string => {
		const date = parseISO(utcString);
		return format(date, 'yyyy-MM-dd');
	};

	public formatToUTC = (dateString: string): string => {
		if (!dateString) return '';

		let date: Date;

		// Если строка похожа на 'YYYY-MM-DD', добавляем время вручную
		if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
			date = new Date(dateString + 'T00:00:00Z'); // Явно UTC
		} else {
			date = new Date(dateString);
		}

		if (isNaN(date.getTime())) {
			console.warn('formatToUTC: Невалидная дата', dateString);
			return '';
		}

		return date.toISOString(); // <--- ВАЖНО: toISOString, а НЕ toUTCString
	};
}

export const DateUtils = new DateUtil();
