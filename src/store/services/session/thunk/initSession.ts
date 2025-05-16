import { ISessionState } from '../types/ISessionState';
import { setSessionData } from '../slice/sessionSlice';
import { AppThunk } from '../../../store';

/**
 * Инициализтрует сессию один раз при первом посещении.
 */
/**
 * Утилита для чтения cookie
 */
const getCookie = (name: string): string | null => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : null;
};

/**
 * Утилита для установки cookie
 */
const setCookie = (name: string, value: string, days = 365) => {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const COOKIE_KEY = 'X-Session-ID';

export const initSession = (): AppThunk => (dispatch) => {
	const now = Date.now();
	const sessionRaw = getCookie(COOKIE_KEY);

	if (sessionRaw) {
		try {
			const data: ISessionState = JSON.parse(sessionRaw);

			if (data.sessionId) {
				console.log('найдена валидная сессия в cookie', data);
				const updatedSession = { ...data };
				dispatch(setSessionData(updatedSession));
				setCookie(COOKIE_KEY, JSON.stringify(updatedSession));
				return;
			}
		} catch (e) {
			console.warn('Ошибка при чтении session из cookie');
			setCookie(COOKIE_KEY, '', -1); // удалить cookie
		}
	}

	// Если сессия не найдена — создаём новую
	const newSession: ISessionState = {
		sessionId: `session-${now}`,
	};

	dispatch(setSessionData(newSession));
	setCookie(COOKIE_KEY, JSON.stringify(newSession));
	console.log('создана новая сессия в cookie', newSession);
};

// export const initSession = (): AppThunk => (dispatch) => {
// 	const session = localStorage.getItem(StorageKeyType.SESSION);
// 	const now = Date.now();
//
// 	if (session) {
// 		try {
// 			const data: ISessionState = JSON.parse(session);
//
// 			if (data.sessionId) {
// 				console.log('найдена валидная сессия', data);
// 				dispatch(setSessionData({ ...data, lastActivity: now }));
// 				localStorage.setItem(StorageKeyType.SESSION, JSON.stringify({ ...data, lastActivity: now }));
// 				return;
// 			}
// 		} catch (e) {
// 			console.warn('Ошибка при чтении session из localStorage');
// 			localStorage.removeItem(StorageKeyType.SESSION);
// 		}
// 	}
//
// 	// Если сессия не найдена — создаём новую
// 	const newSessionId = `session-${now}`;
// 	const newSession: ISessionState = {
// 		sessionId: newSessionId,
// 		lastActivity: now,
// 	};
//
// 	dispatch(setSessionData(newSession));
// 	localStorage.setItem(StorageKeyType.SESSION, JSON.stringify(newSession));
// 	console.log('создана новая сессия', newSession);
// };