import type { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">

          {/* Блок бренда */}
          <div className="footer__col footer__col--brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <span className="header__logo-text">
                DREAM<span className="header__logo-accent">ART</span>
              </span>
            </div>

            <p className="footer__desc">
              {t('footer.desc', 'Профессиональная аренда фото- и кинооборудования в Ташкенте')}
            </p>

            <div className="footer__socials">
              <a
                href="https://instagram.com/dreamart_rental"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://t.me/dreamart01"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Telegram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="footer__col">
            <h4 className="footer__col-title">
              {t('footer.quickLinks', 'БЫСТРЫЕ ССЫЛКИ')}
            </h4>
            <ul className="footer__links">
              <li><Link to="/home">{t('header.home', 'Главная')}</Link></li>
              <li><Link to="/catalog">{t('header.catalog', 'Каталог')}</Link></li>
              <li><Link to="/rules">{t('header.rules', 'Правила аренды')}</Link></li>
              <li><Link to="/contacts">{t('header.contacts', 'Контакты')}</Link></li>
            </ul>
          </div>

          {/* Категории */}
          <div className="footer__col">
            <h4 className="footer__col-title">
              {t('footer.categories', 'КАТЕГОРИИ')}
            </h4>
            <ul className="footer__links footer__links--categories">
              <li>
                <Link to="/catalog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                  <span>{t('hero.categories.cameras', 'Камеры')}</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{t('hero.categories.lenses', 'Объективы')}</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  <span>{t('hero.categories.light', 'Свет')}</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                  <span>{t('hero.categories.sound', 'Звук')}</span>
                </Link>
              </li>
              <li>
                <Link to="/catalog">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M15 19l-3 3-3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
                  </svg>
                  <span>{t('hero.categories.stabilization', 'Стабилизация')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакт и адрес */}
          <div className="footer__col">
            <h4 className="footer__col-title">
              {t('footer.contactAddress', 'КОНТАКТ И АДРЕС')}
            </h4>
            <div className="footer__contact-list">
              <a href="tel:+998983073071" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>+998 98 307 30 71</span>
              </a>

              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>09:00 — 23:00</span>
              </div>

              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t('contactsPage.locationCity', 'Tashkent, Uzbekistan')}</span>
              </div>

              <div className="footer__rule-badge">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <span>{t('footer.passportRuleBtn', 'Правило 2 паспортов')}</span>
              </div>
            </div>
          </div>

        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            {t('footer.copyright', '© 2026 DREAM ART. Все права защищены.')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;