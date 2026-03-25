import { useSelector } from 'react-redux';
import {
  selectSuppliers,
  selectSuppliersLoading,
  selectSuppliersError,
} from '../redux/suppliers/selectors';

export const useSuppliers = () => {
  const suppliers = useSelector(selectSuppliers);
  const suppliersLoading = useSelector(selectSuppliersLoading);
  const suppliersError = useSelector(selectSuppliersError);

  return {
    suppliers,
    suppliersLoading,
    suppliersError,
  };
};
