import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import sprite from '../../assets/sprite.svg';
import './FilterBar.css';

const schemaFilter = yup.object().shape({
  query: yup
    .string()
    .min(3, 'Минимум 3 символа')
    .required('Введите текст для поиска'),
});

const FilterBar = ({ placeholder, onFilter, onReset }) => {
  const [showReset, setShowReset] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFilter),
  });

  const onSubmit = data => {
    if (data.query && data.query.trim() !== '') {
      onFilter(data.query);

      setShowReset(true);
    }
  };

  const handleReset = () => {
    setValue('query', '');
    onReset();
    setShowReset(false);
  };

  return (
    <div className="filter-bar">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <div className="filter-input-wrapper">
          <input
            type="text"
            {...register('query')}
            placeholder={placeholder || 'Поиск...'}
            className="filter-input"
          />

          {showReset && (
            <button
              type="button"
              onClick={handleReset}
              className="reset-button"
            >
              <svg width={14} height={14}>
                <use xlinkHref={`${sprite}#icon-close`} />
              </svg>
            </button>
          )}

          {errors.query && (
            <p className="error-message">{errors.query.message}</p>
          )}
        </div>

        <button type="submit" className="filter-button">
          <svg width={14} height={14}>
            <use xlinkHref={`${sprite}#icon-filter`} />
          </svg>
          <span>Filter</span>
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
