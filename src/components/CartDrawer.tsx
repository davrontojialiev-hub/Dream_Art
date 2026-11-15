import { type FC } from 'react';
import { FiX, FiTrash2, FiCalendar, FiSend, FiShield } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useCart } from './CartContext';

export const CartDrawer: FC = () => {
  const { t, i18n } = useTranslation();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clientName,
    setClientName,
    clientPhone,
    setClientPhone,
  } = useCart();

  if (!isCartOpen) return null;

  const totalPositions = cart.reduce((acc, i) => acc + i.quantity, 0);

  // Жестко преобразуем ГГГГ-ММ-ДД в ДД.ММ.ГГГГ
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '---';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    return `${day}.${month}.${year}`;
  };

  // Динамические заголовки для Telegram на разном языке
  const currentLang = i18n.language || 'ru';

  let orderHeader = '🛒 Новый заказ аренды!';
  let labelName = 'Имя';
  let labelPhone = 'Телефон';
  let labelDates = 'Даты';
  let labelFrom = 'с';
  let labelTo = 'по';
  let labelItems = 'Товары';
  let labelTotal = 'Итого';
  let notSpecified = 'Не указано';

  if (currentLang === 'uz') {
    orderHeader = '🛒 Yangi ijara buyurtmasi!';
    labelName = 'Ism';
    labelPhone = 'Telefon';
    labelDates = 'Sanalar';
    labelFrom = 'dan';
    labelTo = 'gacha';
    labelItems = 'Mahsulotlar';
    labelTotal = 'Jami';
    notSpecified = 'Kiritilmadi';
  } else if (currentLang === 'en') {
    orderHeader = '🛒 New Rental Order!';
    labelName = 'Name';
    labelPhone = 'Phone';
    labelDates = 'Dates';
    labelFrom = 'from';
    labelTo = 'to';
    labelItems = 'Items';
    labelTotal = 'Total';
    notSpecified = 'Not specified';
  }

  // Собираем текст сообщения
  let messageText = `${orderHeader}\n\n`;
  messageText += `👤 ${labelName}: ${clientName || notSpecified}\n`;
  messageText += `📞 ${labelPhone}: ${clientPhone || notSpecified}\n`;
  messageText += `📅 ${labelDates}: ${labelFrom} ${formatDate(startDate)} ${labelTo} ${formatDate(endDate)}\n\n`;
  messageText += `📦 ${labelItems}:\n`;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    messageText += `• ${item.name} (${item.quantity} шт.) — ${itemTotal.toLocaleString()} сум\n`;
  });

  messageText += `\n💰 ${labelTotal}: ${totalPrice.toLocaleString()} сум`;

  const telegramUrl = `https://t.me/rent01?text=${encodeURIComponent(messageText)}`;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>

        <div className="cart-header">
          <div>
            <h3>{t('cart.title', 'Оформление заказа')}</h3>
            <span className="cart-count">
              {totalPositions} {t('cart.positions', 'позиций')}
            </span>
          </div>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
            <FiX size={18} />
          </button>
        </div>

        <div className="cart-items-list">
          {cart.length === 0 ? (
            <p className="cart-empty">{t('cart.empty', 'Корзина пуста')}</p>
          ) : (
            cart.map((cartItem) => (
              <div key={cartItem.id} className="cart-item">
                <img
                  src={cartItem.image || 'placeholder.jpg'}
                  alt={cartItem.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <div className="cart-item-info">
                      <h4>{cartItem.name}</h4>
                      <span className="cart-item-price">{cartItem.price.toLocaleString()} сум {t('catalogPage.perDay', '/день')}</span>
                    </div>
                    <button type="button" className="cart-delete-btn" onClick={() => removeFromCart(cartItem.id)}>
                      <FiTrash2 size={15} />
                    </button>
                  </div>

                  <div className="cart-item-footer">
                    <div className="cart-quantity-selector">
                      <button type="button" onClick={() => updateQuantity(cartItem.id, -1)}>-</button>
                      <span>{cartItem.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(cartItem.id, 1)}>+</button>
                    </div>

                    <span className="cart-item-sum">{(cartItem.price * cartItem.quantity).toLocaleString()} сум</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="cart-form">
          <div className="cart-section-title">
            <FiCalendar size={16} /> {t('cart.rentalDates', 'Даты аренды')}
          </div>
          <div className="cart-dates-row">
            <div className="cart-date-input-wrap">
              <span className="cart-date-label">{t('cart.from', 'с')}</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="cart-date-input-wrap">
              <span className="cart-date-label">{t('cart.to', 'по')}</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder={t('cart.namePlaceholder', 'Твоё имя')}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="cart-input"
          />

          <input
            type="tel"
            placeholder="+998 90 123 45 67"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            className="cart-input"
          />

          <div className="cart-warning-box">
            <FiShield size={18} className="cart-warning-icon" />
            <span>{t('whyUs.passportWarning', '2 оригинальных паспорта и присутствие обоих владельцев строго обязательны при получении.')}</span>
          </div>

          <div className="cart-footer-checkout">
            <div className="cart-total">
              <span>{t('cart.total', 'Итого')}</span>
              <span className="cart-total-price">{totalPrice.toLocaleString()} сум</span>
            </div>

            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-submit-btn"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
            >
              <FiSend size={15} style={{ marginRight: '8px' }} /> {t('cart.sendTelegram', 'Отправить в Telegram')}
            </a>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CartDrawer;