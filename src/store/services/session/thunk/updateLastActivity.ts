import { setSessionData } from '../slice/sessionSlice';
import {StorageKeyType} from "../../../../shared/types/LocalStorageKey.ts";
import {AppThunk} from "../../../store.ts";

export const updateLastActivity = (): AppThunk => (dispatch, getState) => {
	const state = getState().session;
	if (!state) return;

	const updated = { ...state, lastActivity: Date.now() };
	dispatch(setSessionData(updated));
	localStorage.setItem(StorageKeyType.SESSION, JSON.stringify(updated));
};