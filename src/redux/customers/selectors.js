// ============================================
// selectors.js - ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ
// ============================================

// Селектор - это функция, которая достает данные из хранилища
// Используется в компонентах с useSelector
// state - это всё хранилище Redux
// state.customers - это наш slice (ящик)

// Получить массив клиентов
export const selectCustomers = state => state.customers.customers;

// Получить флаг загрузки
export const selectIsLoading = state => state.customers.isLoading;

// Получить флаг ошибки
export const selectIsError = state => state.customers.isError;
