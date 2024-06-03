import { useState } from 'react';
import React from 'react';
import { useAppDispatch } from '../../hooks/use-store';
import { useAppSelector } from '../../hooks/use-store';
import { pickSortStrategy } from '../../store/actions';
import { SortStrategy } from './sort-strategy';

function getNameBySortStrategy(sortStrategy: SortStrategy) {
  switch (sortStrategy) {
    case SortStrategy.Popular:
      return 'Popular';
    case SortStrategy.PriceAsc:
      return 'Price: low to high';
    case SortStrategy.PriceDesc:
      return 'Price: high to low';
    case SortStrategy.Rating:
      return 'Top rated first';
  }
}

function SortStrategyComponent({ sortStrategy, selected, setSortStrategy, closeForm }: { sortStrategy: SortStrategy; selected: SortStrategy; setSortStrategy: (_: SortStrategy) => void; closeForm: () => void }) {
  return (
    <li className={`places__option places__option${sortStrategy === selected ? '--active' : ''}`} tabIndex={0} onClick={() => {
      setSortStrategy(sortStrategy); closeForm();
    }}
    >{getNameBySortStrategy(sortStrategy)}
    </li>
  );
}

function OffersSort() {
  const [isFormOpened, setIsFormOpened] = useState(false);

  const sortStrategy : SortStrategy = useAppSelector((state) => state.sortStrategy);
  const dispatch = useAppDispatch();

  const setSortStrategy = (s: SortStrategy) => {
    dispatch(pickSortStrategy(s));
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsFormOpened(!isFormOpened)}>
        {getNameBySortStrategy(sortStrategy)}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom places__options${isFormOpened ? '--opened' : ''}`}>
        <SortStrategyComponent sortStrategy={SortStrategy.Popular} selected={sortStrategy} setSortStrategy={setSortStrategy} closeForm={() => setIsFormOpened(false)}/>
        <SortStrategyComponent sortStrategy={SortStrategy.PriceAsc} selected={sortStrategy} setSortStrategy={setSortStrategy} closeForm={() => setIsFormOpened(false)}/>
        <SortStrategyComponent sortStrategy={SortStrategy.PriceDesc} selected={sortStrategy} setSortStrategy={setSortStrategy} closeForm={() => setIsFormOpened(false)}/>
        <SortStrategyComponent sortStrategy={SortStrategy.Rating} selected={sortStrategy} setSortStrategy={setSortStrategy} closeForm={() => setIsFormOpened(false)}/>
      </ul>
    </form>
  );
}

export default React.memo(OffersSort);
