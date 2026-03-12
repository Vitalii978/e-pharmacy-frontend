import { useSelector } from 'react-redux';
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
  selectIsLoading,
} from '../redux/auth/selectors';

// Это кастомный хук - удобная обертка для использования в компонентах
export const useAuth = () => {
  // useSelector - хук Redux, который берет данные из хранилища
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(selectUser);

  // Возвращаем объект со всеми данными
  return {
    isLoggedIn,
    isRefreshing,
    isLoading,
    user,
  };
};

// Что здесь происходит:

// Мы создаем функцию, которая внутри использует useSelector

// Компоненты могут просто вызвать useAuth() и получить все данные сразу

// Не нужно писать useSelector в каждом компоненте
