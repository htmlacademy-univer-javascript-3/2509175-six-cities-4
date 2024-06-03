import { Link } from 'react-router-dom';
import OfferInfo from '../../components/offer/offer-info';
import { OfferProps } from '../../types/offer';


function NearPlace(offer: OfferProps): JSX.Element {
  const offerLink = `/offer/${offer.id}`;
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <OfferInfo offer={offer} offerLink={offerLink} />
    </article>
  );
}

export default function ListNearPlaces({offers} : {offers: OfferProps[]}): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {
            offers.map((place) => (<NearPlace {...place} key={place.id}/>))
          }
        </div>
      </section>
    </div>
  );
}
