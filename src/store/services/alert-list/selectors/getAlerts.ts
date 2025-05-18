import { RootState } from '../../../store';

export const getAlerts = (state: RootState) => state.alerts.alerts;