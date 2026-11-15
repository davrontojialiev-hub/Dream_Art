import { useState, type FC, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

const TELEGRAM_BOT_TOKEN = '8669697178:AAGJjGMbxx5J_PSdhxMbYDm0HwwmIfkRrFI';
const TELEGRAM_CHAT_ID = '456929750'; 

export const Contacts: FC = () => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || loading) return;

    setLoading(true);
    setError('');

    const message = `💡 <b>Новая идея для Dream Art:</b>\n\n${feedback.trim()}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFeedback('');
      } else {
        throw new Error('Ошибка при отправке сообщения');
      }
    } catch (err) {
      setError(t('contactsPage.error', 'Не удалось отправить идею. Попробуйте ещё раз.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacts-page">
      <div className="contacts-page__container">
        
        <div className="contacts-page__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{t('contactsPage.badge', 'Контакты')}</span>
        </div>

        <h1 className="contacts-page__title">{t('contactsPage.title', 'Контакты')}</h1>
        <p className="contacts-page__subtitle">
          {t('contactsPage.subtitle', 'Мы в центре Ташкента — приходи или пиши в Telegram.')}
        </p>

        <div className="contacts-page__top-grid">
          <a href="tel:+998983073071" className="contacts-page__info-card">
            <div className="contacts-page__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <span className="contacts-page__info-label">{t('contactsPage.phone', 'ТЕЛЕФОН')}</span>
            <span className="contacts-page__info-value">+998 98 307 30 71</span>
          </a>

          <div className="contacts-page__info-card">
            <div className="contacts-page__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="contacts-page__info-label">{t('contactsPage.workHours', 'ЧАСЫ РАБОТЫ')}</span>
            <span className="contacts-page__info-value">09:00 — 23:00</span>
          </div>

          <a 
            href="https://yandex.uz/maps/-/CTSirV06" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contacts-page__info-card"
          >
            <div className="contacts-page__info-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="contacts-page__info-label">{t('contactsPage.location', 'ЛОКАЦИЯ')}</span>
            <span className="contacts-page__info-value">{t('contactsPage.locationCity', 'Tashkent, Uzbekistan')}</span>
          </a>
        </div>

        <div className="contacts-page__social-grid">
          <a 
            href="https://t.me/dreamart01" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contacts-page__social-card contacts-page__social-card--telegram"
          >
            <div className="contacts-page__social-content">
              <span className="contacts-page__social-label">TELEGRAM</span>
              <span className="contacts-page__social-value">@dreamart01</span>
            </div>
            <div className="contacts-page__social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </a>

          <a 
            href="https://instagram.com/dreamart_rental" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contacts-page__social-card contacts-page__social-card--instagram"
          >
            <div className="contacts-page__social-content">
              <span className="contacts-page__social-label">INSTAGRAM</span>
              <span className="contacts-page__social-value">dreamart_rental</span>
            </div>
            <div className="contacts-page__social-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </a>
        </div>

        <div className="contacts-page__rule-card">
          <div className="contacts-page__rule-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h3 className="contacts-page__rule-title">{t('contactsPage.passportRule', 'Правило 2 паспортов')}</h3>
          </div>
          <p className="contacts-page__rule-desc">
            {t('contactsPage.passportRuleDesc', '2 оригинальных паспорта и присутствие обоих владельцев строго обязательны при получении.')}
          </p>
        </div>

        <div className="contacts-page__feedback-card">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contacts-page__feedback-form">
              <div className="contacts-page__feedback-header">
                <span className="contacts-page__feedback-badge">{t('contactsPage.labBadge', 'Dream Lab 💡')}</span>
                <h3 className="contacts-page__feedback-title">{t('contactsPage.labTitle', 'Есть идея для Dream Art?')}</h3>
                <p className="contacts-page__feedback-desc">
                  {t('contactsPage.labSubtitle', 'Чего вам не хватает в нашей работе? Поделитесь мыслями о новых услугах, оборудовании или сервисе — лучшие идеи мы реализуем!')}
                </p>
              </div>

              <div className="contacts-page__input-group">
                <textarea
                  className="contacts-page__textarea"
                  placeholder={t('contactsPage.labPlaceholder', 'Опишите вашу идею или предложение... Например: «Было бы круто, если бы вы добавили...»')}
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              {error && <div className="contacts-page__error-msg">{error}</div>}

              <button 
                type="submit" 
                className="contacts-page__submit-btn"
                disabled={!feedback.trim() || loading}
              >
                {loading ? t('contactsPage.sending', 'Отправка...') : t('contactsPage.labSubmit', 'Отправить идею 🚀')}
              </button>
            </form>
          ) : (
            <div className="contacts-page__feedback-success">
              <div className="contacts-page__success-emoji">💡</div>
              <h3>{t('contactsPage.successTitle', 'Спасибо за вашу идею!')}</h3>
              <p>{t('contactsPage.successDesc', 'Мы внимательно изучим ваше предложение и сделаем Dream Art еще лучше.')}</p>
              <button 
                type="button" 
                className="contacts-page__reset-btn"
                onClick={() => { setSubmitted(false); setFeedback(''); }}
              >
                {t('contactsPage.resetBtn', 'Предложить еще идею')}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contacts;