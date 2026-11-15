import React, { useState } from 'react';
import type { EquipmentItem } from '../data/equipmentData';

interface EquipmentImageProps {
  item: EquipmentItem;
}

// База точных и качественных изображений по ID или категориям
const getImageForEquipment = (item: EquipmentItem): string => {
  // Точечные фото для популярных позиций
  const exactImages: Record<string, string> = {
    'sony-a7-iv': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    'sony-fx3': 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=600&q=80',
    'canon-r5': 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
    'dji-rs4-pro': 'https://images.unsplash.com/photo-1527011047574-bbd3395bc8e3?auto=format&fit=crop&w=600&q=80',
    'dji-mic-2': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    'zoom-h6': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    'gopro-12': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80',
    'aputure-600d-pro': 'https://images.unsplash.com/photo-1520390138845-fd2d229dd552?auto=format&fit=crop&w=600&q=80',
  };

  if (exactImages[item.id]) {
    return exactImages[item.id];
  }

  // Качественные категории по умолчанию
  const categoryImages: Record<string, string> = {
    cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    lenses: 'https://images.unsplash.com/photo-1617005082133-5c8b4b5acbb5?auto=format&fit=crop&w=600&q=80',
    lighting: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd552?auto=format&fit=crop&w=600&q=80',
    audio: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    stabilization: 'https://images.unsplash.com/photo-1527011047574-bbd3395bc8e3?auto=format&fit=crop&w=600&q=80',
    monitors: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    filters: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80',
    accessories: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&w=600&q=80',
    action: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=600&q=80',
    special: 'https://images.unsplash.com/photo-1500634245200-e524fc67504e?auto=format&fit=crop&w=600&q=80',
  };

  return categoryImages[item.category] || categoryImages.cameras;
};

export const EquipmentImage: React.FC<EquipmentImageProps> = ({ item }) => {
  const [hasError, setHasError] = useState(false);
  const imageUrl = item.image || getImageForEquipment(item);

  return (
    <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', backgroundColor: '#0f172a' }}>
      <img
        src={imageUrl}
        alt={item.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          transition: 'transform 0.3s ease',
        }}
        onError={() => setHasError(true)}
      />
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f8fafc',
            fontSize: '13px',
            fontWeight: 600,
            padding: '16px',
            textAlign: 'center',
          }}
        >
          {item.name}
        </div>
      )}
    </div>
  );
};