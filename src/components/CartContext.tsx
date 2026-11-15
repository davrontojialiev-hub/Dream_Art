import React, { createContext, useContext, useState, useMemo } from 'react';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'cameras' | 'lenses' | 'lighting' | 'audio' | 'stabilization' | 'monitors' | 'filters' | 'accessories' | 'action' | 'special';
  price: number;
  status: string;
  desc: string;
  image?: string;
}

export interface CartItem extends EquipmentItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  minDate: string; // Минимальная дата (сегодня) для блокировки прошлого в календаре
  clientName: string;
  setClientName: (name: string) => void;
  clientPhone: string;
  setClientPhone: (phone: string) => void;
  rentalDays: number;
  totalPrice: number;
  addToCart: (item: EquipmentItem) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  sendToTelegram: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Получаем сегодняшнюю дату в формате YYYY-MM-DD (чтобы заблокировать прошедшие дни)
  const minDate = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  // Умная установка даты "с" с защитой от выбора прошлого
  const handleSetStartDate = (date: string) => {
    if (date < minDate) return; // Не даем выбрать прошедшие дни
    setStartDate(date);
    // Если дата окончания стала раньше даты начала, выравниваем её
    if (endDate && date > endDate) {
      setEndDate(date);
    }
  };

  // Умная установка даты "по" с защитой от некорректного интервала
  const handleSetEndDate = (date: string) => {
    if (date < minDate) return; // Не даем выбрать прошедшие дни
    if (startDate && date < startDate) {
      setEndDate(startDate); // Нельзя поставить раньше старта
    } else {
      setEndDate(date);
    }
  };

  const addToCart = (item: EquipmentItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setStartDate('');
    setEndDate('');
    setClientName('');
    setClientPhone('');
  };

  const totalItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const rentalDays = useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [startDate, endDate]);

  // Точный расчет стоимости: базовая за дни + 50,000 сум за каждую ночь для камер
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      let itemTotal = item.price * item.quantity * rentalDays;

      if (item.category === 'cameras') {
        itemTotal += 50000 * item.quantity * rentalDays;
      }

      return sum + itemTotal;
    }, 0);
  }, [cart, rentalDays]);

  const sendToTelegram = () => {
    if (cart.length === 0) return;

    let message = `🛒 Новый заказ аренды (Dream Art):\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} — ${item.quantity} шт. по ${item.price.toLocaleString()} сум/день\n`;
    });
    
    if (startDate && endDate) {
      message += `\n📅 Даты: с ${startDate} по ${endDate} (${rentalDays} дн. / ночей)`;
    }
    if (clientName) message += `\n👤 Имя: ${clientName}`;
    if (clientPhone) message += `\n📞 Телефон: ${clientPhone}`;
    message += `\n💰 Итого: ${totalPrice.toLocaleString()} сум`;

    const botUsername = 'rent01'; 
    const telegramUrl = `https://t.me/${botUsername}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        startDate,
        setStartDate: handleSetStartDate,
        endDate,
        setEndDate: handleSetEndDate,
        minDate,
        clientName,
        setClientName,
        clientPhone,
        setClientPhone,
        rentalDays,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        sendToTelegram,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};