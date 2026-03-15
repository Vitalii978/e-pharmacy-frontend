// ============================================
// selectors.js - СЕЛЕКТОРЫ ДЛЯ ЗАКАЗОВ
// ============================================

// Селектор для получения массива заказов
export const selectOrders = state => state.orders.orders;

// Селектор для получения флага загрузки
export const selectIsLoading = state => state.orders.isLoading;

// Селектор для получения флага ошибки
export const selectIsError = state => state.orders.isError;
