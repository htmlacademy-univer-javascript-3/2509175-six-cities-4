import { createReducer } from '@reduxjs/toolkit';
import { Locations } from '../components/location/location';
import { store } from '../store/index';
import { SortStrategy } from '../components/offers-sort/sort-strategy';
import { UserAuthState } from '../components/private-route/userAuthState';
import { initialStateType } from '../types/store-state';

import { pickCity, pickSortStrategy } from './actions';
import { setAuthState, setUserInfo, auth, checkAuth } from './auth-actions';
import { setOffers, fetchOffers, setCurrentOffer, fetchOfferById, setOffersNearby, fetchOffersNearby, setOfferReviews, fetchOfferReviews, fetchFavoriteOffers, setFavoriteOffers } from './offer-actions';


const initialState: initialStateType = {
  city: Locations[3],
  offers: [],
  sortStrategy: SortStrategy.Popular,
  isLoading: false,
  currentOffer: undefined,
  offersNearby: undefined,
  offerReviews: undefined,
  favoriteOffers: undefined,
  userAuthState: UserAuthState.Empty,
  userInfo: undefined
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action) => {
      state.city = action.payload;
      state.isLoading = false;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload ?? [];
      state.isLoading = false;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
      state.isLoading = false;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
      state.isLoading = false;
    })
    .addCase(setOfferReviews, (state, action) => {
      state.offerReviews = action.payload;
      state.isLoading = false;
    })
    .addCase(pickSortStrategy, (state, action) => {
      state.sortStrategy = action.payload;
      state.isLoading = false;
    })
    .addCase(setAuthState, (state, action) => {
      state.userAuthState = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(setFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(checkAuth.fulfilled, (state) => {
      state.userAuthState = UserAuthState.Auth;
    })
    .addCase(auth.rejected, (state) => {
      state.userAuthState = UserAuthState.UnAuth;
    })
    .addCase(auth.fulfilled, (state) => {
      state.userAuthState = UserAuthState.Auth;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOfferById.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferById.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOffersNearby.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffersNearby.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOffersNearby.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferReviews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOfferReviews.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferReviews.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchFavoriteOffers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchFavoriteOffers.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchFavoriteOffers.rejected, (state) => {
      state.isLoading = false;
    });
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
