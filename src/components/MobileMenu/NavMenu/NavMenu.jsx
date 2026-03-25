import React from 'react';
import { NavLink } from 'react-router-dom';
import sprite from '../../../assets/sprite.svg';
import { menuInfo } from '../../../lib/menu';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <ul className="nav-menu-list">
      {menuInfo?.map((item, index) => (
        <li key={index} className="nav-menu-item">
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-menu-link active' : 'nav-menu-link'
            }
          >
            <svg width={20} height={20}>
              <use xlinkHref={`${sprite}#${item.icon}`} />
            </svg>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
