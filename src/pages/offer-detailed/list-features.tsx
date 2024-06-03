import { OfferWithDetailsProps } from '../../types/offer';


export default function ListFeatures(offer: OfferWithDetailsProps): JSX.Element {
  return (
    <ul className="offer__features">
      {
        offer.type && <li className="offer__feature offer__feature--entire">{offer.type}</li>
      }
      {
        offer.maxAdults > 0 && <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
      }
      {
        offer.bedrooms > 0 && <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
      }
    </ul>
  );
}
