import { LocationProps } from '../../src/components/location/location';


export const DefaultLocations: LocationProps[] = [
  { Name: 'Paris' },
  { Name: 'Cologne' },
  { Name: 'Brussels' },
  { Name: 'Amsterdam' },
  { Name: 'Hamburg' },
  { Name: 'Dusseldorf' }
];

export type MapProps = {
  latitude: number,
  longitude: number,
  zoom: number
}
