import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// Выносим правильную иконку щита с галочкой
const ShieldCheckIcon = ({ size = 22 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Rules: FC = () => {
  const { t } = useTranslation();

  const rulesData = [
    {
      id: 'docs',
      number: '01',
      title: t('rulesPage.docTitle', '01 Документы').replace('01 ', ''),
      description: t('rulesPage.docDesc', 'При получении нужны 2 оригинальных паспорта и присутствие обоих владельцев.'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      id: 'payment',
      number: '02',
      title: t('rulesPage.payTitle', '02 Срок и оплата').replace('02 ', ''),
      description: t('rulesPage.payDesc', 'Оплата за весь период вносится при получении. Возможна предоплата для брони.'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      ),
    },
    {
      id: 'condition',
      number: '03',
      title: t('rulesPage.techTitle', '03 Техническое состояние').replace('03 ', ''),
      description: t('rulesPage.techDesc', 'При выдаче и возврате проводится совместный осмотр и фотофиксация.'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: 'liability',
      number: '04',
      title: t('rulesPage.respTitle', '04 Ответственность').replace('04 ', ''),
      description: t('rulesPage.respDesc', 'Арендатор возмещает ущерб при поломке по вине пользователя.'),
      icon: <ShieldCheckIcon size={22} />, 
    },
    {
      id: 'return',
      number: '05',
      title: t('rulesPage.returnTitle', '05 Возврат').replace('05 ', ''),
      description: t('rulesPage.returnDesc', 'Возврат в рабочие часы студии: 09:00–23:00. Задержка тарифицируется как доп. день.'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
      ),
    },
    {
      id: 'booking',
      number: '06',
      title: t('rulesPage.bookTitle', '06 Бронирование').replace('06 ', ''),
      description: t('rulesPage.bookDesc', 'Бронь через Telegram с указанием дат и списка оборудования.'),
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
  ];

  return (
    <section className="rules-page">
      <div className="rules-page__container">
        
        <div className="rules-page__badge">
          <ShieldCheckIcon size={14} />
          <span>{t('rulesPage.badge', 'Правила аренды')}</span>
        </div>

        <h1 className="rules-page__title">{t('rulesPage.title', 'Правила аренды')}</h1>
        <p className="rules-page__subtitle">
          {t('rulesPage.subtitle', 'Коротко и понятно — чтобы съёмка прошла без сюрпризов.')}
        </p>

        <div className="rules-page__grid">
          {rulesData.map((rule) => (
            <div key={rule.id} className="rules-page__card">
              <div className="rules-page__card-icon">
                {rule.icon}
              </div>
              <div className="rules-page__card-content">
                <h3 className="rules-page__card-title">
                  <span className="rules-page__card-number">{rule.number}</span>
                  <span>{rule.title}</span>
                </h3>
                <p className="rules-page__card-desc">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rules-page__banner">
          <div className="rules-page__banner-icon">
            <ShieldCheckIcon size={28} />
          </div>
          <h2 className="rules-page__banner-title">
            {t('whyUs.passportWarning', '2 оригинальных паспорта и присутствие обоих владельцев строго обязательны при получении.')}
          </h2>
          <p className="rules-page__banner-desc">
            {t('categoriesSection.passportBoxDesc', 'Без исключений. Это защищает и вас, и нас.')}
          </p>
        </div>

      </div>
    </section>
  );
};

export default Rules;