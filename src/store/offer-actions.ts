import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { OfferProps, OfferReview, OfferWithDetailsProps } from '../types/offer';
import { Config } from '../types/store-config';
import { AddFavoriteOfferModelApi, AddReviewModelApi } from '../types/api';


export const setOffers = createAction<OfferProps[] | undefined>('setOffers');
export const setCurrentOffer = createAction<OfferWithDetailsProps | undefined>('setCurrentOffer');
export const setOffersNearby = createAction<OfferProps[] | undefined>('setOffersNearby');
export const setOfferReviews = createAction<OfferReview[] | undefined>('setOfferReviews');
export const setFavoriteOffers = createAction<OfferProps[]>('setFavoriteOffers');


export const fetchOffers = createAsyncThunk<void, undefined, Config>
('fetchOffers', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>('/offers');
  dispatch(setOffers(data));
});

export const fetchOfferById = createAsyncThunk<void, string, Config>
('fetchOfferById', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferWithDetailsProps>(`/offers/${offerId}`);
  dispatch(setCurrentOffer(data));
});

export const fetchOffersNearby = createAsyncThunk<void, string, Config>
('fetchOffersNearby', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferProps[]>(`/offers/${offerId}/nearby`);
  dispatch(setOffersNearby(data));
});

export const fetchOfferReviews = createAsyncThunk<void, string, Config>
('fetchOfferReviews', async (offerId, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferReview[]>(`/comments/${offerId}`);
  dispatch(setOfferReviews(data));
});

export const addOfferReview = createAsyncThunk<void, AddReviewModelApi, Config>
('addOfferReview', async (model, { dispatch, extra: api }) => {
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
('addFavoriteOffer', async (model, { extra: api }) => {
  await api.post<OfferProps[]>(`/favorite/${model.id}/${model.status}`);
});
