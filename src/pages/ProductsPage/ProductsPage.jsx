// ============================================
// ProductsPage.jsx - СТРАНИЦА ПРОДУКТОВ
// ============================================

// 1. Импортируем React и хуки
//    useState - для хранения состояния (открыта/закрыта модалка)
//    useEffect - для загрузки данных при загрузке страницы
import React, { useEffect, useState } from 'react';

// 2. useDispatch - хук Redux для отправки действий (загрузить продукты)
import { useDispatch } from 'react-redux';

// 3. Импортируем операции для работы с продуктами
//    getProducts - загрузить все продукты
//    getProductsByQuery - поиск продуктов
import {
  getProducts,
  getProductsByQuery,
} from '../../redux/products/operations';

// 4. Импортируем операцию для загрузки поставщиков (нужно для формы добавления)
import { getSuppliers } from '../../redux/suppliers/operations';

// 5. Импортируем компоненты
import FilterBar from '../../components/FilterBar/FilterBar'; // поиск
import ProductsTable from '../../components/Products/ProductsTable/ProductsTable'; // таблица
import AddProduct from '../../components/Products/AddProduct/AddProduct'; // кнопка добавления

// 6. Импортируем контейнер для страниц (отступы)
import PageContainer from '../../components/Common/PageContainer/PageContainer';

// 7. Импортируем CSS
import './ProductsPage.css';

// 8. СОЗДАЕМ КОМПОНЕНТ ProductsPage
const ProductsPage = () => {
  // 9. useState для модального окна
  //   isModalOpen; открыта ли модалка (true/false)
  //   setIsModalOpen; функция для изменения этого состояния
  //    Начальное значение false - модалка закрыта
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 10. Получаем функцию dispatch для отправки действий в Redux
  const dispatch = useDispatch();

  // 11. useEffect - загружаем данные при монтировании компонента
  //    Пустой массив [] значит "выполни только один раз"
  useEffect(() => {
    // Загружаем список продуктов
    dispatch(getProducts());

    // Загружаем список поставщиков (нужен для выпадающего списка в форме)
    dispatch(getSuppliers());
  }, [dispatch]); // если dispatch изменится - выполнится снова (но он не меняется)

  // 12. Функция для поиска продуктов
  //    Вызывается из компонента FilterBar, когда пользователь нажимает Filter
  const handleFilter = query => {
    console.log('Поиск продуктов:', query); // для отладки
    dispatch(getProductsByQuery(query)); // отправляем запрос с поиском
  };

  // 13. Функция для сброса фильтра
  //    Вызывается из FilterBar, когда пользователь нажимает крестик
  const handleReset = () => {
    console.log('Сброс фильтра продуктов'); // для отладки
    dispatch(getProducts()); // загружаем все продукты
  };

  // 14. JSX - что увидит пользователь
  return (
    // PageContainer - обертка с отступами (как на других страницах)
    <PageContainer>
      {/* Заголовок страницы */}
      {/* <h1 className="page-title">All products</h1> */}

      {/* 15. КОНТЕЙНЕР ДЛЯ ФИЛЬТРА И КНОПКИ */}
      {/*    Будет располагать их в ряд на планшетах и десктопе */}
      <div className="products-header">
        {/* 16. КОМПОНЕНТ ФИЛЬТРАЦИИ */}
        {/*    placeholder - текст внутри поля */}
        {/*    onFilter - функция для поиска */}
        {/*    onReset - функция для сброса */}
        <FilterBar
          placeholder="Product Name"
          onFilter={handleFilter}
          onReset={handleReset}
        />

        {/* 17. КНОПКА ДОБАВЛЕНИЯ ПРОДУКТА */}
        {/*    Передаем setIsModalOpen, чтобы кнопка могла открыть модалку */}
        <AddProduct setIsModalOpen={setIsModalOpen} />
      </div>

      {/* 18. ТАБЛИЦА ПРОДУКТОВ */}
      {/*    Передаем isModalOpen и setIsModalOpen, */}
      {/*    чтобы таблица могла открывать модалку для редактирования */}
      <ProductsTable
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};

// 19. Экспортируем компонент, чтобы использовать в App.jsx
export default ProductsPage;
