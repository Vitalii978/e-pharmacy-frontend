// ============================================
// CustomerItem.jsx - ОДНА СТРОКА В ТАБЛИЦЕ КЛИЕНТОВ
// ============================================

import React from 'react';
import imgAvatar from '../../../assets/images/avatar/avatar.png';
import './CustomerItem.css';

// Компонент принимает объект customer с данными одного клиента
const CustomerItem = ({ customer }) => {
  // Деструктуризация - достаем нужные поля из объекта customer
  const { name, email, address, phone, register_date, image } = customer;

  return (
    <tr className="customer-row">
      {/* ЯЧЕЙКА: информация о пользователе (аватар + имя) */}
      <td className="customer-cell user-cell">
        <div className="user-info">
          {/* Аватар (если нет фото, показываем заглушку) */}
          <img src={image || imgAvatar} alt={name} className="user-avatar" />
          <span className="user-name">{name}</span>
        </div>
      </td>

      {/* ЯЧЕЙКА: email */}
      <td className="customer-cell email-cell">{email}</td>

      {/* ЯЧЕЙКА: адрес */}
      <td className="customer-cell address-cell">{address}</td>

      {/* ЯЧЕЙКА: телефон */}
      <td className="customer-cell phone-cell">{phone}</td>

      {/* ЯЧЕЙКА: дата регистрации */}
      <td className="customer-cell date-cell">{register_date}</td>
    </tr>
  );
};

export default CustomerItem;
