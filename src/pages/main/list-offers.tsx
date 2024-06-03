import Offer from '../../components/offer/offer';
import { useAppSelector } from '../../hooks/use-store';
import { OfferProps } from '../../types/offer';
import { SortStrategy } from '../../components/offers-sort/sort-strategy';


export default function ListOffers({ offers, setActiveOffer }: { offers: OfferProps[]; setActiveOffer: (arg0: OfferProps) => void }): JSX.Element {
  const selectedSortStrategy: SortStrategy = useAppSelector((state) => state.sortStrategy);
  const offersSorted = [...offers];

  switch (selectedSortStrategy) {
    case SortStrategy.PriceAsc:
      offersSorted.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case SortStrategy.PriceDesc:
      offersSorted.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case SortStrategy.Rating:
      offersSorted.sort((a, b) => Number(b.rating) - Number(a.rating));
      break;
  }
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersSorted.map((e) => (
          <Offer offer={e} setState={() => setActiveOffer(e)} key={e.id} />
        ))
      }
    </div>
  );
}
