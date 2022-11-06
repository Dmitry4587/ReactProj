import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilters, setActiveFilter } from '../../slices/filterSlice';
import Spinner from '../spinner/Spinner';
const HeroesFilters = () => {
  const { filters, process, activeFilter } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  if (process === 'loading') {
    return <Spinner />;
  } else if (process === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map(({ filter, className, text }, i) => {
            const setClassName = filter === activeFilter ? `${className} active` : className;
            return (
              <button
                key={i}
                onClick={() => dispatch(setActiveFilter(filter))}
                className={setClassName}>
                {text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
