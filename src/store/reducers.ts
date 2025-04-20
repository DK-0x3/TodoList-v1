import { combineReducers } from '@reduxjs/toolkit';
import sessionSlice from "./services/session/slice/sessionSlice.ts";

export const reducers = combineReducers({
	session: sessionSlice,
});