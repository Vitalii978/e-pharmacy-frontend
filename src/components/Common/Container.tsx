import React from 'react'; // Импорт React
import './Container.css'; // Импорт стилей

interface ContainerProps {
  // Типизация пропсов
  children: React.ReactNode; // children - то, что внутри контейнера
}

const Container = ({ children }: ContainerProps) => {
  // Компонент-обертка
  return (
    <section className="container">
      {children}
      {/* Сюда попадет Logo, Title, LoginForm*/}
    </section>
  );
};

export default Container;
