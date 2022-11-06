import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { postHero } from '../../slices/heroSlice';

const HeroesAddForm = () => {
  const { filters } = useSelector((state) => state.filters);
  const [heroName, setHeroName] = React.useState('');
  const [heroDescr, setHeroDescr] = React.useState('');
  const [heroElement, setHeroElement] = React.useState('all');
  const optionEl = React.useRef(null);
  const dispatch = useDispatch();
  const createHero = (e) => {
    e.preventDefault();
    if (heroElement != 'all' && heroName != '' && heroDescr != '') {
      dispatch(postHero({ heroName, heroDescr, heroElement }));
      setHeroName('');
      setHeroDescr('');
      setHeroElement('all');
      optionEl.current.selected = true;
    }
  };

  const createOptions = () => {
    if (filters) {
      return (
        <select
          onChange={(e) => setHeroElement(e.target.value)}
          required
          className="form-select"
          id="element"
          name="element">
          {filters.map(({ filter, text }, i) => {
            return filter === 'all' ? (
              <option ref={optionEl} key={i} value={filter}>
                Я владею элементом...
              </option>
            ) : (
              <option key={i} value={filter}>
                {text}
              </option>
            );
          })}
        </select>
      );
    } else {
      return <h2>Ошибка</h2>;
    }
  };

  return (
    <form className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          onChange={(e) => setHeroName(e.target.value)}
          value={heroName}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          value={heroDescr}
          onChange={(e) => setHeroDescr(e.target.value)}
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        {createOptions()}
      </div>

      <button onClick={createHero} type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
