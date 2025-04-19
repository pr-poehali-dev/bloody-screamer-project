import { useState, useEffect } from "react";
import HorrorImage from "@/components/HorrorImage";
import HorrorSymbols from "@/components/HorrorSymbols";
import { playHissSound } from "@/assets/creepy-hiss";

// Количество пиксельных изображений для отображения
const IMAGE_COUNT = 9;

export default function Index() {
  const [showSymbols, setShowSymbols] = useState(false);
  const [symbols, setSymbols] = useState<string[]>([]);

  // Генерируем случайные "страшные" символы
  useEffect(() => {
    const horrorSymbols = "⛧⛥☠⚰⚱✝⚔ꙮ⸸⍟♰♱☦⁂⛮⸹";
    const randomSymbols = Array(20)
      .fill(0)
      .map(() => horrorSymbols[Math.floor(Math.random() * horrorSymbols.length)]);
    setSymbols(randomSymbols);
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
            {symbols.slice(0, 7).join(' ')}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
            {symbols.slice(7, 14).join(' ')}
          </div>
        </div>
      </main>

      <footer className="py-4 border-t border-horror-blood">
        <div className="container mx-auto">
          <div className="text-xl text-center horror-symbols">
            {symbols.slice(14, 20).join(' ')}
          </div>
        </div>
      </footer>

      {/* Скример с символами */}
      <HorrorSymbols visible={showSymbols} count={150} />
    </div>
  );
}