import React from 'react'; // Импорт React
import './Container.css'; // Импорт стилей

const Container = ({ children }) => {
  // Компонент-обертка
  return (
    <section className="container">
      {children}
      {/* Сюда попадет Logo, Title, LoginForm*/}
    </section>
  );
};

export default Container;
