// ============================================
// shemas.js - СХЕМЫ ВАЛИДАЦИИ ДЛЯ ФОРМ
// ============================================

import * as yup from 'yup';

// Регулярное выражение для проверки email
const emailRegExp = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;

// Схема для формы логина
export const schemaLogin = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Enter a valid Email').required(),
  password: yup.string().min(7).required(),
});

// Схема для фильтра (поиск)
export const schemaFilter = yup.object().shape({
  query: yup.string().min(4).required(),
});

// Схема для добавления продукта
export const addProductSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  category: yup.string().required(),
  suppliers: yup.string().required(),
  stock: yup.string().required(),
  price: yup.string().required(),
});

// Схема для редактирования продукта
export const editProductSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  category: yup.string().required(),
  suppliers: yup.string().required(),
  stock: yup.string().required(),
  price: yup.string().required(),
});

// Схема для добавления поставщика
export const addSupplierSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  address: yup.string().required(),
  suppliers: yup.string().required(),
  date: yup.string().required(),
  amount: yup.string().required(),
  status: yup.string().oneOf(['Active', 'Deactive']).required(),
});

// Схема для редактирования поставщика
export const editSupplierSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  address: yup.string().required(),
  suppliers: yup.string().required(),
  date: yup.string().required(),
  amount: yup.string().required(),
  status: yup.string().oneOf(['Active', 'Deactive']).required(),
});
