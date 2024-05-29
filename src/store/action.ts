import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { City } from '../types/location';
import { OfferProps, OfferReview, OfferWithDetailsProps } from '../types/offer';
import { SortStrategy } from '../components/offers-sort/sort-strategy';
import { AppDispatch, State } from './reducer';
import { UserAuthState } from '../components/private-route/userAuthState';
import { UserInfo } from '../components/private-route/user-info';


export type AddReviewModelApi = {
    id: string;
    comment: string;
    rating: number;
}

export type AddFavoriteOfferModelApi = {
  id: string;
  status: number;
}

export const pickCity = createAction<City>('pickCity');
export const setOffers = createAction<OfferProps[] | undefined>('setOffers');
export const setCurrentOffer = createAction<OfferWithDetailsProps | undefined>('setCurrentOffer');
export const setOffersNearby = createAction<OfferProps[] | undefined>('setOffersNearby');
export const setOfferReviews = createAction<OfferReview[] | undefined>('setOfferReviews');
export const chooseSortStrategy = createAction<SortStrategy>('chooseSortStrategy');
export const setFavoriteOffers = createAction<OfferProps[]>('setFavoriteOffers');
export const setAuthState = createAction<UserAuthState>('setAuthState');
export const setUserInfo = createAction<UserInfo>('setUserInfo');

type Config = { dispatch: AppDispatch; state: State; extra: AxiosInstance };

export const fetchOffers = createAsyncThunk<void, undefined, Config>
('fetchOffers', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>('/offers');
  dispatch(setOffers(data));
});

export const fetchOfferById = createAsyncThunk<void, string, Config>
('setCurrentOffer', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferWithDetailsProps>(`/offers/${offerId}`);
  dispatch(setCurrentOffer(data));
});

export const fetchOffersNearby = createAsyncThunk<void, string, Config>
('setOffersNearby', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>(`/offers/${offerId}/nearby`);
  dispatch(setOffersNearby(data));
});

export const fetchOfferReviews = createAsyncThunk<void, string, Config>
('setOfferReviews', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferReview[]>(`/comments/${offerId}`);
  dispatch(setOfferReviews(data));
});

export const addOfferReview = createAsyncThunk<void, AddReviewModelApi, Config>
('setOfferReviews', async (model, { dispatch, extra: api }) => {
  const { status } = await api.post<OfferReview>(`/comments/${model.id}`, { comment: model.comment, rating: model.rating });
  if(status === 201) {
    dispatch(fetchOfferReviews(model.id));
  }
});

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, Config>
('fetchFavoriteOffers', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>('/favorite');
  dispatch(setFavoriteOffers(data));
});

export const addFavoriteOffer = createAsyncThunk<void, AddFavoriteOfferModelApi, Config>
('fetchFavoriteOffers', async (model, { extra: api }) => {
  await api.post<OfferProps[]>(`/favorite/${model.id}/${model.status}`);
});

export const checkAuth = createAsyncThunk<void, undefined, Config>
('checkAuth', async (_, { dispatch, extra: api }) => {
  api.defaults.headers.common['X-Token'] = localStorage.getItem('token');
  const { data } = await api.get<UserInfo>('/login');
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
