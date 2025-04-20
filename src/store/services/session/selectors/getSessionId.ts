import {RootState} from "../../../store.ts";

export const getSessionId = (state: RootState) => state.session.sessionId;