import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../store/reducer';


export type Config = {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
};
