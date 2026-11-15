import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // 1. Импортируем навигацию

export const Categories: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // 2. Инициализируем хук

  // Функция для перехода в конкретную категорию каталога
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${category}`);
  };

  return (
    <section className="categories">
      <div className="categories__container">

        <div className="categories__header">
          <div>
            <span className="categories__badge">
              {t('categoriesSection.badge', 'Категории')}
            </span>
            <h2 className="categories__title">
              {t('categoriesSection.title', 'Выбери свою область')}
            </h2>
            <p className="categories__subtitle">
              {t('categoriesSection.subtitle', 'Чистая навигация по категориям — без наборов и комплектов.')}
            </p>
          </div>
          {/* Кнопка «Открыть каталог» в шапке секции ведёт на общий каталог */}
          <button className="categories__catalog-btn" onClick={() => navigate('/catalog')}>
            <span>{t('categoriesSection.openCatalog', 'Открыть каталог')}</span>
            <span className="categories__btn-arrow">→</span>
          </button>
        </div>

        <div className="categories__grid">

          {/* Камеры */}
          <div className="category-card" onClick={() => handleCategoryClick('cameras')} style={{ cursor: 'pointer' }}>
            <div className="category-card__top">
              <div className="category-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <div className="category-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__title">
                {t('hero.categories.cameras', 'Камеры')}
              </h3>
              <p className="category-card__desc">
                {t('categoriesSection.camerasDesc', 'Кинокамеры и беззеркалки')}
              </p>
            </div>
          </div>

          {/* Объективы */}
          <div className="category-card" onClick={() => handleCategoryClick('lenses')} style={{ cursor: 'pointer' }}>
            <div className="category-card__top">
              <div className="category-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className="category-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__title">
                {t('hero.categories.lenses', 'Объективы')}
              </h3>
              <p className="category-card__desc">
                {t('categoriesSection.lensesDesc', 'Оптика от 14mm до 200mm')}
              </p>
            </div>
          </div>

          {/* Свет */}
          <div className="category-card" onClick={() => handleCategoryClick('lighting')} style={{ cursor: 'pointer' }}>
            <div className="category-card__top">
              <div className="category-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" />
                  <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" />
                </svg>
              </div>
              <div className="category-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__title">
                {t('hero.categories.light', 'Свет')}
              </h3>
              <p className="category-card__desc">
                {t('categoriesSection.lightDesc', 'Постоянный и импульсный свет')}
              </p>
            </div>
          </div>

          {/* Звук */}
          <div className="category-card" onClick={() => handleCategoryClick('audio')} style={{ cursor: 'pointer' }}>
            <div className="category-card__top">
              <div className="category-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </div>
              <div className="category-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__title">
                {t('hero.categories.sound', 'Звук')}
              </h3>
              <p className="category-card__desc">
                {t('categoriesSection.soundDesc', 'Рекордеры и микрофоны')}
              </p>
            </div>
          </div>

          {/* Стабилизация */}
          <div className="category-card" onClick={() => handleCategoryClick('stabilization')} style={{ cursor: 'pointer' }}>
            <div className="category-card__top">
              <div className="category-card__icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
                </svg>
              </div>
              <div className="category-card__arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__title">
                {t('hero.categories.stabilization', 'Стабилизация')}
              </h3>
              <p className="category-card__desc">
                {t('categoriesSection.stabsDesc', 'Стедикамы и штативы')}
              </p>
            </div>
          </div>

          {/* Карточка правила 2 паспортов (информационная, без клика) */}
          <div className="category-card category-card--blue">
            <div className="category-card__top">
              <div className="category-card__icon-box category-card__icon-box--blue">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
            </div>
            <div className="category-card__bottom">
              <h3 className="category-card__blue-title">
                {t('categoriesSection.passportBoxTitle', '2 оригинальных паспорта и присутствие обоих владельцев строго обязательны при получении.')}
              </h3>
              <p className="category-card__blue-desc">
                {t('categoriesSection.passportBoxDesc', 'Без исключений. Это защищает и вас, и нас.')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Categories;