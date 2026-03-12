// ИМПОРТЫ
import React from 'react'; // 1. Импортируем React - нужен для JSX
import sprite from '../../../assets/sprite.svg'; // 2. Импортируем спрайт с иконками (там лежит иконка бургера)
import './BurgerBtn.css'; // 3. Импортируем CSS стили для этой кнопки

// ТИПИЗАЦИЯ ПРОПСОВ
interface BurgerBtnProps {
  // 4. Описываем, какие пропсы (входные данные) принимает компонент
  setIsShowMobileMenu: (value: boolean) => void; // 5. Функция, которая будет открывать мобильное меню
} //    принимает true/false, ничего не возвращает (void)

// КОМПОНЕНТ
const BurgerBtn = ({ setIsShowMobileMenu }: BurgerBtnProps) => {
  // 6. Создаем компонент, принимаем пропсы

  // ФУНКЦИЯ-ОБРАБОТЧИК
  const handleBurgerBtnClick = () => {
    // 7. Создаем функцию, которая вызовется при клике
    setIsShowMobileMenu(true); // 8. Вызываем функцию из пропсов, передаем true (открыть меню)
  };

  // JSX - ЧТО ПОКАЗЫВАЕМ
  return (
    <button // 9. Обычная кнопка
      type="button" {/*// 10. type="button" - чтобы не отправляла форму*/}
      className="burger-btn" {/*// 11. Класс для CSS стилей*/}
      onClick={handleBurgerBtnClick} {/*// 12. При клике вызываем нашу функцию*/}
    >
      <svg width={32} height={32}>
        {' '}
        {/*// 13. Иконка шириной 32px, высотой 32px*/}
        <use xlinkHref={`${sprite}#icon-burger`} /> {/*14. Берем из спрайтаиконку с id="icon-burger"*/}
        
      </svg>
    </button>
  );
};

// ЭКСПОРТ
export default BurgerBtn; // 15. Разрешаем использовать этот компонент в других файлах
