// ============================================
// selectors.js - ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ
// ============================================

// Селектор - это функция, которая достает данные из хранилища

// Получить массив поставщиков
export const selectSuppliers = state => state.suppliers.suppliers;

// Получить флаг загрузки
export const selectSuppliersLoading = state => state.suppliers.isLoading;

// Получить флаг ошибки
export const selectSuppliersError = state => state.suppliers.isError;
