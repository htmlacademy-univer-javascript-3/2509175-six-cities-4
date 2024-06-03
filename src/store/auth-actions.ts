import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { UserAuthState } from '../components/private-route/userAuthState';
import { UserInfo } from '../types/user';
import { Config } from '../types/store-config';
import { fetchOffers } from './offer-actions';

export const setAuthState = createAction<UserAuthState>('setAuthState');
export const setUserInfo = createAction<UserInfo>('setUserInfo');

export const checkAuth = createAsyncThunk<void, undefined, Config>
('checkAuth', async (_, { dispatch, extra: api }) => {
  api.defaults.headers.common['X-Token'] = localStorage.getItem('token');
  const { data } = await api.get<UserInfo>('/login');
  dispatch(fetchOffers());
  if (data) {
    dispatch(setAuthState(UserAuthState.Auth));
    dispatch(setUserInfo(data));
  } else {
    dispatch(setAuthState(UserAuthState.UnAuth));
  }
});

export const auth = createAsyncThunk<void, { email: string; password: string }, Config>
('auth', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserInfo>('/login', { email, password });
  if (data) {
    localStorage.setItem('token', data.token);
    api.defaults.headers.common['X-Token'] = data.token;
    dispatch(setAuthState(UserAuthState.Auth));
    dispatch(setUserInfo(data));
  }
});

export const unauth = createAsyncThunk<void, undefined, Config>
('unauth', async (_, { dispatch, extra: api }) => {
  const { status } = await api.delete<UserInfo>('/logout');
  if (status === 204) {
    api.defaults.headers.common['X-Token'] = null;
    localStorage.setItem('token', '');
    dispatch(setAuthState(UserAuthState.UnAuth));
  }
});
