import { useState, useEffect } from "react";
import HorrorImage from "@/components/HorrorImage";
import HorrorSymbols from "@/components/HorrorSymbols";
import DrippingEffect from "@/components/DrippingEffect";
import { playHissSound } from "@/assets/creepy-hiss";
import { createDrippingSounds } from "@/assets/water-drip";

// Количество пиксельных изображений для отображения
const IMAGE_COUNT = 12;

// Набор странных символов
const strangeSymbols = [
  '⸸', '⍟', '⸎', '⸰', '⸫', '⸙', '⸛', '⸞',
  'ꙮ', '⍭', '⍔', '⍙', '⍚', '⍜', '⍡', '⍦',
  '⧋', '⧊', '⧉', '⧈', '⧇', '⧅', '⧃', '⧂',
  '⦿', '⧀', '⧁', '⦽', '⦼', '⦻', '⦹', '⦸',
  '⌘', '⌑', '⍯', '⎔', '⎓', '⏣', '⏢', '⏥'
];

export default function Index() {
  const [showSymbols, setShowSymbols] = useState(false);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [drippingSoundEffect, setDrippingSoundEffect] = useState<{start: () => void, stop: () => void} | null>(null);

  // Генерируем случайные странные символы
  useEffect(() => {
    const randomSymbols = Array(30)
      .fill(0)
      .map(() => strangeSymbols[Math.floor(Math.random() * strangeSymbols.length)]);
    setSymbols(randomSymbols);
    
    // Создаем эффект бульканья и капания
    const soundEffect = createDrippingSounds();
    setDrippingSoundEffect(soundEffect);
    
    // Начинаем воспроизведение звуков после взаимодействия пользователя
    const startSoundsOnInteraction = () => {
      soundEffect.start();
      document.removeEventListener('click', startSoundsOnInteraction);
    };
    
    document.addEventListener('click', startSoundsOnInteraction);
    
    return () => {
      soundEffect.stop();
      document.removeEventListener('click', startSoundsOnInteraction);
    };
  }, []);

  const handleImageClick = () => {
    // Показываем скример с символами
    const soundSource = playHissSound();
    setShowSymbols(true);
    
    // Через 2 секунды скрываем скример
    setTimeout(() => {
      setShowSymbols(false);
      soundSource?.stop();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-horror-dark flex flex-col">
      <header className="py-4 border-b border-horror-blood">
        <div className="container mx-auto">
          <div className="text-4xl text-center horror-symbols">
            {symbols.slice(0, 9).join(' ')}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: IMAGE_COUNT }).map((_, index) => (
            <HorrorImage 
              key={index}
              index={index} 
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="horror-symbols text-3xl mb-6">
            {symbols.slice(9, 18).join(' ')}
          </div>
        </div>
      </main>

      <footer className="py-4 border-t border-horror-blood">
        <div className="container mx-auto">
          <div className="text-xl text-center horror-symbols">
            {symbols.slice(18, 30).join(' ')}
          </div>
        </div>
      </footer>

      {/* Эффект капающей воды */}
      <DrippingEffect />

      {/* Скример с символами */}
      <HorrorSymbols visible={showSymbols} count={200} />
    </div>
  );
}