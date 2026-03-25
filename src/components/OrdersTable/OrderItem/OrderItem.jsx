import React from 'react';
import imgAvatar from '../../../assets/images/avatar/avatar.png';
import './OrderItem.css';

const OrderItem = ({ order }) => {
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

  return (
    <tr className="order-row">
      <td className="order-cell user-cell">
        <div className="user-info">
          <img
            src={order.photo || imgAvatar}
            alt={order.name}
            className="user-avatar"
          />

          <span className="user-name">{order.name}</span>
        </div>
      </td>

      <td className="order-cell address-cell">
        <address>{order.address}</address>
      </td>

      <td className="order-cell products-cell">
        <span className="products-text">{order.products}</span>
      </td>

      <td className="order-cell date-cellll">
        <time>{order.order_date}</time>
      </td>

      <td className="order-cell price-cell">
        <span>{order.price}</span>
      </td>

      <td className="order-cell status-cell">
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
