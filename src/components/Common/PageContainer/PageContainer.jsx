// ============================================
// PageContainer.jsx - КОНТЕЙНЕР ДЛЯ ВСЕХ СТРАНИЦ
// ============================================

// 1. Импортируем React
import React from 'react';

// 2. Импортируем CSS стили
import './PageContainer.css';

// 3. СОЗДАЕМ КОМПОНЕНТ
//    Компонент принимает children - то, что будет внутри контейнера
const PageContainer = ({ children }) => {
  // 4. JSX - возвращаем div с классом page-container
  //    Внутрь помещаем children (содержимое страницы)
  return <div className="page-container">{children}</div>;
};

// 5. ЭКСПОРТИРУЕМ КОМПОНЕНТ (ВОТ ЭТО САМОЕ ВАЖНОЕ!)
//    export default означает: "этот компонент можно импортировать в других файлах"
export default PageContainer;
