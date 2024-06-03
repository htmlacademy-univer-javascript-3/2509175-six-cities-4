import React from 'react';
import { City } from '../../types/location';
import { useAppSelector,useAppDispatch } from '../../hooks/use-store';
import cn from 'classnames';
import { pickCity } from '../../store/actions';

type LocationItemProps = {
    title: string;
    isActive: boolean;
    onClick: (city: string) => void;
  };


function LocationItem(props: LocationItemProps): JSX.Element {
  const { title, isActive, onClick } = props;
  const onClickCallback = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick(title);
  };

  return (
    <li className="locations__item">
      <a className={cn('locations__item-link', 'tabs__item', isActive && 'tabs__item--active')} onClick={onClickCallback}>
        <span>{title}</span>
      </a>
    </li>
  );
}

function ListLocations({ locations }: { locations: City[] }): JSX.Element {
  const currentLocation: City = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((city) => (
            <LocationItem
              key={`${city.title}`}
              title={city.title}
              isActive={city.title === currentLocation.title}
              onClick={(cityName: string) => {
                dispatch(pickCity(locations.find((c) => c.title === cityName)!));
              }}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default React.memo(ListLocations);
