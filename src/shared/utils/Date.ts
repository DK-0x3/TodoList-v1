import { isToday, isTomorrow, isThisWeek, parseISO, format } from 'date-fns';
import ITodo from '../../entities/models/ITodo';
import { ru } from 'date-fns/locale';

class Date {
	public groupTodosByDate = (todos: ITodo[]): Record<string, ITodo[]> => {
		const groups: Record<string, ITodo[]> = {};

		todos.forEach((todo) => {
			if (todo.isDeleted) return;

			const date = parseISO(todo.dateCompleted);

			let group = 'Позже';

			if (isToday(date)) {
				group = 'Сегодня';
			} else if (isTomorrow(date)) {
				group = 'Завтра';
			} else if (isThisWeek(date, { weekStartsOn: 1 })) {
				group = 'На этой неделе';
			}

			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(todo);
		});

		return groups;
	};

	public formatDateToRussian = (dateString: string): string => {
		const date = parseISO(dateString); // превращаем строку в объект Date
		return format(date, 'd MMMM yyyy', { locale: ru }); // форматируем
	};
}

export const DateUtils = new Date();