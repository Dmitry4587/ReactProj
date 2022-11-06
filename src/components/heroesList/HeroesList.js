import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { fetchHeroes } from '../../slices/heroSlice';
import { createSelector } from '@reduxjs/toolkit';
import { deleteHero } from '../../slices/heroSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const HeroesList = () => {
  const process = useSelector((state) => state.heroes.process);
  const filterHeroes = createSelector(
    (state) => state.heroes.heroes,
    (state) => state.filters.activeFilter,
    (heroes, activeFilter) => {
      if (activeFilter === 'all') {
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === activeFilter);
      }
    },
  );
  const heroes = useSelector(filterHeroes);
  const dispatch = useDispatch();

  const onClickDelete = React.useCallback((id) => {
    dispatch(deleteHero(id));
  }, []);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  if (process === 'loading') {
    return <Spinner />;
  } else if (process === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={500} classNames="item">
          <li className="text-center mt-5">Героев пока нет</li>
        </CSSTransition>
      );
    }
    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} timeout={500} classNames="item">
          <HeroesListItem onClickDelete={onClickDelete} {...props} id={id} />
        </CSSTransition>
      );
    });
  };
  const elements = renderHeroesList(heroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
