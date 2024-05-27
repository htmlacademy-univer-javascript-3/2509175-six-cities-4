import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { City } from '../types/location';
import { OfferProps, OfferReview, OfferWithDetailsProps } from '../types/offer';
import { SortStrategy } from '../components/offers-sort/sort-strategy';
import { AppDispatch, State } from './reducer';
import { useAppSelector } from '../hooks/use-store';


export type AddReviewModel = {
    comment: string;
    rating: number;
}

export type AddReviewModelApi = AddReviewModel & {
    id: string;
}

export const pickCity = createAction<City>('pickCity');
export const filterOffers = createAction<OfferProps[] | undefined>('filterOffers');
export const setCurrentOffer = createAction<OfferWithDetailsProps | undefined>('setCurrentOffer');
export const setOffersNearby = createAction<OfferProps[] | undefined>('setOffersNearby');
export const setOfferReviews = createAction<OfferReview[] | undefined>('setOfferReviews');
export const chooseSortStrategy = createAction<SortStrategy>('chooseSortStrategy');

type Config = { dispatch: AppDispatch; state: State; extra: AxiosInstance };

export const fetchOffers = createAsyncThunk<void, undefined, Config>
('fetchOffers', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>('/offers');
  dispatch(filterOffers(data));
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

export const addOfferReview = createAsyncThunk<void, AddReviewModelApi, Config> // todo add auth token
('setOfferReviews', async (model, { dispatch, extra: api }) => {
  const { data } = await api.post<OfferReview>(`/comments/${model.id}`, model as AddReviewModel);
  const oldReviews = useAppSelector((state) => state.offerReviews) ?? [];
  dispatch(setOfferReviews([data, ...oldReviews]));
});
