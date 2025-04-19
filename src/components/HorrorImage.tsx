import { useState } from 'react';

type HorrorImageProps = {
  index: number;
  onImageClick: () => void;
};

// Функция для генерации просто красного пиксельного изображения
const generatePixelatedImage = () => {
  const size = 16;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Заполняем канвас черным цветом
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);
    
    // Добавляем красные пиксели в случайных местах
    for (let i = 0; i < size * size / 2; i++) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      // Используем разные оттенки красного
      const red = 100 + Math.floor(Math.random() * 155);
      ctx.fillStyle = `rgb(${red}, 0, 0)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  
  return canvas.toDataURL();
};

export default function HorrorImage({ index, onImageClick }: HorrorImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageSrc] = useState(generatePixelatedImage());

  return (
    <div 
      className="relative overflow-hidden rounded-sm border-2 border-horror-blood cursor-pointer aspect-square"
      onClick={onImageClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-horror-blood/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <img 
        src={imageSrc} 
        alt="" 
        className={`horror-image w-full h-full object-cover transition-transform duration-300 pixelated ${isHovered ? 'scale-105' : 'scale-100'}`} 
      />
      <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-70' : ''}`}>
        <div className="horror-symbols text-3xl">⍏ ⍖ ⊛</div>
      </div>
    </div>
  );
}