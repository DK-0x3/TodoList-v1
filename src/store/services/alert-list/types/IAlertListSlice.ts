import { IAlert } from '../../../../entities/models/IAlert';

export interface IAlertListSlice {
    alerts: IAlert[];
    nextId: number;
}