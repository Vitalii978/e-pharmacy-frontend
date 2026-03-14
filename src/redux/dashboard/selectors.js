// ============================================
// selectors.js - СЕЛЕКТОРЫ ДЛЯ ДАШБОРДА
// ============================================

// Селектор - это функция, которая достает данные из Redux
// state - это всё хранилище Redux
// state.dashboard - это наш slice (кусочек) с именем "dashboard"

// Достаем список последних клиентов
export const selectRecentCustomers = state => state.dashboard.recentCustomers;

// Достаем список доходов/расходов
export const selectIncomeExpenses = state => state.dashboard.incomeExpenses;

// Достаем количество всех клиентов
export const selectAllCustomers = state => state.dashboard.allCustomers;

// Достаем количество всех продуктов
export const selectAllProducts = state => state.dashboard.allProducts;

// Достаем количество всех поставщиков
export const selectAllSuppliers = state => state.dashboard.allSuppliers;

// Достаем флаг загрузки
export const selectIsLoading = state => state.dashboard.isLoading;
