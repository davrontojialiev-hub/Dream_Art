import { useState, useMemo, useEffect, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../components/CartContext';
import { useSearchParams } from 'react-router-dom';

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'cameras' | 'lenses' | 'lighting' | 'audio' | 'stabilization' | 'monitors' | 'filters' | 'accessories' | 'action' | 'special';
  price: number;
  status: string;
  desc: string;
  image?: string;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

export const equipmentData: EquipmentItem[] = [
  { id: 'sony-a7-iii', name: 'Sony A7 III KIT', category: 'cameras', price: 80000, status: 'available', desc: 'Полнокадровая камера' },
  { id: 'sony-a7-iiir', name: 'Sony A7 IIIR KIT', category: 'cameras', price: 80000, status: 'available', desc: 'Полнокадровая камера с высоким разрешением' },
  { id: 'sony-a7-iv', name: 'Sony A7 IV KIT', category: 'cameras', price: 100000, status: 'available', desc: 'Полнокадровая гибридная камера' },
  { id: 'sony-a7-v', name: 'Sony A7 V KIT', category: 'cameras', price: 150000, status: 'available', desc: 'Флагманская камера Sony' },
  { id: 'sony-a7-iis', name: 'Sony A7 IIIS KIT', category: 'cameras', price: 100000, status: 'available', desc: 'Светочувствительная видеокамера' },
  { id: 'sony-zv-e1', name: 'Sony ZV-E1 KIT', category: 'cameras', price: 100000, status: 'available', desc: 'Полнокадровая влогерская камера' },
  { id: 'sony-fx30', name: 'Sony FX30 KIT', category: 'cameras', price: 150000, status: 'available', desc: 'Кинокамера Super35' },
  { id: 'sony-fx3', name: 'Sony FX3 KIT', category: 'cameras', price: 150000, status: 'available', desc: 'Полнокадровая кинокамера' },
  { id: 'sony-fx6', name: 'Sony FX6 KIT', category: 'cameras', price: 350000, status: 'available', desc: 'Профессиональная кинокамера' },
  { id: 'sony-a1', name: 'Sony A1 BODY 8K', category: 'cameras', price: 300000, status: 'available', desc: 'Флагман 8K' },

  { id: 'sony-11-18', name: 'Sony 11mm F1.8', category: 'lenses', price: 50000, status: 'available', desc: 'Широкоугольный объектив' },
  { id: 'sony-15-14', name: 'Sony 15mm F1.4', category: 'lenses', price: 50000, status: 'available', desc: 'Светосильный фикс' },
  { id: 'sony-16-18', name: 'Sony 16mm F1.8', category: 'lenses', price: 50000, status: 'available', desc: 'Широкий угол' },
  { id: 'sony-24-14-gm', name: 'Sony 24mm F1.4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Профессиональный фикс G Master' },
  { id: 'sony-28-f2', name: 'Sony 28mm F2', category: 'lenses', price: 50000, status: 'available', desc: 'Компактный объектив' },
  { id: 'sony-35-14-gm', name: 'Sony 35mm F1.4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Светосильный фикс G Master' },
  { id: 'sony-50-18', name: 'Sony 50mm F1.8', category: 'lenses', price: 50000, status: 'available', desc: 'Классический полтинник' },
  { id: 'sony-50-14-gm', name: 'Sony 50mm F1.4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Высококлассный полтинник GM' },
  { id: 'sony-50-12-gm', name: 'Sony 50mm F1.2 GM', category: 'lenses', price: 200000, status: 'available', desc: 'Максимально светосильный GM' },
  { id: 'sony-55-18', name: 'Sony 55mm F1.8 ZA', category: 'lenses', price: 50000, status: 'available', desc: 'Резкий компактный объектив' },
  { id: 'sony-85-18-gm', name: 'Sony 85mm F1.8 GM', category: 'lenses', price: 50000, status: 'available', desc: 'Портретный объектив' },
  { id: 'sony-85-14-gm', name: 'Sony 85mm F1.4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Профессиональный портретник' },
  { id: 'sony-90-macro', name: 'Sony 90mm F2.8 MACRO G', category: 'lenses', price: 150000, status: 'available', desc: 'Макрообъектив' },
  { id: 'sony-16-35-28', name: 'Sony 16-35mm F2.8 GM', category: 'lenses', price: 150000, status: 'available', desc: 'Широкоугольный зум' },
  { id: 'sony-16-35-4', name: 'Sony 16-35mm F4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Широкоугольный зум F4' },
  { id: 'tamron-17-28', name: 'Tamron 17-28mm F2.8', category: 'lenses', price: 100000, status: 'available', desc: 'Широкий зум для Sony E' },
  { id: 'sony-20-70', name: 'Sony 20-70mm F4 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Универсальный зум' },
  { id: 'sony-24-70-28', name: 'Sony 24-70mm F2.8 GM', category: 'lenses', price: 150000, status: 'available', desc: 'Рабочая лошадка, стандартный зум' },
  { id: 'sony-28-70-f2', name: 'Sony 28-70mm F2 GM', category: 'lenses', price: 200000, status: 'available', desc: 'Уникальный светосильный зум' },
  { id: 'sony-24-105', name: 'Sony 24-105mm F4 G OSS', category: 'lenses', price: 50000, status: 'available', desc: 'Универсальный объектив со стабилизацией' },
  { id: 'mount-converter-efe', name: 'Mount Converter EF-E', category: 'lenses', price: 50000, status: 'available', desc: 'Адаптер для объективов Canon EF на Sony' },

  { id: 'sony-200-600', name: 'Sony 200-600mm F5.6-6.3 G', category: 'lenses', price: 100000, status: 'available', desc: 'Телеобъектив для дикой природы и спорта' },
  { id: 'sony-100-400', name: 'Sony 100-400mm F4.5-5.6 GM', category: 'lenses', price: 100000, status: 'available', desc: 'Профессиональный телезум' },
  { id: 'sony-70-200-gm', name: 'Sony 70-200mm F2.8 GM OSS', category: 'lenses', price: 100000, status: 'available', desc: 'Легендарный телевик' },
  { id: 'cage-sony', name: 'Клетка для Sony', category: 'accessories', price: 50000, status: 'available', desc: 'Защитная клетка для видеосъемки' },

  { id: 'canon-r5c', name: 'Canon R5 C KIT 8K', category: 'cameras', price: 200000, status: 'available', desc: 'Полнокадровая кинокамера Canon' },
  { id: 'canon-r5-mk2', name: 'Canon R5 Mark II KIT 8K', category: 'cameras', price: 200000, status: 'available', desc: 'Новая профессиональная камера' },
  { id: 'canon-r5', name: 'Canon R5 KIT 8K', category: 'cameras', price: 150000, status: 'available', desc: 'Гибридная камера 8K' },
  { id: 'canon-r6-mk3', name: 'Canon R6 Mark III KIT', category: 'cameras', price: 150000, status: 'available', desc: 'Современная полнокадровая камера' },
  { id: 'canon-r6-mk2', name: 'Canon R6 Mark II KIT', category: 'cameras', price: 100000, status: 'available', desc: 'Отличная скорость и качество' },
  { id: 'canon-r6', name: 'Canon R6 KIT', category: 'cameras', price: 100000, status: 'available', desc: 'Полнокадровая беззеркалка' },
  { id: 'canon-5d-iv', name: 'Canon 5D Mark IV KIT', category: 'cameras', price: 50000, status: 'available', desc: 'Легендарная зеркальная камера' },
  { id: 'canon-g7x-mk3', name: 'Canon G7 X Mark III', category: 'cameras', price: 150000, status: 'available', desc: 'Компактная камера для блогов' },

  { id: 'canon-ef-24-105', name: 'Canon 24-105mm F4L IS', category: 'lenses', price: 50000, status: 'available', desc: 'Классический зум EF' },
  { id: 'canon-ef-24-70-28', name: 'Canon 24-70mm F2.8L II', category: 'lenses', price: 100000, status: 'available', desc: 'Профессиональный зум EF' },
  { id: 'canon-ef-16-35', name: 'Canon 16-35mm F2.8L II', category: 'lenses', price: 100000, status: 'available', desc: 'Широкий угол EF' },
  { id: 'canon-ef-17-40', name: 'Canon 17-40mm F4L', category: 'lenses', price: 50000, status: 'available', desc: 'Широкоугольный объектив' },
  { id: 'canon-ef-70-200', name: 'Canon 70-200mm F2.8L II IS', category: 'lenses', price: 100000, status: 'available', desc: 'Телевик со стабилизацией' },
  { id: 'canon-ef-100-400', name: 'Canon 100-400mm F4L IS', category: 'lenses', price: 100000, status: 'available', desc: 'Телеобъектив EF' },
  { id: 'canon-ef-50-12', name: 'Canon 50mm F1.2L II', category: 'lenses', price: 100000, status: 'available', desc: 'Светосильный фикс' },
  { id: 'canon-ef-85-12', name: 'Canon 85mm F1.2L II', category: 'lenses', price: 100000, status: 'available', desc: 'Портретный топ' },
  { id: 'canon-ef-50-14', name: 'Canon 50mm F1.4', category: 'lenses', price: 50000, status: 'available', desc: 'Светлый полтинник' },
  { id: 'canon-ef-85-18', name: 'Canon 85mm F1.8', category: 'lenses', price: 50000, status: 'available', desc: 'Портретник' },
  { id: 'canon-ef-35-2', name: 'Canon 35mm F2 IS', category: 'lenses', price: 50000, status: 'available', desc: 'Фикс со стабилизатором' },
  { id: 'canon-ef-100-macro', name: 'Canon 100mm F2.8L MACRO', category: 'lenses', price: 100000, status: 'available', desc: 'Макрообъектив L-серии' },
  { id: 'canon-ef-15-fisheye', name: 'Canon 15mm F2.8 FISHEYE', category: 'lenses', price: 100000, status: 'available', desc: 'Рыбий глаз' },
  { id: 'extender-ef-2x', name: 'Extender EF 2X III', category: 'lenses', price: 50000, status: 'available', desc: 'Телеконвертер' },

  { id: 'canon-rf-24-105', name: 'Canon 24-105mm F4L IS USM', category: 'lenses', price: 50000, status: 'available', desc: 'Стандартный RF зум' },
  { id: 'canon-rf-24-105-28', name: 'Canon 24-105mm F2.8L IS USM', category: 'lenses', price: 200000, status: 'available', desc: 'Светосильный RF зум' },
  { id: 'canon-rf-28-70', name: 'Canon 28-70mm F2L USM', category: 'lenses', price: 200000, status: 'available', desc: 'Ультрасветосильный зум RF' },
  { id: 'canon-rf-24-70', name: 'Canon 24-70mm F2.8L IS USM', category: 'lenses', price: 150000, status: 'available', desc: 'Профессиональный зум RF' },
  { id: 'canon-rf-100-macro', name: 'Canon 100mm F2.8L MACRO', category: 'lenses', price: 150000, status: 'available', desc: 'Макро RF' },
  { id: 'canon-rf-15-35', name: 'Canon 15-35mm F2.8L IS USM', category: 'lenses', price: 150000, status: 'available', desc: 'Широкоугольный зум RF' },
  { id: 'canon-rf-70-200', name: 'Canon 70-200mm F2.8L IS USM', category: 'lenses', price: 100000, status: 'available', desc: 'Телевик RF' },
  { id: 'rokinon-14-rf', name: 'Rokinon 14mm F2.8 MF', category: 'lenses', price: 100000, status: 'available', desc: 'Мануальный широкий угол' },
  { id: 'canon-rf-16', name: 'Canon 16mm F2.8', category: 'lenses', price: 50000, status: 'available', desc: 'Компактный широкий фикс' },
  { id: 'canon-rf-50-18', name: 'Canon 50mm F1.8', category: 'lenses', price: 50000, status: 'available', desc: 'Лёгкий полтинник RF' },
  { id: 'canon-rf-50-12', name: 'Canon 50mm F1.2L USM', category: 'lenses', price: 200000, status: 'available', desc: 'Элитный светосильный полтинник' },
  { id: 'mount-adapter-efrf', name: 'Mount Adapter EF-RF', category: 'lenses', price: 50000, status: 'available', desc: 'Адаптер EF на RF' },
  { id: 'cage-canon', name: 'Клетка для Canon', category: 'accessories', price: 50000, status: 'available', desc: 'Защитная клетка' },

  { id: 'laowa-10', name: 'Laowa 10mm FE f/2.8', category: 'lenses', price: 150000, status: 'available', desc: 'Сверхширокоугольный объектив' },
  { id: 'laowa-24-macro', name: 'Laowa 24mm FE f/14 2X MACRO', category: 'lenses', price: 300000, status: 'available', desc: 'Зонд-макрообъектив' },
  { id: 'samyang-ef-14', name: 'Samyang 14mm F2.8 (EF)', category: 'lenses', price: 50000, status: 'available', desc: 'Ширик Samyang EF' },
  { id: 'samyang-ef-24', name: 'Samyang 24mm T1.5 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Кинообъектив' },
  { id: 'samyang-ef-35', name: 'Samyang 35mm T1.5 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Кинообъектив' },
  { id: 'samyang-ef-50', name: 'Samyang 50mm T1.5 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Кинообъектив' },
  { id: 'samyang-ef-85', name: 'Samyang 85mm T1.5 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Кинообъектив портретный' },
  { id: 'samyang-ef-135', name: 'Samyang 135mm F2.2 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Теле-фикс' },
  { id: 'sigma-ef-24', name: 'Sigma 24mm 1:1.8 DG (EF)', category: 'lenses', price: 50000, status: 'available', desc: 'Объектив Sigma EF' },
  { id: 'sigma-ef-18-35', name: 'Sigma 18-35mm 1:1.8 DG (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Культовый светосильный зум' },
  { id: 'sigma-ef-24-105', name: 'Sigma 24-105mm 1:4 DG (EF)', category: 'lenses', price: 50000, status: 'available', desc: 'Зум Sigma' },
  { id: 'sigma-ef-150-600', name: 'Sigma 150-600mm F5-6.3 (EF)', category: 'lenses', price: 100000, status: 'available', desc: 'Супертелевик' },
  { id: 'sirui-24', name: 'Sirui 24mm F2.8 1.33X Anamorphic', category: 'lenses', price: 150000, status: 'available', desc: 'Анаморфный объектив' },
  { id: 'sirui-35', name: 'Sirui 35mm F1.8 1.33X Anamorphic', category: 'lenses', price: 150000, status: 'available', desc: 'Анаморфный объектив' },
  { id: 'sirui-50', name: 'Sirui 50mm F1.8 1.33X Anamorphic', category: 'lenses', price: 150000, status: 'available', desc: 'Анаморфный объектив' },
  { id: 'samyang-af-35', name: 'Samyang AF 35mm F1.4 (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Автофокусный фикс' },
  { id: 'samyang-af-50', name: 'Samyang AF 50mm F1.4 (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Автофокусный фикс' },
  { id: 'samyang-af-85', name: 'Samyang AF 85mm F1.4 (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Портретный автофокусный' },
  { id: 'samyang-af-14', name: 'Samyang AF 14mm F2.8 (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Ширик с автофокусом' },
  { id: 'sigma-af-60-600', name: 'Sigma AF 60-600mm (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Супертелезум' },
  { id: 'sigma-af-150-600', name: 'Sigma AF 150-600mm (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Супертелезум' },
  { id: 'sigma-af-28-70', name: 'Sigma AF 28-70mm F2.8 (E)', category: 'lenses', price: 100000, status: 'available', desc: 'Легкий светосильный зум' },

  { id: 'godox-s30', name: 'Godox S30', category: 'lighting', price: 100000, status: 'available', desc: 'Фокусируемый постоянный свет' },
  { id: 'led-panel-20x20', name: 'LED Panel (20x20) Bi-Color', category: 'lighting', price: 50000, status: 'available', desc: 'Компактная светодиодная панель' },
  { id: 'led-panel-30x50', name: 'LED Panel (30x50) Bi-Color', category: 'lighting', price: 100000, status: 'available', desc: 'Яркая панель освещения' },
  { id: 'redlight', name: 'Redlight (фото фонарь)', category: 'lighting', price: 50000, status: 'available', desc: 'Специальный фото фонарь' },
  { id: 'godox-xino-flo', name: 'Godox Xino Flo Bi-Color', category: 'lighting', price: 100000, status: 'available', desc: 'Осветительная панель' },
  { id: 'nanlite-rgb-30c', name: 'Nanlite RGB (30c)', category: 'lighting', price: 100000, status: 'available', desc: 'Полноцветная трубка' },
  { id: 'nanlite-rgb-15c', name: 'Nanlite RGB (15c)', category: 'lighting', price: 80000, status: 'available', desc: 'Компактная RGB трубка' },
  { id: 'ulanzi-ua20', name: 'Ulanzi UA20 Bi-Color', category: 'lighting', price: 70000, status: 'available', desc: 'Накамерный свет' },
  { id: 'ambitful-gc30r', name: 'Ambitful GC30R RGB', category: 'lighting', price: 80000, status: 'available', desc: 'RGB свет' },
  { id: 'rgb-mini-wand', name: 'RGB mini (цветной жезл)', category: 'lighting', price: 50000, status: 'available', desc: 'Цветной светодиодный жезл' },
  { id: 'godox-lc500', name: 'Godox LC500 (джедай)', category: 'lighting', price: 50000, status: 'available', desc: 'Световой меч' },
  { id: 'nanlite-rgb-jedai', name: 'Nanlite RGB (джедай)', category: 'lighting', price: 50000, status: 'available', desc: 'Световая трубка' },
  { id: 'godox-100x', name: 'Godox 100X Bi-Color', category: 'lighting', price: 80000, status: 'available', desc: 'Мощный студийный свет' },
  { id: 'amaran-60d', name: 'Amaran 60D', category: 'lighting', price: 100000, status: 'available', desc: 'Точечный свет Aputure' },
  { id: 'amaran-200d', name: 'Amaran 200D', category: 'lighting', price: 80000, status: 'available', desc: 'Мощный дневной свет' },
  { id: 'amaran-200x', name: 'Amaran 200X Bi-Color', category: 'lighting', price: 80000, status: 'available', desc: 'Двухцветный студийный свет' },
  { id: 'amaran-150c', name: 'Amaran 150C Bi-Color RGB', category: 'lighting', price: 80000, status: 'available', desc: 'Полноцветный студийный свет' },
  { id: 'amaran-300c', name: 'Amaran 300C Bi-Color RGB', category: 'lighting', price: 100000, status: 'available', desc: 'Мощный RGB свет' },
  { id: 'amaran-ray-360c', name: 'Amaran Ray 360C RGB', category: 'lighting', price: 150000, status: 'available', desc: 'Профессиональная панель' },
  { id: 'amaran-ray-660c', name: 'Amaran Ray 660C RGB', category: 'lighting', price: 300000, status: 'available', desc: 'Сверхмощный RGB свет' },
  { id: 'godox-ad600-pro', name: 'Godox AD600 Pro', category: 'lighting', price: 200000, status: 'available', desc: 'Импульсный свет' },
  { id: 'godox-ad200', name: 'Godox AD200', category: 'lighting', price: 150000, status: 'available', desc: 'Импульсная вспышка' },
  { id: 'godox-ad100', name: 'Godox AD100', category: 'lighting', price: 100000, status: 'available', desc: 'Портативный импульсный свет' },
  { id: 'nice-foto', name: 'Nice Foto', category: 'lighting', price: 100000, status: 'available', desc: 'Студийный импульсный свет' },
  { id: 'vspishka-komplekt', name: 'Вспышка (фото комплект)', category: 'lighting', price: 70000, status: 'available', desc: 'Комплект вспышек' },
  { id: 'godox-v1', name: 'Вспышка на камерный Godox V1', category: 'lighting', price: 50000, status: 'available', desc: 'Накамерная вспышка' },
  { id: 'nanlite-forza-500', name: 'Nanlite Forza 500 (Солнце)', category: 'lighting', price: 250000, status: 'available', desc: 'Мощный заливной свет' },
  { id: 'aputure-600d-pro', name: 'Aputure 600D Pro (Солнце)', category: 'lighting', price: 300000, status: 'available', desc: 'Профессиональное солнце' },
  { id: 'nanlite-forza-720b', name: 'Nanlite Forza 720B Bi-Color', category: 'lighting', price: 350000, status: 'available', desc: 'Сверхмощный биколорный свет' },
  { id: 'softbox-p60', name: 'Софтбокс P60', category: 'lighting', price: 50000, status: 'available', desc: 'Параболический софтбокс' },
  { id: 'softbox-p90', name: 'Софтбокс P90', category: 'lighting', price: 50000, status: 'available', desc: 'Параболический софтбокс' },
  { id: 'softbox-p120', name: 'Софтбокс P120', category: 'lighting', price: 50000, status: 'available', desc: 'Большой параболический софтбокс' },
  { id: 'china-ball', name: 'China Ball', category: 'lighting', price: 50000, status: 'available', desc: 'Сфера рассеянного света' },
  { id: 'octabox-120', name: 'Octabox 120cm', category: 'lighting', price: 50000, status: 'available', desc: 'Октабокс' },
  { id: 'beauty-dish', name: 'Beauty Dish', category: 'lighting', price: 50000, status: 'available', desc: 'Портретная тарелка' },
  { id: 'stripbox', name: 'Stripbox', category: 'lighting', price: 50000, status: 'available', desc: 'Стрипбокс' },
  { id: 'softbox-std', name: 'Softbox', category: 'lighting', price: 50000, status: 'available', desc: 'Стандартный софтбокс' },
  { id: 'rama-lighting', name: 'Рама (освещение)', category: 'lighting', price: 100000, status: 'available', desc: 'Рама для рассеивания света' },

  { id: 'sennheiser-g4', name: 'Sennheiser G4', category: 'audio', price: 80000, status: 'available', desc: 'Радиосистема профессиональная' },
  { id: 'saramonic-1', name: 'Saramonic (1 спикер)', category: 'audio', price: 50000, status: 'available', desc: 'Беспроводная петличка' },
  { id: 'saramonic-2', name: 'Saramonic (2 спикера)', category: 'audio', price: 80000, status: 'available', desc: 'Радиосистема на двух человек' },
  { id: 'dji-mic-2', name: 'DJI Mic (2 спикера)', category: 'audio', price: 100000, status: 'available', desc: 'Популярная радиосистема DJI' },
  { id: 'lark-max', name: 'Lark Max (2 спикера)', category: 'audio', price: 100000, status: 'available', desc: 'Премиум радиосистема Hollyland' },
  { id: 'rode-2', name: 'Rode (2 спикера)', category: 'audio', price: 100000, status: 'available', desc: 'Rode Wireless Pro / GO' },
  { id: 'zoom-h6', name: 'Zoom H6', category: 'audio', price: 50000, status: 'available', desc: 'Звуковой рекордер' },
  { id: 'zoom-h8', name: 'Zoom H8', category: 'audio', price: 80000, status: 'available', desc: 'Многоканальный рекордер' },
  { id: 'rode-shotgun', name: 'Rode (микрофон-пушка)', category: 'audio', price: 50000, status: 'available', desc: 'Накамерный микрофон-пушка' },

  { id: 'dji-rs5', name: 'DJI RS 5 (3 kg)', category: 'stabilization', price: 200000, status: 'available', desc: 'Новый стабилизатор DJI' },
  { id: 'dji-rs4-pro', name: 'DJI RS 4 Pro (4.5 kg)', category: 'stabilization', price: 200000, status: 'available', desc: 'Профессиональный электронный стедикам' },
  { id: 'dji-rs4', name: 'DJI RS 4 (3 kg)', category: 'stabilization', price: 150000, status: 'available', desc: 'Стедикам для камер' },
  { id: 'dji-rs3-pro', name: 'DJI RS 3 Pro (4.5 kg)', category: 'stabilization', price: 150000, status: 'available', desc: 'Стедикам Pro-серии' },
  { id: 'dji-rs2-pro', name: 'DJI RS 2 Pro', category: 'stabilization', price: 100000, status: 'available', desc: 'Электронный стабилизатор' },
  { id: 'ronin-s', name: 'Ronin-S', category: 'stabilization', price: 100000, status: 'available', desc: 'Стедикам для тяжелых камер' },
  { id: 'easyrig', name: 'Easyrig', category: 'stabilization', price: 100000, status: 'available', desc: 'Система поддержки оператора' },
  { id: 'on-camera-monitor', name: 'Накамерный монитор', category: 'monitors', price: 50000, status: 'available', desc: 'Простой накамерный монитор' },
  { id: 'atomos-ninja', name: 'Atomos (10-bit SSD 1TB)', category: 'monitors', price: 300000, status: 'available', desc: 'Рекордер-монитор 10-bit' },
  { id: 'lilliput-h7', name: 'Lilliput (H7 7)', category: 'monitors', price: 100000, status: 'available', desc: 'Накамерный яркий монитор' },
  { id: 'director-monitor-4k', name: 'Режиссерский монитор 4K + WiFi', category: 'monitors', price: 200000, status: 'available', desc: 'Беспроводной монитор' },
  { id: 'hollyland-pyro-7', name: 'Hollyland Pyro 7', category: 'monitors', price: 200000, status: 'available', desc: 'Беспроводной монитор-передатчик' },
  { id: 'director-monitor-big', name: 'Режиссерский монитор 4K Big', category: 'monitors', price: 300000, status: 'available', desc: 'Большой монитор режиссера' },

  { id: 'nd-67', name: 'ND (67)', category: 'filters', price: 50000, status: 'available', desc: 'Нейтральный фильтр 67mm' },
  { id: 'nd-77', name: 'ND (77)', category: 'filters', price: 50000, status: 'available', desc: 'Нейтральный фильтр 77mm' },
  { id: 'nd-82', name: 'ND (82)', category: 'filters', price: 50000, status: 'available', desc: 'Нейтральный фильтр 82mm' },
  { id: 'nd-cpl-82', name: 'ND + CPL (82)', category: 'filters', price: 100000, status: 'available', desc: 'Комбинированный фильтр' },
  { id: 'polarizer-77', name: 'Polarizer (77)', category: 'filters', price: 50000, status: 'available', desc: 'Поляризационный фильтр' },
  { id: 'nd-cpl-set', name: 'ND + CPL (67-72-77-82-95)', category: 'filters', price: 150000, status: 'available', desc: 'Набор фильтров' },
  { id: 'nd-black-mist', name: 'ND + BLACK MIST (67-72-77-82-95)', category: 'filters', price: 150000, status: 'available', desc: 'Эффектные фильтры софт-фокус' },
  { id: 'uglovaja-ploshadka', name: 'Угловая площадка', category: 'accessories', price: 50000, status: 'available', desc: 'Для вертикальной съемки' },

  { id: 'gopro-6', name: 'GoPro 6', category: 'action', price: 50000, status: 'available', desc: 'Экшн-камера' },
  { id: 'gopro-7', name: 'GoPro 7', category: 'action', price: 50000, status: 'available', desc: 'Экшн-камера со стабилизацией' },
  { id: 'gopro-9', name: 'GoPro 9', category: 'action', price: 80000, status: 'available', desc: 'Экшн-камера с экраном' },
  { id: 'gopro-10', name: 'GoPro 10', category: 'action', price: 100000, status: 'available', desc: 'Производительная екшн-камера' },
  { id: 'gopro-11', name: 'GoPro 11', category: 'action', price: 150000, status: 'available', desc: 'Широкоформатная экшн-камера' },
  { id: 'gopro-12', name: 'GoPro 12', category: 'action', price: 150000, status: 'available', desc: 'Современная экшн-камера' },
  { id: 'gopro-13', name: 'GoPro 13', category: 'action', price: 150000, status: 'available', desc: 'Новейшая экшн-камера' },
  { id: 'gopro-360', name: 'GoPro 360', category: 'action', price: 150000, status: 'available', desc: 'Камера 360 градусов' },
  { id: 'insta360-x2', name: 'Insta360 One X2', category: 'action', price: 150000, status: 'available', desc: 'Панорамная камера' },
  { id: 'insta360-x3', name: 'Insta360 One X3', category: 'action', price: 150000, status: 'available', desc: 'Популярная 360 камера' },
  { id: 'insta360-x4', name: 'Insta360 One X4', category: 'action', price: 150000, status: 'available', desc: 'Флагманская 360 камера 8K' },
  { id: 'mount-head', name: 'Крепление на голову', category: 'accessories', price: 50000, status: 'available', desc: 'Аксессуар для GoPro' },
  { id: 'mount-hand', name: 'Крепление на руку', category: 'accessories', price: 50000, status: 'available', desc: 'Аксессуар' },
  { id: 'mount-chest', name: 'Крепление на грудь', category: 'accessories', price: 50000, status: 'available', desc: 'Аксессуар' },
  { id: 'suction-cup', name: 'Присоска-крепление', category: 'accessories', price: 50000, status: 'available', desc: 'Для авто и гладких поверхностей' },
  { id: 'float-handle', name: 'Желтая ручка поплавок', category: 'accessories', price: 50000, status: 'available', desc: 'Для съемок на воде' },
  { id: 'aquabox', name: 'Водонепроницаемый аквабокс', category: 'accessories', price: 50000, status: 'available', desc: 'Защита от воды' },
  { id: 'selfie-stick', name: 'Селфи-палка', category: 'accessories', price: 50000, status: 'available', desc: 'Монопод' },
  { id: 'universal-mount', name: 'Универсальное крепление', category: 'accessories', price: 50000, status: 'available', desc: 'Крепление' },
  { id: 'magic-arm', name: 'Magic Arm', category: 'accessories', price: 50000, status: 'available', desc: 'Шарнирный кронштейн' },
  { id: 'tilta-helmet', name: 'Шлем TILTA для съемки от первого лица', category: 'special', price: 750000, status: 'available', desc: 'Шлем для POV съемок (60$)' },
  { id: 'single-suction', name: 'Одинарная присоска', category: 'special', price: 100000, status: 'available', desc: 'Надежное крепление' },
  { id: 'triple-suction', name: 'Тройная присоска', category: 'special', price: 150000, status: 'available', desc: 'Профессиональная тройная присоска' },
  { id: 'long-triple-suction', name: 'Удлинённая тройная присоска', category: 'special', price: 200000, status: 'available', desc: 'Для экстремальной съемки с авто' }
];

export const Catalog: FC = () => {
  const { t, i18n } = useTranslation();
  const { addToCart, setIsCartOpen } = useCart();

  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Нормализуем параметры (поддерживаем и light/sound, и lighting/audio)
  useEffect(() => {
    if (categoryParam) {
      let normalizedCat = categoryParam;
      if (normalizedCat === 'light') normalizedCat = 'lighting';
      if (normalizedCat === 'sound') normalizedCat = 'audio';

      setSelectedCategory(normalizedCat);
      setSelectedSubCategory('all');
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam]);

  const categoryLabels: Record<string, string> = {
    all: t('catalogPage.filterAll', 'Всё'),
    cameras: t('hero.categories.cameras', 'Камеры'),
    lenses: t('hero.categories.lenses', 'Объективы'),
    lighting: t('hero.categories.light', 'Свет'),
    audio: t('hero.categories.sound', 'Звук'),
    stabilization: t('hero.categories.stabilization', 'Стабилизация'),
    monitors: t('catalogPage.filterMonitors', 'Мониторы'),
    filters: t('catalogPage.filterFilters', 'Фильтры'),
    accessories: t('catalogPage.filterAccessories', 'Аксессуары'),
    action: t('catalogPage.filterActionCameras', 'Action-камеры'),
    special: t('catalogPage.filterSpecial', 'Спецоборудование'),
  };

  const categories = Object.keys(categoryLabels);

  const subCategoriesMap: Record<string, { id: string; label: string }[]> = {
    cameras: [
      { id: 'all', label: 'Все камеры' },
      { id: 'sony', label: 'Sony' },
      { id: 'canon', label: 'Canon' },
    ],
    lenses: [
      { id: 'all', label: 'Все объективы' },
      { id: 'sony', label: 'Sony' },
      { id: 'canon-ef', label: 'Canon EF' },
      { id: 'canon-rf', label: 'Canon RF' },
      { id: 'third-party', label: 'Сторонние (Sigma/Samyang/Laowa/Sirui)' },
      { id: 'tele', label: 'Телеобъективы' },
    ],
    lighting: [
      { id: 'all', label: 'Весь свет' },
      { id: 'godox', label: 'Godox' },
      { id: 'amaran', label: 'Amaran' },
      { id: 'nanlite', label: 'Nanlite' },
      { id: 'aputure', label: 'Aputure' },
      { id: 'panels', label: 'Панели / Трубки' },
      { id: 'softboxes', label: 'Софтбоксы / Насадки' },
    ],
    audio: [
      { id: 'all', label: 'Весь звук' },
      { id: 'wireless', label: 'Радиосистемы / Петлички' },
      { id: 'recorders', label: 'Рекордеры' },
      { id: 'mics', label: 'Микрофоны-пушки' },
    ],
    stabilization: [
      { id: 'all', label: 'Вся стабилизация' },
      { id: 'dji', label: 'DJI (Ronin / RS)' },
      { id: 'gimbals', label: 'Стедикамы' },
      { id: 'support', label: 'Системы поддержки (Easyrig)' },
    ],
    monitors: [
      { id: 'all', label: 'Все мониторы' },
      { id: 'on-camera', label: 'Накамерные' },
      { id: 'recorders', label: 'Рекордеры (Atomos)' },
      { id: 'wireless', label: 'Беспроводные / Режиссерские' },
    ],
    filters: [
      { id: 'all', label: 'Все фильтры' },
      { id: 'nd', label: 'ND фильтры' },
      { id: 'polarizer', label: 'Поляризационные (CPL)' },
      { id: 'special-filters', label: 'Наборы / Black Mist' },
    ],
    action: [
      { id: 'all', label: 'Всё Action' },
      { id: 'gopro', label: 'GoPro' },
      { id: 'insta360', label: 'Insta360' },
    ],
    special: [
      { id: 'all', label: 'Всё спец. оборудование' },
      { id: 'helmets', label: 'Шлемы' },
      { id: 'suctions', label: 'Присоски' },
    ]
  };

  const currentSubCategories = subCategoriesMap[selectedCategory] || [];

  const handleCategoryChange = (catKey: string) => {
    setSelectedCategory(catKey);
    setSelectedSubCategory('all');
  };

  const handleAddToCart = (item: EquipmentItem) => {
    addToCart(item);
    setIsCartOpen(true);
  };

  const filteredEquipment = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const items = equipmentData.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      let matchesSubCategory = true;
      if (selectedSubCategory !== 'all') {
        const idLower = item.id.toLowerCase();

        if (selectedCategory === 'cameras') {
          if (selectedSubCategory === 'sony') matchesSubCategory = idLower.includes('sony') || idLower.includes('tamron');
          else if (selectedSubCategory === 'canon') matchesSubCategory = idLower.includes('canon');
        } else if (selectedCategory === 'lenses') {
          if (selectedSubCategory === 'sony') matchesSubCategory = idLower.includes('sony') && !idLower.includes('200-600') && !idLower.includes('100-400') && !idLower.includes('70-200');
          else if (selectedSubCategory === 'canon-ef') matchesSubCategory = idLower.includes('canon-ef');
          else if (selectedSubCategory === 'canon-rf') matchesSubCategory = idLower.includes('canon-rf');
          else if (selectedSubCategory === 'third-party') matchesSubCategory = idLower.includes('laowa') || idLower.includes('samyang') || idLower.includes('sigma') || idLower.includes('sirui') || idLower.includes('rokinon');
          else if (selectedSubCategory === 'tele') matchesSubCategory = idLower.includes('200-600') || idLower.includes('100-400') || idLower.includes('70-200') || idLower.includes('150-600') || idLower.includes('60-600');
        } else if (selectedCategory === 'lighting') {
          if (selectedSubCategory === 'godox') matchesSubCategory = idLower.includes('godox');
          else if (selectedSubCategory === 'amaran') matchesSubCategory = idLower.includes('amaran');
          else if (selectedSubCategory === 'nanlite') matchesSubCategory = idLower.includes('nanlite');
          else if (selectedSubCategory === 'aputure') matchesSubCategory = idLower.includes('aputure');
          else if (selectedSubCategory === 'panels') matchesSubCategory = idLower.includes('panel') || idLower.includes('rgb') || idLower.includes('wand') || idLower.includes('redlight') || idLower.includes('xino');
          else if (selectedSubCategory === 'softboxes') matchesSubCategory = idLower.includes('softbox') || idLower.includes('china') || idLower.includes('octabox') || idLower.includes('beauty') || idLower.includes('stripbox') || idLower.includes('rama');
        } else if (selectedCategory === 'audio') {
          if (selectedSubCategory === 'wireless') matchesSubCategory = idLower.includes('sennheiser') || idLower.includes('saramonic') || idLower.includes('dji-mic') || idLower.includes('lark') || idLower.includes('rode');
          else if (selectedSubCategory === 'recorders') matchesSubCategory = idLower.includes('zoom');
          else if (selectedSubCategory === 'mics') matchesSubCategory = idLower.includes('shotgun');
        } else if (selectedCategory === 'stabilization') {
          if (selectedSubCategory === 'dji') matchesSubCategory = idLower.includes('dji') || idLower.includes('ronin');
          else if (selectedSubCategory === 'gimbals') matchesSubCategory = idLower.includes('rs') || idLower.includes('ronin');
          else if (selectedSubCategory === 'support') matchesSubCategory = idLower.includes('easyrig');
        } else if (selectedCategory === 'monitors') {
          if (selectedSubCategory === 'on-camera') matchesSubCategory = idLower.includes('monitor') || idLower.includes('lilliput');
          else if (selectedSubCategory === 'recorders') matchesSubCategory = idLower.includes('atomos');
          else if (selectedSubCategory === 'wireless') matchesSubCategory = idLower.includes('director') || idLower.includes('hollyland');
        } else if (selectedCategory === 'filters') {
          if (selectedSubCategory === 'nd') matchesSubCategory = idLower.includes('nd') && !idLower.includes('mist');
          else if (selectedSubCategory === 'polarizer') matchesSubCategory = idLower.includes('polarizer') || idLower.includes('cpl');
          else if (selectedSubCategory === 'special-filters') matchesSubCategory = idLower.includes('mist') || idLower.includes('set');
        } else if (selectedCategory === 'action') {
          if (selectedSubCategory === 'gopro') matchesSubCategory = idLower.includes('gopro');
          else if (selectedSubCategory === 'insta360') matchesSubCategory = idLower.includes('insta360');
        } else if (selectedCategory === 'special') {
          if (selectedSubCategory === 'helmets') matchesSubCategory = idLower.includes('helmet');
          else if (selectedSubCategory === 'suctions') matchesSubCategory = idLower.includes('suction');
        }
      }

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query);

      return matchesCategory && matchesSubCategory && matchesSearch;
    });

    return items.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name, 'ru');
      return 0;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery, sortBy]);

  return (
    <div className="catalog-page">
      <div className="catalog-page__container">

        <div className="catalog-page__header-block">
          <div className="catalog-page__badge-top">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>{t('catalogPage.badge', 'Каталог')}</span>
          </div>
          <h1 className="catalog-page__title">{t('catalogPage.title', 'Каталог оборудования')}</h1>
          <p className="catalog-page__subtitle">{t('catalogPage.subtitle', 'Выберите профессиональную технику для аренды в реальном времени.')}</p>
        </div>

        <div className="catalog-page__top-bar">
          <div className="catalog-page__search">
            <svg className="catalog-page__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder={t('catalogPage.searchPlaceholder', 'Поиск оборудования...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="catalog-page__search-clear" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>

          <select
            className="catalog-page__sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="default">{t('catalogPage.sortDefault', 'По умолчанию')}</option>
            <option value="price-asc">{t('catalogPage.sortPriceAsc', 'Сначала дешевле')}</option>
            <option value="price-desc">{t('catalogPage.sortPriceDesc', 'Сначала дороже')}</option>
            <option value="name-asc">{t('catalogPage.sortName', 'По названию (А-Я)')}</option>
          </select>
        </div>

        {/* Главные категории */}
        <div className="catalog-page__categories">
          {categories.map((catKey) => (
            <button
              key={catKey}
              className={`catalog-page__cat-btn ${selectedCategory === catKey ? 'active' : ''}`}
              onClick={() => handleCategoryChange(catKey)}
            >
              {categoryLabels[catKey]}
            </button>
          ))}
        </div>

        {/* Подкатегории / бренды */}
        {currentSubCategories.length > 0 && (
          <div className="catalog-page__subcategories" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
            {currentSubCategories.map((sub) => (
              <button
                key={sub.id}
                className={`catalog-page__subcat-btn ${selectedSubCategory === sub.id ? 'active' : ''}`}
                onClick={() => setSelectedSubCategory(sub.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  // Меняем местами: если активна — белый фон, если нет — тёмный/прозрачный
                  background: selectedSubCategory === sub.id ? '#ffffff' : '#1f2937',
                  color: selectedSubCategory === sub.id ? '#111827' : '#ffffff',
                  transition: 'all 0.2s ease'
                }}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        <div className="catalog-page__grid">
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map((item) => (
              <div className="equipment-card" key={item.id}>
                <div className="equipment-card__image-wrapper">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="equipment-card__image" />
                  ) : (
                    <div className="equipment-card__image-placeholder" />
                  )}
                  <div className="equipment-card__tags">
                    <span className={`equipment-card__badge ${item.status}`}>
                      {item.status === 'available' ? t('catalogPage.available', 'Доступно') : t('catalogPage.booked', 'Забронировано')}
                    </span>
                    <span className="equipment-card__category-tag">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  </div>
                </div>

                <div className="equipment-card__content">
                  <h3 className="equipment-card__title">{item.name}</h3>
                  <p className="equipment-card__desc">{t(`items.${item.id}`, item.desc)}</p>

                  <div className="equipment-card__footer">
                    <div className="equipment-card__price-box">
                      <span className="equipment-card__period">{t('catalogPage.day', 'ДЕНЬ')}</span>
                      <div className="equipment-card__price">
                        <strong>{item.price.toLocaleString()} сум</strong>
                        <span className="unit">{t('catalogPage.perDay', '/день')}</span>
                      </div>
                    </div>

                    {item.status === 'available' ? (
                      <button className="equipment-card__btn" onClick={() => handleAddToCart(item)}>
                        {t('catalogPage.addToCart', 'В корзину')}
                      </button>
                    ) : (
                      <button className="equipment-card__btn equipment-card__btn--disabled" disabled>
                        {t('catalogPage.booked', 'Забронировано')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              {t('catalogPage.empty', 'В этой категории ничего не найдено.')}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Catalog; 