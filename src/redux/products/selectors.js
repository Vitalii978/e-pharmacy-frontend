// ============================================
// products/selectors.js - ПОЛУЧЕНИЕ ДАННЫХ ПРОДУКТОВ
// ============================================

// Селекторы - функции, которые достают данные из Redux
// Используются в компонентах с useSelector

export const selectProducts = state => state.products.products;
export const selectCategories = state => state.products.categories;
export const selectProductsLoading = state => state.products.isLoading;
export const selectProductsError = state => state.products.isError;
