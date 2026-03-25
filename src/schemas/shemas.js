import * as yup from 'yup';

const emailRegExp = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;

export const schemaLogin = yup.object().shape({
  email: yup.string().matches(emailRegExp, 'Enter a valid Email').required(),
  password: yup.string().min(7).required(),
});

export const schemaFilter = yup.object().shape({
  query: yup.string().min(4).required(),
});

export const addProductSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  category: yup.string().required(),
  suppliers: yup.string().required(),
  stock: yup.string().required(),
  price: yup.string().required(),
});

export const editProductSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  category: yup.string().required(),
  suppliers: yup.string().required(),
  stock: yup.string().required(),
  price: yup.string().required(),
});

export const addSupplierSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  address: yup.string().required(),
  suppliers: yup.string().required(),
  date: yup.string().required(),
  amount: yup.string().required(),
  status: yup.string().oneOf(['Active', 'Deactive']).required(),
});

export const editSupplierSchema = yup.object().shape({
  name: yup.string().min(4).required(),
  address: yup.string().required(),
  suppliers: yup.string().required(),
  date: yup.string().required(),
  amount: yup.string().required(),
  status: yup.string().oneOf(['Active', 'Deactive']).required(),
});
