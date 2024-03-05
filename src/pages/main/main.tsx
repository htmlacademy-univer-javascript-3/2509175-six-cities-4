import { DefaultLocations } from '../../params';
import Card from '../../components/card/card';
import { CardProps } from '../../components/card/card';
import { Location } from '../../components/location/location';


export type ListCardsProps = {
    cards: CardProps[];
}

export type ListLocationsProps = {
    locations: Location[];
}


function ListLocations({locations}: ListLocationsProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            locations.map((location) =>
              (<li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>{location.Name}</span>
                </a>
              </li>)
            )
          }
        </ul>
      </section>
    </div>
  );
}

function ListCards({ cards }: ListCardsProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        cards.map((card) => (
          <Card {...card} />
        ))
      }
    </div>
  );
}

function MainScreen({ cards }: ListCardsProps): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <ListLocations locations={DefaultLocations}/>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <ListCards cards={cards} />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
