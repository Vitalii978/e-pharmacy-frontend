// ============================================
// FilterBar.jsx - КОМПОНЕНТ ФИЛЬТРАЦИИ (ПОИСК)
// ============================================

// 1. Импортируем React и хуки
import React, { useState } from 'react';

// 2. useForm - хук из react-hook-form для работы с формами
//    Он упрощает валидацию, отправку и обработку форм
import { useForm } from 'react-hook-form';

// 3. yupResolver - связка между react-hook-form и yup
//    yup - библиотека для валидации (проверки) данных
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// 4. Импортируем спрайт с иконками
import sprite from '../../assets/sprite.svg';

// 5. Импортируем стили
import './FilterBar.css';

// 6. СОЗДАЕМ СХЕМУ ВАЛИДАЦИИ с помощью yup
//    Это правило: поле query должно быть строкой, минимум 3 символа, обязательно
const schemaFilter = yup.object().shape({
  query: yup
    .string()
    .min(3, 'Минимум 3 символа') // если меньше 3 - показать это сообщение
    .required('Введите текст для поиска'), // если пусто - показать это сообщение
});

// 7. КОМПОНЕНТ FilterBar
//    Принимает пропсы (входные данные):
//    - placeholder: текст-подсказка в поле ввода
//    - onFilter: функция, которая будет вызвана при поиске (получит текст)
//    - onReset: функция, которая будет вызвана при сбросе
const FilterBar = ({ placeholder, onFilter, onReset }) => {
  // 8. useState - хук для хранения состояния компонента
  //    showReset - переменная (true/false) - показывать ли кнопку сброса
  //    setShowReset - функция для изменения этой переменной
  //    Начальное значение: false (кнопка сброса скрыта)
  const [showReset, setShowReset] = useState(false);

  // 9. НАСТРОЙКА REACT-HOOK-FORM
  //    register - функция для регистрации поля ввода
  //    handleSubmit - функция для обработки отправки формы
  //    setValue - функция для программного изменения значения поля
  //    formState.errors - объект с ошибками валидации
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFilter), // подключаем нашу схему валидации
  });

  // 10. ФУНКЦИЯ ОТПРАВКИ ФОРМЫ (когда пользователь нажал Filter или Enter)
  const onSubmit = data => {
    // data - это объект с данными формы { query: "то что ввел пользователь" }

    // Проверяем, что поле не пустое и не состоит из пробелов
    if (data.query && data.query.trim() !== '') {
      // Вызываем функцию onFilter, которую передали из родительского компонента
      // Передаем в нее текст запроса
      onFilter(data.query);

      // Показываем кнопку сброса
      setShowReset(true);
    }
  };

  // 11. ФУНКЦИЯ СБРОСА (когда пользователь нажал на крестик)
  const handleReset = () => {
    // Очищаем поле ввода
    setValue('query', '');

    // Вызываем функцию onReset из родительского компонента
    onReset();

    // Скрываем кнопку сброса
    setShowReset(false);
  };

  // 12. JSX - что увидит пользователь
  return (
    <div className="filter-bar">
      {/* Форма - при отправке вызывает handleSubmit(onSubmit) */}
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        {/* Контейнер для поля ввода и кнопки сброса */}
        <div className="filter-input-wrapper">
          {/* Поле ввода */}
          <input
            type="text"
            {...register('query')} // регистрируем поле с именем "query"
            placeholder={placeholder || 'Поиск...'} // текст-подсказка
            className="filter-input"
          />

          {/* КНОПКА СБРОСА - показывается только если showReset = true */}
          {showReset && (
            <button
              type="button" // type="button" чтобы не отправляло форму
              onClick={handleReset} // при клике вызываем handleReset
              className="reset-button"
            >
              <svg width={14} height={14}>
                <use xlinkHref={`${sprite}#icon-close`} />
              </svg>
            </button>
          )}

          {/* СООБЩЕНИЕ ОБ ОШИБКЕ - показывается если есть ошибка валидации */}
          {errors.query && (
            <p className="error-message">{errors.query.message}</p>
          )}
        </div>

        {/* КНОПКА ФИЛЬТРАЦИИ */}
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

// 13. Экспортируем компонент
export default FilterBar;
