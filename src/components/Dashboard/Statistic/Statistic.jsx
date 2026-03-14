// ============================================
// Statistic.jsx - КОМПОНЕНТ СТАТИСТИКИ (карточки с числами)
// ============================================

// 1. Импортируем React - нужен для создания компонента
import React from 'react';

// 2. Импортируем хук useDashboard - он достает данные из Redux
//    Этот хук мы создадим позже
import { useDashboard } from '../../../hooks/useDashboard';

// 3. Импортируем спрайт с иконками - для иконок в карточках
import sprite from '../../../assets/sprite.svg';

// 4. Импортируем CSS стили для этого компонента
import './Statistic.css';

// 5. СОЗДАЕМ КОМПОНЕНТ
//    Statistic - это функция, которая возвращает JSX
const Statistic = () => {
  // 6. Вызываем хук useDashboard, чтобы получить данные из Redux
  //    useDashboard возвращает объект с полями:
  //    - allCustomers (все клиенты)
  //    - allProducts (все продукты)
  //    - allSuppliers (все поставщики)
  const { allCustomers, allProducts, allSuppliers } = useDashboard();

  // 7. JSX - что увидит пользователь
  return (
    // 8. Главный контейнер для всех карточек
    //    Будет располагать карточки в ряд с помощью flex
    <div className="statistic-container">
      {/* ===== КАРТОЧКА 1: ВСЕ ПРОДУКТЫ ===== */}
      <div className="stat-card">
        {/* Блок с иконкой */}
        <div className="stat-icon">
          {/* Иконка из спрайта (icon-currency) */}
          <svg width={18} height={18}>
            <use xlinkHref={`${sprite}#icon-currency`}></use>
          </svg>
        </div>

        {/* Блок с текстом */}
        <div className="stat-info">
          {/* Название карточки */}
          <p className="stat-label">All products</p>
          {/* Число (если данных нет, показываем 0) */}
          <p className="stat-number">{allProducts || 0}</p>
        </div>
      </div>

      {/* ===== КАРТОЧКА 2: ВСЕ ПОСТАВЩИКИ ===== */}
      <div className="stat-card">
        <div className="stat-icon">
          <svg width={18} height={18}>
            {/* Иконка пользователей */}
            <use xlinkHref={`${sprite}#icon-ci_users`}></use>
          </svg>
        </div>
        <div className="stat-info">
          <p className="stat-label">All suppliers</p>
          <p className="stat-number">{allSuppliers || 0}</p>
        </div>
      </div>

      {/* ===== КАРТОЧКА 3: ВСЕ КЛИЕНТЫ ===== */}
      <div className="stat-card">
        <div className="stat-icon">
          <svg width={18} height={18}>
            <use xlinkHref={`${sprite}#icon-ci_users`}></use>
          </svg>
        </div>
        <div className="stat-info">
          <p className="stat-label">All customers</p>
          <p className="stat-number">{allCustomers || 0}</p>
        </div>
      </div>
    </div>
  );
};

// 9. Экспортируем компонент, чтобы его можно было использовать в других файлах
export default Statistic;
