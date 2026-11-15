import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // 1. Импортируем навигацию

export const Hero: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // 2. Инициализируем хук

  // Функция для перехода в каталог с выбранной категорией (если нужно)
  const handleCategoryClick = (category: string) => {
    navigate(`/catalog?category=${category}`);
  };

  return (
    <section className="hero">
      <div className="container hero__container">
        
        <div className="hero__content">
          <div className="hero__badge">
            <svg className="hero__badge-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{t('hero.badge', 'Студия аренды техники')}</span>
          </div>

          <h1 className="hero__title">
            {t('hero.title', 'Арендуй технику, которая создаёт искусство')}
          </h1>

          <p className="hero__description">
            {t('hero.subtitle', 'Камеры, объективы, свет, звук и стабилизация — проверенное оборудование для съёмки любого уровня.')}
          </p>

          <div className="hero__actions">
            {/* 3. Кнопка «Открыть каталог» ведёт на /catalog */}
            <button 
              className="hero__btn hero__btn--primary"
              onClick={() => navigate('/catalog')}
            >
              <span>{t('hero.openCatalog', 'Открыть каталог')}</span>
              <span className="hero__btn-arrow">→</span>
            </button>

            {/* 4. Кнопка «Правила аренды» ведёт на /rules (или какой у тебя путь) */}
            <button 
              className="btn btn--white"
              onClick={() => navigate('/rules')}
            >
              {t('hero.rulesBtn', 'Правила аренды')}
            </button>
          </div>

          <div className="hero__tags">
            {/* 5. Нижние кнопки (теги категорий) открывают каталог с фильтром */}
            <button className="tag" onClick={() => handleCategoryClick('cameras')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
              <span>{t('hero.categories.cameras', 'Камеры')}</span>
            </button>

            <button className="tag" onClick={() => handleCategoryClick('lenses')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>{t('hero.categories.lenses', 'Объективы')}</span>
            </button>

            <button className="tag" onClick={() => handleCategoryClick('light')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>
              <span>{t('hero.categories.light', 'Свет')}</span>
            </button>

            <button className="tag" onClick={() => handleCategoryClick('sound')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
              <span>{t('hero.categories.sound', 'Звук')}</span>
            </button>

            <button className="tag" onClick={() => handleCategoryClick('stabilization')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20"/></svg>
              <span>{t('hero.categories.stabilization', 'Стабилизация')}</span>
            </button>
          </div>
        </div>

        <div className="hero__preview">
          <div className="hero__float-badge hero__float-badge--top">
            <span className="hero__float-label">/ day from</span>
            <span className="hero__float-value">$12</span>
          </div>

          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <span className="hero__card-subtitle">{t('whyUs.badge', 'ПОЧЕМУ DREAM ART')}</span>
                <h3 className="hero__card-title">{t('whyUs.title', 'DREAM ART Studio')}</h3>
              </div>
            </div>

            <div className="hero__features">
              <div className="hero__feature-item">
                <div className="hero__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div className="hero__feature-text">
                  <h4>{t('whyUs.checkedTechTitle', 'Проверенная техника')}</h4>
                  <p>{t('whyUs.checkedTechDesc', 'Каждая единица проходит технический контроль перед выдачей.')}</p>
                </div>
              </div>

              <div className="hero__feature-item">
                <div className="hero__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div className="hero__feature-text">
                  <h4>{t('whyUs.fastIssueTitle', 'Быстрая выдача')}</h4>
                  <p>{t('whyUs.fastIssueDesc', 'Оформление и выдача за 10 минут в студии в Ташкенте.')}</p>
                </div>
              </div>

              <div className="hero__feature-item">
                <div className="hero__feature-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                </div>
                <div className="hero__feature-text">
                  <h4>{t('whyUs.supportTitle', 'Поддержка 24/7')}</h4>
                  <p>{t('whyUs.supportDesc', 'Помощь по подбору оборудования и настройке на съёмке.')}</p>
                </div>
              </div>
            </div>

            <div className="hero__card-note">
              {t('whyUs.passportWarning', '2 оригинальных паспорта и присутствие обоих владельцев строго обязательны при получении.')}
            </div>
          </div>

          <div className="hero__float-badge hero__float-badge--bottom">
            <span className="hero__float-label">gear</span>
            <span className="hero__float-value">{t('whyUs.unitsCount', '15+ units')}</span>
          </div>
        </div>

      </div>
    </section>
  );
};