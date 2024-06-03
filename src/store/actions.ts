import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/location';
import { SortStrategy } from '../components/offers-sort/sort-strategy';


export const pickCity = createAction<City>('pickCity');
export const pickSortStrategy = createAction<SortStrategy>('pickSortStrategy');
