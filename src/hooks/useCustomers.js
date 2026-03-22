// ============================================
// useCustomers.js - ХУК ДЛЯ ПОЛУЧЕНИЯ КЛИЕНТОВ
// ============================================

// 1. useSelector - хук Redux для получения данных из хранилища
import { useSelector } from 'react-redux';

// 2. Импортируем селекторы
import {
  selectCustomers,
  selectIsLoading,
  selectIsError,
} from '../redux/customers/selectors';

// 3. СОЗДАЕМ ХУК
// useSelector - хук, который берет данные из Redux
//    Хук - это функция, которая использует другие хуки
//    Удобно: не нужно в каждом компоненте писать useSelector
export const useCustomers = () => {
  const customers = useSelector(selectCustomers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  // Возвращаем объект, чтобы в компоненте написать:
  // const { customers } = useCustomers();
  return {
    customers,
    isLoading,
    isError,
  };
};
