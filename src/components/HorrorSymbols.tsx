import { useEffect, useState } from 'react';

const symbols = [
  '☠', '⚰', '⛧', '⛥', '⚱', '✝', '⚔', 
  'ꙮ', '⸸', '⍟', '♰', '♱', '☦', '⁂',
  '⛮', '⸹', '⤊', '⧌', '⧋', '⧊', '⍭'
];

type HorrorSymbolsProps = {
  visible: boolean;
  count?: number;
};

export default function HorrorSymbols({ visible, count = 50 }: HorrorSymbolsProps) {
  const [randomSymbols, setRandomSymbols] = useState<string[]>([]);

  useEffect(() => {
    const newSymbols = Array(count)
      .fill(0)
      .map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    setRandomSymbols(newSymbols);
  }, [count]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-horror-dark/90 flex items-center justify-center z-50 overflow-hidden">
      <div className="h-full w-full absolute">
        {randomSymbols.map((symbol, index) => (
          <div
            key={index}
            className="absolute horror-symbols text-horror-crimson animate-glitch"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 5 + 1}rem`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
}