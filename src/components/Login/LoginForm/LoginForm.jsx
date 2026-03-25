import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { logIn } from '../../../redux/auth/operations';
import sprite from '../../../assets/sprite.svg';
import './LoginForm.css';

const schemaLogin = yup.object().shape({
  email: yup.string().email('Enter a valid Email').required(),
  password: yup.string().min(7).required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmit = data => {
    dispatch(logIn(data));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email" className="form-label">
        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Email address"
          className="form-input"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}
      </label>
      <label htmlFor="password" className="form-label">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          autoComplete="current-password"
          className="form-input"
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePassword}
        >
          <svg width={24} height={24}>
            <use
              xlinkHref={
                showPassword ? `${sprite}#icon-eye` : `${sprite}#icon-eye-off`
              }
            />
          </svg>
        </button>
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}
      </label>
      <button type="submit" className="submit-btn">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
