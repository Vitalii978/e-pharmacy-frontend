// ============================================
// suppliers/selectors.js - ПОЛУЧЕНИЕ ДАННЫХ ПОСТАВЩИКОВ
// ============================================

// Селектор для получения массива поставщиков
export const selectSuppliers = state => state.suppliers.suppliers;

// Селектор для флага загрузки
export const selectSuppliersLoading = state => state.suppliers.isLoading;

// Селектор для флага ошибки
export const selectSuppliersError = state => state.suppliers.isError;
