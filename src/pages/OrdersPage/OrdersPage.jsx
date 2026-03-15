// ============================================
// OrdersPage.jsx - СТРАНИЦА ЗАКАЗОВ
// ============================================

// 1. Импортируем React - нужен для создания компонента
//    useEffect - хук для выполнения кода после рендера (например, загрузка данных)
import React, { useEffect } from 'react';

// 2. useDispatch - хук Redux для отправки действий (например, загрузить заказы)
import { useDispatch } from 'react-redux';

// 3. getOrders - это действие (операция), которое мы импортируем из файла operations.js
//    Оно отправит запрос на сервер и получит список заказов
import { getOrders } from '../../redux/orders/operations';

// 4. FilterBar - компонент с полем поиска и кнопкой фильтрации
//    Этот компонент мы создадим отдельно
import FilterBar from '../../components/FilterBar/FilterBar';

// 5. OrdersTable - компонент с таблицей заказов (пока заглушка)
import OrdersTable from '../../components/OrdersTable/OrdersTable';

// 6. PageContainer - общий контейнер для всех страниц
//    Он добавляет отступы и центрирует контент
import PageContainer from '../../components/Common/PageContainer/PageContainer';

// 7. Импортируем CSS стили для этой страницы
import './OrdersPage.css';

// 8. СОЗДАЕМ КОМПОНЕНТ
//    Компонент - это функция, которая возвращает JSX (что увидит пользователь)
const OrdersPage = () => {
  // 9. useDispatch возвращает функцию dispatch
  //    dispatch - это как курьер: ты говоришь "отправь действие", и он его отправляет в Redux
  const dispatch = useDispatch();

  // 10. useEffect - выполняется один раз при загрузке компонента
  //     Пустой массив [] значит "выполни только один раз"
  useEffect(() => {
    // 11. Отправляем действие getOrders()
    //    Это запустит запрос на сервер и сохранит заказы в Redux
    dispatch(getOrders());
  }, [dispatch]); // Зависимость - если dispatch изменится, useEffect выполнится снова (но он не меняется)

  // 12. JSX - что увидит пользователь
  return (
    // 13. PageContainer - обертка с отступами
    <PageContainer>
      {/* 14. Заголовок страницы - h1 с классом для стилей */}
      <h1 className="page-title">All orders</h1>

      {/* 15. Компонент фильтрации */}
      {/*    placeholder - текст внутри поля поиска */}
      {/*    onFilter - функция, которая будет вызвана при поиске (пока не реализовано) */}
      {/*    onReset - функция, которая будет вызвана при сбросе (пока не реализовано) */}
      <FilterBar
        placeholder="User Name"
        onFilter={query => console.log('Поиск:', query)}
        onReset={() => console.log('Сброс')}
      />

      {/* 16. Компонент таблицы заказов (пока заглушка) */}
      <OrdersTable />
    </PageContainer>
  );
};

// 17. Экспортируем компонент, чтобы его можно было импортировать в App.jsx
export default OrdersPage;
