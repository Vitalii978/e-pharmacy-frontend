import { useSelector } from 'react-redux';
import {
  selectCustomers,
  selectIsLoading,
  selectIsError,
} from '../redux/customers/selectors';

export const useCustomers = () => {
  const customers = useSelector(selectCustomers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  return {
    customers,
    isLoading,
    isError,
  };
};
