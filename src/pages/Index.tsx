import { useState, useEffect } from "react";
import HorrorImage from "@/components/HorrorImage";
import HorrorSymbols from "@/components/HorrorSymbols";
import ParkourGame from "@/components/ParkourGame";
import { playHissSound } from "@/assets/creepy-hiss";

// Пути к страшным картинкам
const horrorImages = [
  "/placeholder.svg", // Замените на реальные пути к изображениям
  "/placeholder.svg",
  "/placeholder.svg"
];

export default function Index() {
  const [showSymbols, setShowSymbols] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [clickCount, setClickCount] = useState(0);
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
    setClickCount(prev => prev + 1);
    
    if (clickCount % 2 === 0) {
      // При первом нажатии показываем скример с символами
      const soundSource = playHissSound();
      setShowSymbols(true);
      
      // Через 2 секунды скрываем скример
      setTimeout(() => {
        setShowSymbols(false);
        soundSource?.stop();
      }, 2000);
    } else {
      // При втором нажатии запускаем игру
      setShowGame(true);
    }
  };

  const handleGameDeath = () => {
    // При смерти в игре показываем скример
    setShowGame(false);
    const soundSource = playHissSound();
    setShowSymbols(true);
    
    // Через 2 секунды скрываем скример и возвращаемся на главную
    setTimeout(() => {
      setShowSymbols(false);
      soundSource?.stop();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-horror-dark flex flex-col">
      <header className="py-4 border-b border-horror-blood">
        <div className="container mx-auto">
          <h1 className="text-4xl text-center horror-text animate-flicker">
            {symbols.slice(0, 3).join(' ')} Кошмарный портал {symbols.slice(3, 6).join(' ')}
          </h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horrorImages.map((src, index) => (
            <HorrorImage 
              key={index}
              src={src} 
              alt="Страшная картинка"
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="horror-text text-2xl mb-4">
            {symbols.slice(0, 7).join(' ')}
          </p>
          <p className="horror-symbols text-xl">
            Нажми на картинку, если осмелишься...
          </p>
          <p className="horror-text text-2xl mt-4">
            {symbols.slice(7, 14).join(' ')}
          </p>
        </div>
      </main>

      {/* Скример с символами */}
      <HorrorSymbols visible={showSymbols} count={100} />
      
      {/* Игра паркур */}
      <ParkourGame 
        visible={showGame} 
        onDeath={handleGameDeath} 
        onClose={() => setShowGame(false)} 
      />
    </div>
  );
}