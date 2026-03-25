import { useSelector } from 'react-redux';
import {
  selectRecentCustomers,
  selectIncomeExpenses,
  selectAllCustomers,
  selectAllProducts,
  selectAllSuppliers,
  selectIsLoading,
} from '../redux/dashboard/selectors';

export const useDashboard = () => {
  const recentCustomers = useSelector(selectRecentCustomers);
  const incomeExpenses = useSelector(selectIncomeExpenses);
  const allCustomers = useSelector(selectAllCustomers);
  const allProducts = useSelector(selectAllProducts);
  const allSuppliers = useSelector(selectAllSuppliers);
  const isLoading = useSelector(selectIsLoading);

  return {
    recentCustomers,
    incomeExpenses,
    allCustomers,
    allProducts,
    allSuppliers,
    isLoading,
  };
};
