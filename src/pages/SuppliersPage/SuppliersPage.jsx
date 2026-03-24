// ============================================
// SuppliersPage.jsx - ГЛАВНАЯ СТРАНИЦА ПОСТАВЩИКОВ
// ============================================

// 1. ИМПОРТЫ
//    useState - запоминает, открыта ли модалка (окно добавления)
//    useEffect - загружает данные при загрузке страницы
import React, { useEffect, useState } from 'react';

// useDispatch - чтобы отправлять команды в Redux
import { useDispatch } from 'react-redux';

// Импортируем команды (операции) для работы с поставщиками
import {
  getSuppliers, // команда "загрузить всех поставщиков"
  getSuppliersByQuery, // команда "найти поставщиков по имени"
} from '../../redux/suppliers/operations';

// Импортируем компоненты, из которых состоит страница
import FilterBar from '../../components/FilterBar/FilterBar'; // поле поиска
import SuppliersTable from '../../components/Suppliers/SuppliersTable/SuppliersTable'; // таблица
import AddSupplierBtn from '../../components/Suppliers/AddSupplierBtn/AddSupplierBtn'; // кнопка "Добавить"
import AddSupplierForm from '../../components/Suppliers/AddSupplierForm/AddSupplierForm'; // форма добавления
import PageContainer from '../../components/Common/PageContainer/PageContainer'; // контейнер с отступами

// Импортируем стили
import './SuppliersPage.css';

// ============================================
// КОМПОНЕНТ SuppliersPage
// ============================================
const SuppliersPage = () => {
  // 2. СОЗДАЕМ СОСТОЯНИЕ для модального окна
  //    useState(false) - изначально модалка закрыта (false)
  //    isModalOpen - переменная, которая хранит true/false
  //    setIsModalOpen - функция, которая меняет isModalOpen
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 3. ПОЛУЧАЕМ dispatch - это "почтальон", который отправляет команды в Redux
  const dispatch = useDispatch();

  // 4. useEffect - код внутри выполняется ПОСЛЕ того, как страница отрисовалась
  //    [] - пустой массив значит "выполни ТОЛЬКО ОДИН РАЗ" (при загрузке)
  useEffect(() => {
    // Отправляем команду "загрузить всех поставщиков"
    dispatch(getSuppliers());
  }, [dispatch]); // если dispatch вдруг изменится - выполнится снова (но он не меняется)

  // 5. ФУНКЦИЯ handleFilter - вызывается, когда пользователь нажимает кнопку "Filter"
  //    query - это текст, который пользователь ввел в поле поиска
  const handleFilter = query => {
    // Отправляем команду "найти поставщиков" с текстом query
    dispatch(getSuppliersByQuery(query));
  };

  // 6. ФУНКЦИЯ handleReset - вызывается, когда пользователь нажимает крестик для сброса
  const handleReset = () => {
    // Отправляем команду "загрузить всех поставщиков" (сбрасываем фильтр)
    dispatch(getSuppliers());
  };

  // ============================================
  // JSX - ЧТО УВИДИТ ПОЛЬЗОВАТЕЛЬ
  // ============================================
  return (
    // PageContainer - обертка, которая добавляет отступы и центрирует контент
    <PageContainer>
      {/* ТЕРНАРНЫЙ ОПЕРАТОР: если isModalOpen === true, то показываем AddSupplierForm */}
      {/* && означает: если слева true, то покажи то, что справа */}
      {isModalOpen && <AddSupplierForm setIsModalOpen={setIsModalOpen} />}

      {/* div с классом suppliers-header - контейнер для фильтра и кнопки */}
      <div className="suppliers-header">
        {/* КОМПОНЕНТ FilterBar - поле поиска */}
        {/* placeholder - текст-подсказка внутри поля */}
        {/* onFilter - функция, которая вызывается при нажатии кнопки Filter */}
        {/* onReset - функция, которая вызывается при нажатии крестика */}
        <FilterBar
          placeholder="User Name"
          onFilter={handleFilter}
          onReset={handleReset}
        />

        {/* КОМПОНЕНТ AddSupplierBtn - кнопка "Add a new suppliers" */}
        {/* setIsModalOpen передаем, чтобы кнопка могла открыть модалку */}
        <AddSupplierBtn setIsModalOpen={setIsModalOpen} />
      </div>

      {/* КОМПОНЕНТ SuppliersTable - таблица со списком поставщиков */}
      <SuppliersTable />
    </PageContainer>
  );
};

export default SuppliersPage;
