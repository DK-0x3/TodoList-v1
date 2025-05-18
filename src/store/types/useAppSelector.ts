// eslint-disable-next-line import/named
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;