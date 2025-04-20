import { clearSessionData } from '../slice/sessionSlice';
import {StorageKeyType} from "../../../../shared/types/LocalStorageKey.ts";
import {AppThunk} from "../../../store.ts";

export const resetSession = (): AppThunk => (dispatch) => {
	dispatch(clearSessionData());
	localStorage.removeItem(StorageKeyType.SESSION);
};