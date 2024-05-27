import { createReducer } from '@reduxjs/toolkit';
import { DefaultLocations } from '../mocks/location';
import { OfferProps, OfferReview, OfferWithDetailsProps } from '../types/offer';
import { City } from '../types/location';
import { filterOffers, pickCity, chooseSortStrategy, fetchOffers, setCurrentOffer, fetchOfferById, setOffersNearby, fetchOffersNearby, setOfferReviews, fetchOfferReviews } from './action';
import { store } from '../store/index';
import { SortStrategy } from '../components/offers-sort/sort-strategy';
import { UserAuthState } from '../components/private-route/userAuthState';


type initialStateType = {
  city: City;
  offers: OfferProps[];
  sortStrategy: SortStrategy;
  currentOffer: OfferWithDetailsProps | undefined;
  offersNearby: OfferProps[] | undefined;
  offerReviews: OfferReview[] | undefined;
  userAuthState: UserAuthState;
  isLoading: boolean;
}

const initialState: initialStateType = {
  city: DefaultLocations[3],
  offers: [],
  sortStrategy: SortStrategy.Popular,
  isLoading: false,
  currentOffer: undefined,
  offersNearby: undefined,
  offerReviews: undefined,
  userAuthState: UserAuthState.Empty
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(pickCity, (state, action) => {
      state.city = action.payload;
      state.isLoading = false;
    })
    .addCase(filterOffers, (state, action) => {
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
    .addCase(chooseSortStrategy, (state, action) => {
      state.sortStrategy = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferById.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOfferById.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOffersNearby.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffersNearby.fulfilled, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferReviews.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOfferReviews.fulfilled, (state) => {
      state.isLoading = false;
    });
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
