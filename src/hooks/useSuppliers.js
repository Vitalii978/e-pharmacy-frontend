// ============================================
// useSuppliers.js - ХУК ДЛЯ ПОЛУЧЕНИЯ ПОСТАВЩИКОВ
// ============================================

// 1. useSelector - хук Redux для получения данных из хранилища
import { useSelector } from 'react-redux';

// 2. Импортируем селекторы
import {
  selectSuppliers,
  selectSuppliersLoading,
  selectSuppliersError,
} from '../redux/suppliers/selectors';

// 3. СОЗДАЕМ ХУК
//    Хук - это функция, которая использует другие хуки
//    Удобно: не нужно в каждом компоненте писать useSelector
export const useSuppliers = () => {
  const suppliers = useSelector(selectSuppliers);
  const suppliersLoading = useSelector(selectSuppliersLoading);
  const suppliersError = useSelector(selectSuppliersError);

  // Возвращаем объект со всеми данными
  return {
    suppliers,
    suppliersLoading,
    suppliersError,
  };
};
