import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/location';
import { OfferProps } from '../types/offer';
import { SortStrategy } from '../components/offers-sort/sort-strategy';

export const pickCity = createAction<City>('pickCity');

export const filterOffers = createAction<OfferProps[] | undefined>('filterOffers');

export const chooseSortStrategy = createAction<SortStrategy>('chooseSortStrategy');
