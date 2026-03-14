// ============================================
// useDashboard.js - ХУК ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ДАШБОРДА
// ============================================

// 1. Импортируем useSelector - хук Redux для получения данных из хранилища
import { useSelector } from 'react-redux';

// 2. Импортируем селекторы - функции, которые достают конкретные данные
import {
  selectRecentCustomers, // последние клиенты
  selectIncomeExpenses, // доходы/расходы
  selectAllCustomers, // количество всех клиентов
  selectAllProducts, // количество всех продуктов
  selectAllSuppliers, // количество всех поставщиков
  selectIsLoading, // флаг загрузки
} from '../redux/dashboard/selectors';

// 3. СОЗДАЕМ ХУК
//    Хук - это функция, которая использует другие хуки (useSelector)
//    Название всегда начинается с "use"
export const useDashboard = () => {
  // 4. useSelector вызывает селекторы и подписывается на изменения
  //    Когда данные в Redux меняются, компонент перерисовывается

  // Достаем список последних клиентов
  const recentCustomers = useSelector(selectRecentCustomers);

  // Достаем список доходов/расходов
  const incomeExpenses = useSelector(selectIncomeExpenses);

  // Достаем количество всех клиентов
  const allCustomers = useSelector(selectAllCustomers);

  // Достаем количество всех продуктов
  const allProducts = useSelector(selectAllProducts);

  // Достаем количество всех поставщиков
  const allSuppliers = useSelector(selectAllSuppliers);

  // Достаем флаг загрузки (показывать ли лоадер)
  const isLoading = useSelector(selectIsLoading);

  // 5. Возвращаем объект со всеми данными
  //    Теперь любой компонент может написать:
  //    const { allProducts, allCustomers } = useDashboard();
  return {
    recentCustomers,
    incomeExpenses,
    allCustomers,
    allProducts,
    allSuppliers,
    isLoading,
  };
};
