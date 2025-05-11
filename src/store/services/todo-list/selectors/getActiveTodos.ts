import { RootState } from '../../../store';

export const getActiveTodos = (state: RootState) => state.todos.todos.filter(todo => !todo.isDone && !todo.isDeleted);
