import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiCamera, FiMoon, FiSun } from 'react-icons/fi';
import { useCart } from './CartContext';
const Header: FC = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { totalItemsCount, setIsCartOpen } = useCart();

  const menuItems = [
    { name: t('header.home', 'Главная'), path: '/home' },
    { name: t('header.catalog', 'Каталог'), path: '/catalog' },
    { name: t('header.rules', 'Правила аренды'), path: '/rules' },
    { name: t('header.contacts', 'Контакты'), path: '/contacts' }
  ];

  const getCurrentIndex = () => {
    const index = menuItems.findIndex(item => item.path === location.pathname);
    if (index !== -1) return index;
    if (location.pathname === '/') return 0;
    return 0;
  };

  const activeIndex = getCurrentIndex();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });

  const currentLang = i18n.language ? i18n.language.slice(0, 2).toLowerCase() : 'ru';

  const changeLanguage = (lang: string) => {
    console.log('🟢 Клик зафиксирован! Пытаемся сменить язык на:', lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
    console.log('✅ Язык успешно изменен!');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (listRef.current) {
      const activeItem = listRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        const link = activeItem.querySelector('.header__link') as HTMLElement;
        if (link) {
          setLineStyle({
            width: link.offsetWidth,
            left: link.offsetLeft,
          });
        }
      }
    }
  }, [activeIndex, location.pathname, i18n.language]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">

        {/* Логотип */}
        <Link to="/home" className="header__logo">
          <div className="header__logo-icon">
            <FiCamera size={18} />
          </div>
          <span className="header__logo-text">
            DREAM<span className="header__logo-accent">ART</span>
          </span>
        </Link>

        {/* Бургер для мобильной версии */}
        <button
          className={`header__burger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Открыть меню"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        {/* Правая часть */}
        <div className={`header__right ${isMenuOpen ? 'open' : ''}`}>
          <nav className="header__nav">
            <ul className="header__list" ref={listRef}>
              {menuItems.map((item, index) => (
                <li key={index} className="header__item">
                  <Link
                    to={item.path}
                    className={`header__link ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="header__underline"
              style={{
                width: `${lineStyle.width}px`,
                transform: `translateX(${lineStyle.left}px)`
              }}
            />
          </nav>

          <div className="header__actions">
            
            {/* Переключатель языков кнопками RU | UZ | EN */}
            <div className="header__lang-switcher">
              <button
                type="button"
                className={`header__lang-btn ${currentLang === 'ru' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage('ru');
                }}
              >
                RU
              </button>
              <button
                type="button"
                className={`header__lang-btn ${currentLang === 'uz' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage('uz');
                }}
              >
                UZ
              </button>
              <button
                type="button"
                className={`header__lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeLanguage('en');
                }}
              >
                EN
              </button>
            </div>

            {/* Переключение темы */}
            <button
              className="header__action-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Переключить тему"
            >
              {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <button className="header__cart-btn" onClick={() => setIsCartOpen(true)}>
              <FiShoppingBag size={18} />
              <span>{t('header.cart', 'Корзина')} {totalItemsCount > 0 && `(${totalItemsCount})`}</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;