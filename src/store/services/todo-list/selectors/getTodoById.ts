import {RootState} from "../../../store.ts";

export const getTodos = (state: RootState) => state.todos.todos;
