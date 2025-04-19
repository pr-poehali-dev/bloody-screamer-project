import { useEffect, useState } from 'react';

type Drip = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

export default function DrippingEffect() {
  const [drips, setDrips] = useState<Drip[]>([]);
  
  useEffect(() => {
    // Создаем начальные капли
    createInitialDrips();
    
    // Добавляем новые капли через интервал
    const interval = setInterval(() => {
      addNewDrip();
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Функция для создания начальных капель
  const createInitialDrips = () => {
    const initialDrips = Array(12).fill(0).map((_, index) => createDrip(index));
    setDrips(initialDrips);
  };
  
  // Функция для создания новой капли
  const createDrip = (id: number): Drip => {
    return {
      id,
      x: Math.random() * 98, // Случайная позиция по горизонтали (0-98%)
      y: -5, // Начинаем чуть выше экрана
      size: 0.5 + Math.random() * 1.5, // Случайный размер (0.5-2)
      delay: Math.random() * 2, // Случайная задержка до начала анимации
      duration: 3 + Math.random() * 7, // Случайная продолжительность анимации
    };
  };
  
  // Функция для добавления новой капли и удаления старой
  const addNewDrip = () => {
    setDrips(prevDrips => {
      // Удаляем самую старую каплю
      const newDrips = [...prevDrips];
      if (newDrips.length > 25) {
        newDrips.shift();
      }
      
      // Добавляем новую каплю
      const newId = Date.now();
      newDrips.push(createDrip(newId));
      return newDrips;
    });
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {drips.map((drip) => (
        <div
          key={drip.id}
          className="absolute bg-horror-blood rounded-full opacity-70"
          style={{
            left: `${drip.x}%`,
            top: `${drip.y}%`,
            width: `${drip.size}px`,
            height: `${drip.size * 3}px`,
            animationDelay: `${drip.delay}s`,
            animation: `drip ${drip.duration}s linear forwards`,
            '--size': drip.size,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}