import { OfferProps, OfferReview, OfferWithDetailsProps } from '../types/offer';
import { City } from '../types/location';
import { SortStrategy } from '../components/offers-sort/sort-strategy';
import { UserAuthState } from '../components/private-route/userAuthState';
import { UserInfo } from '../types/user';

export type initialStateType = {
    city: City;
    offers: OfferProps[];
    sortStrategy: SortStrategy;
    currentOffer: OfferWithDetailsProps | undefined;
    offersNearby: OfferProps[] | undefined;
    offerReviews: OfferReview[] | undefined;
    favoriteOffers: OfferProps[] | undefined;
    userAuthState: UserAuthState;
    userInfo: UserInfo | undefined;
    isLoading: boolean;
}
