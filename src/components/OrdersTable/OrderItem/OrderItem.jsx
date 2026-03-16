// ============================================
// OrderItem.jsx - ОДНА СТРОКА В ТАБЛИЦЕ ЗАКАЗОВ
// ============================================

// 1. Импортируем React
import React from 'react';

// 2. Импортируем заглушку для аватара (если нет фото)
import imgAvatar from '../../../assets/images/avatar/avatar.png';

// 3. Импортируем CSS
import './OrderItem.css';

// 4. КОМПОНЕНТ OrderItem
//    Принимает пропс order - объект с данными одного заказа
const OrderItem = ({ order }) => {
  // 5. Определяем класс для статуса заказа
  //    В зависимости от статуса будет разный цвет фона и текста
  const getStatusClass = status => {
    switch (status) {
      case 'Completed':
        return 'status-completed';
      case 'Confirmed':
        return 'status-confirmed';
      case 'Pending':
        return 'status-pending';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  // 6. JSX - одна строка таблицы
  return (
    <tr className="order-row">
      {/* 7. ЯЧЕЙКА С ИНФОРМАЦИЕЙ О ПОЛЬЗОВАТЕЛЕ */}
      <td className="order-cell user-cell">
        <div className="user-info">
          {/* Аватар (если нет фото, показываем заглушку) */}
          <img
            src={order.photo || imgAvatar}
            alt={order.name}
            className="user-avatar"
          />
          {/* Имя пользователя */}
          <span className="user-name">{order.name}</span>
        </div>
      </td>

      {/* 8. ЯЧЕЙКА С АДРЕСОМ */}
      <td className="order-cell address-cell">
        <address>{order.address}</address>
      </td>

      {/* 9. ЯЧЕЙКА С ТОВАРАМИ */}
      <td className="order-cell products-cell">
        <span className="products-text">{order.products}</span>
      </td>

      {/* 10. ЯЧЕЙКА С ДАТОЙ ЗАКАЗА */}
      <td className="order-cell date-cell">
        <time>{order.order_date}</time>
      </td>

      {/* 11. ЯЧЕЙКА С ЦЕНОЙ */}
      <td className="order-cell price-cell">
        <span>{order.price}</span>
      </td>

      {/* 12. ЯЧЕЙКА СО СТАТУСОМ */}
      <td className="order-cell status-cell">
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
