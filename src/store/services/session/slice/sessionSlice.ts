import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISessionState } from '../types/ISessionState';

const initialState: ISessionState = {
	sessionId: null,
};

const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setSessionData: (state, action: PayloadAction<ISessionState>) => {
			state.sessionId = action.payload.sessionId;
		},
		clearSessionData: (state) => {
			state.sessionId = null;
		}
	},
});

export const { setSessionData, clearSessionData } = sessionSlice.actions;
export default sessionSlice.reducer;