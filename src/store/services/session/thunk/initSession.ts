import { ISessionState } from '../types/ISessionState';
import { setSessionData } from '../slice/sessionSlice';
import { StorageKeyType } from '../../../../shared/types/LocalStorageKey';
import { AppThunk } from '../../../store';

/**
 * Инициализтрует сессию один раз при первом посещении.
 */
export const initSession = (): AppThunk => (dispatch) => {
	const session = localStorage.getItem(StorageKeyType.SESSION);
	const now = Date.now();

	if (session) {
		try {
			const data: ISessionState = JSON.parse(session);

			if (data.sessionId) {
				console.log('найдена валидная сессия', data);
				dispatch(setSessionData({ ...data, lastActivity: now }));
				localStorage.setItem(StorageKeyType.SESSION, JSON.stringify({ ...data, lastActivity: now }));
				return;
			}
		} catch (e) {
			console.warn('Ошибка при чтении session из localStorage');
			localStorage.removeItem(StorageKeyType.SESSION);
		}
	}

	// Если сессия не найдена — создаём новую
	const newSessionId = `session-${now}`;
	const newSession: ISessionState = {
		sessionId: newSessionId,
		lastActivity: now,
	};

	dispatch(setSessionData(newSession));
	localStorage.setItem(StorageKeyType.SESSION, JSON.stringify(newSession));
	console.log('создана новая сессия', newSession);
};