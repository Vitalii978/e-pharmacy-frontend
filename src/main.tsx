// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // 👈 ВАЖНО: импортируем BrowserRouter
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       {' '}
//       {/* 👈 ВАЖНО: оборачиваем App в BrowserRouter */}
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// src/main.tsx - точка входа

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
