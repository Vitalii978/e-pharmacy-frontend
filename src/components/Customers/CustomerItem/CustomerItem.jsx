import React from 'react';
import imgAvatar from '../../../assets/images/avatar/avatar.png';
import './CustomerItem.css';

const CustomerItem = ({ customer }) => {
  const { name, email, address, phone, register_date, image } = customer;

  return (
    <tr className="customer-row">
      <td className="customer-cell user-cell">
        <div className="user-info">
          <img src={image || imgAvatar} alt={name} className="user-avatar" />
          <span className="user-name">{name}</span>
        </div>
      </td>

      <td className="customer-cell email-cell">{email}</td>

      <td className="customer-cell address-cell">{address}</td>

      <td className="customer-cell phone-cell">{phone}</td>

      <td className="customer-cell date-cell">{register_date}</td>
    </tr>
  );
};

export default CustomerItem;
