import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/location';
import { OfferProps } from '../types/offer';

export const pickCity = createAction<City>('pickCity');

export const filterOffers = createAction<OfferProps[] | undefined>('filterOffers');
