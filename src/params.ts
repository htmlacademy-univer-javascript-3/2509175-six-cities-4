import { CardProps } from '../src/components/card/card';
import { Location } from '../src/components/location/location';


export const DefaultLocations : Location[] = [
  { Name: 'Paris' },
  { Name: 'Cologne' },
  { Name: 'Brussels' },
  { Name: 'Amsterdam' },
  { Name: 'Hamburg' },
  { Name: 'Dusseldorf' }
];

export const DefaultCards: CardProps[] = [
  {
    Status: 'Premium',
    Price: 120,
    Image: 'img/apartment-01.jpg',
    Rating: 80,
    Description: 'Beautiful & luxurious apartment at great location',
    Type: 'Apartment',
    IsBookmarked: false
  },
  {
    Status: null,
    Price: 80,
    Image: 'img/room.jpg',
    Rating: 80,
    Description: 'Wood and stone place',
    Type: 'Room',
    IsBookmarked: true
  },
  {
    Status: null,
    Price: 132,
    Image: 'img/apartment-02.jpg',
    Rating: 80,
    Description: 'Canal View Prinsengracht',
    Type: 'Apartment',
    IsBookmarked: false
  },
  {
    Status: 'Premium',
    Price: 180,
    Image: 'img/apartment-03.jpg',
    Rating: 100,
    Description: 'Nice, cozy, warm big bed apartment',
    Type: 'Apartment',
    IsBookmarked: false
  },
  {
    Status: null,
    Price: 80,
    Image: 'img/room.jpg',
    Rating: 80,
    Description: 'Wood and stone place',
    Type: 'Room',
    IsBookmarked: true
  }
];
