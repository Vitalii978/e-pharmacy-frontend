// // src/components/Login/LoginForm/LoginForm.jsx
// ИМПОРТЫ - берем готовые инструменты из библиотек
import React, { useState } from 'react'; // useState - для создания переменных, которые можно менять (показать/скрыть пароль)
import { useForm } from 'react-hook-form'; // useForm - главный инструмент для работы с формами (сам запоминает значения, сам проверяет ошибки)
import { yupResolver } from '@hookform/resolvers/yup'; // yupResolver - связка между react-hook-form и yup (чтобы правила проверки работали)
import { useDispatch } from 'react-redux'; // для отправки действий в Redux
import * as yup from 'yup'; // yup - библиотека для создания правил проверки (email должен содержать @, пароль не меньше 7 символов)
import { logIn } from '../../../redux/auth/operations'; // действие логина
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

  const dispatch = useDispatch(); // useDispatch - функция для отправки действий

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
    // Отправляем действие logIn с данными из формы
    // dispatch - "диспетчер", который отправляет действие в Redux
    dispatch(logIn(data)); // data = { email, password }
  };

  // ФУНКЦИЯ ДЛЯ ГЛАЗИКА - что делать при нажатии на кнопку показа/скрытия пароля
  const togglePassword = () => {
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
          autoComplete="current-password" // автозаполнение
          className="form-input" // класс для стилей
        />
        {/* КНОПКА-ГЛАЗИК для показа/скрытия пароля */}
        <button // кнопка
          type="button" // type="button" - чтобы не отправляла форму (просто кнопка)
          className="password-toggle" // класс для стилей
          onClick={togglePassword} // при клике вызываем handleShowPassword (меняет showPassword)
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
