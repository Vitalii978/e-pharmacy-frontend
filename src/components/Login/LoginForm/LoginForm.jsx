// // src/components/Login/LoginForm/LoginForm.jsx
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import axios from 'axios';
// import './LoginForm.css';

// // Создаем схему валидации с Yup
// const loginSchema = yup.object({
//   email: yup
//     .string()
//     .email('Invalid email format')
//     .required('Email is required'),
//   password: yup
//     .string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [serverError, setServerError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Настройка react-hook-form с валидацией Yup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(loginSchema),
//     mode: 'onBlur', // Валидация при потере фокуса
//   });

//   // Обработка отправки формы
//   const onSubmit = async formData => {
//     setIsLoading(true);
//     setServerError('');

//     try {
//       // Отправляем запрос на бекенд
//       const response = await axios.post(
//         'http://localhost:3000/api/user/login',
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       // Сохраняем токен и данные пользователя
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           name: response.data.name,
//           email: response.data.email,
//         })
//       );

//       console.log('Login successful:', response.data);

//       // Здесь потом будет редирект на Dashboard
//       window.location.href = '/dashboard'; // временно
//     } catch (error) {
//       // Обрабатываем ошибки от сервера
//       const errorMessage =
//         error.response?.data?.message || 'Login failed. Please try again.';
//       setServerError(errorMessage);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
//       {/* Поле Email */}
//       <div className="form-group">
//         <label htmlFor="email" className="visually-hidden">
//           Email address
//         </label>
//         <input
//           id="email"
//           type="email"
//           className={`form-input ${errors.email ? 'input-error' : ''}`}
//           placeholder="Email address"
//           {...register('email')}
//         />
//         {errors.email && (
//           <p className="error-message">{errors.email.message}</p>
//         )}
//       </div>

//       {/* Поле Password */}
//       <div className="form-group password-group">
//         <label htmlFor="password" className="visually-hidden">
//           Password
//         </label>
//         <input
//           id="password"
//           type={showPassword ? 'text' : 'password'}
//           className={`form-input ${errors.password ? 'input-error' : ''}`}
//           placeholder="Password"
//           {...register('password')}
//         />

//         {/* Кнопка показа/скрытия пароля */}
//         <button
//           type="button"
//           className="password-toggle"
//           onClick={togglePasswordVisibility}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//         >
//           {showPassword ? '👁️' : '👁️‍🗨️'}
//         </button>

//         {errors.password && (
//           <p className="error-message">{errors.password.message}</p>
//         )}
//       </div>

//       {/* Ошибка от сервера */}
//       {serverError && <p className="server-error">{serverError}</p>}

//       {/* Кнопка отправки */}
//       <button type="submit" className="submit-button" disabled={isLoading}>
//         {isLoading ? 'Logging in...' : 'Log in'}
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

// ИМПОРТЫ - берем готовые инструменты из библиотек
import React, { useState } from 'react'; // useState - для создания переменных, которые можно менять (показать/скрыть пароль)
import { useForm } from 'react-hook-form'; // useForm - главный инструмент для работы с формами (сам запоминает значения, сам проверяет ошибки)
import { yupResolver } from '@hookform/resolvers/yup'; // yupResolver - связка между react-hook-form и yup (чтобы правила проверки работали)
import * as yup from 'yup'; // yup - библиотека для создания правил проверки (email должен содержать @, пароль не меньше 7 символов)
import sprite from '../../../assets/sprite.svg'; // sprite - файл со всеми иконками (глаз открытый, глаз закрытый)
import './LoginForm.css'; // CSS файл со стилями именно для этого компонента

// ПРАВИЛА ПРОВЕРКИ - создаем схему, по которой будем проверять форму
const schemaLogin = yup.object().shape({
  // yup.object().shape - создаем объект с правилами
  email: yup.string().email('Enter a valid Email').required(), // email должен быть строкой, формата email, обязателен для заполнения
  password: yup.string().min(7).required(), // password должен быть строкой, минимум 7 символов, обязателен
});

// КОМПОНЕНТ - главная часть, которая будет показываться на экране
const LoginForm = () => {
  // Создаем компонент с именем LoginForm (это как рецепт пирога)

  // СОСТОЯНИЯ - переменные, которые могут меняться
  const [showPassword, setShowPassword] = useState(false); // showPassword - показывает/скрывает пароль (false = скрыт, true = показан)
  // setShowPassword - функция, которая меняет showPassword
  // useState(false) - начальное значение false (пароль скрыт)

  // ИНСТРУМЕНТЫ ИЗ REACT-HOOK-FORM - берем все необходимое для работы с формой
  const {
    // useForm() - функция, которая создает все инструменты для формы
    register, // register - "клей", который привязывает input к форме (чтобы форма знала про это поле)
    handleSubmit, // handleSubmit - "охранник", который проверяет данные перед отправкой
    formState: { errors }, // errors - "коробка с ошибками", сюда попадают сообщения о том, что заполнено неправильно
  } = useForm({
    resolver: yupResolver(schemaLogin), // настройка: использовать наши правила (schemaLogin) для проверки
  });

  // ФУНКЦИЯ ДЛЯ ОТПРАВКИ - что делать, когда форму отправили правильно
  const onSubmit = data => {
    // data - это объект с данными из формы { email: "что-то", password: "что-то" }
    console.log(data); // пока просто показываем в консоли (потом заменим на отправку на сервер)
  };

  // ФУНКЦИЯ ДЛЯ ГЛАЗИКА - что делать при нажатии на кнопку показа/скрытия пароля
  const handleShowPassword = () => {
    // функция вызывается при клике на глаз
    setShowPassword(!showPassword); // !showPassword - меняем на противоположное (было true станет false, было false станет true)
  };

  // JSX - ТО, ЧТО УВИДИТ ПОЛЬЗОВАТЕЛЬ (разметка)
  return (
    // return - то, что попадет на экран
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      {/*'form - тег формы, onSubmit - при отправке вызываем handleSubmit (проверку) '*/}

      {/* ПОЛЕ ДЛЯ EMAIL */}
      <label htmlFor="email" className="form-label">
        {/*label - подпись к полю,htmlFor="email"-привязка к input с id=email'*/}
        <input // input - поле для ввода
          id="email" // id="email" - уникальный идентификатор (чтобы label знал, к чему привязан)
          type="email" // type="email" - браузер сам немного проверяет email (но нам нужно больше)
          {...register('email')} // register("email") - приклеиваем это поле к форме с именем "email"
          placeholder="Email address" // placeholder - подсказка внутри поля
          className="form-input" // класс для стилей
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
        {/* если есть ошибка для email - показываем красный текст с сообщением '*/}
      </label>
      {/* ПОЛЕ ДЛЯ ПАРОЛЯ */}
      <label htmlFor="password" className="form-label">
        {/*'// label для пароля '*/}

        <input
          id="password" // id для связи с label
          type={showPassword ? 'text' : 'password'} // тип поля: если showPassword=true - текст (видно), если false - password (скрыто)
          {...register('password')} // приклеиваем к форме с именем "password"
          placeholder="Password" // подсказка
          className="form-input" // класс для стилей
        />
        {/* КНОПКА-ГЛАЗИК для показа/скрытия пароля */}
        <button // кнопка
          type="button" // type="button" - чтобы не отправляла форму (просто кнопка)
          className="password-toggle" // класс для стилей
          onClick={handleShowPassword} // при клике вызываем handleShowPassword (меняет showPassword)
        >
          <svg width={24} height={24}>
            {/*'// иконка из спрайта '*/}

            <use // use - берем символ из спрайта
              xlinkHref={
                // xlinkHref - путь к иконке
                showPassword // если showPassword=true (пароль виден)
                  ? `${sprite}#icon-eye` // показываем зачеркнутый глаз
                  : `${sprite}#icon-eye-off` // если false - показываем открытый глаз
              }
            />
          </svg>
        </button>
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
        {/*'ошибка для пароля, если есть'*/}
      </label>
      {/* КНОПКА ОТПРАВКИ */}
      <button type="submit" className="submit-btn">
        Log in
      </button>
    </form>
  );
};

export default LoginForm; // разрешаем использовать этот компонент в других файлах

// Часть кода	Что делает
// useForm({ resolver: yupResolver(loginSchema) })	Подключает Yup валидацию к react-hook-form
// register('email')	Регистрирует поле в react-hook-form
// formState: { errors }	Содержит ошибки валидации
// onBlur режим	Валидация происходит при потере фокуса
// togglePasswordVisibility	Переключает тип input между text/password
