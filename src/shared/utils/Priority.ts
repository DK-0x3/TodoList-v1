import Priority from '../../entities/models/Priority';

class PriorityUtil {
	public priorityToText(priority: Priority): string {
		switch (priority) {
		case Priority.LOW:
			return 'Низкий';
		case Priority.MEDIUM:
			return 'Средний';
		case Priority.HIGH:
			return 'Высокий';
		default:
			return '';
		}
	}

	public priorityToColor(priority: Priority): string {
		switch (priority) {
		case Priority.LOW:
			return 'var(--priorityLow)';
		case Priority.MEDIUM:
			return 'var(--priorityMedium)';
		case Priority.HIGH:
			return 'var(--priorityHigh)';
		default:
			return '';
		}
	}
}

export const PriorityUtils = new PriorityUtil();