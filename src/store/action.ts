import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/location';
import { OfferProps } from '../types/offer';

export enum Actions {
    PICK_CITY = 'PICK_CITY',
    FILTER_OFFERS = 'FILTER_OFFERS',
}

export const pickCity = createAction(Actions.PICK_CITY, (textContent: City) => ({
  payload: textContent,
}));

export const filterOffers = createAction(Actions.FILTER_OFFERS, (content: OfferProps[]) => ({
  payload: content
}));
