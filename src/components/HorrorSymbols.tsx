import { useEffect, useState } from 'react';

// Набор странных символов без эмоджи
const symbols = [
  '⸸', '⍟', '⸎', '⸰', '⸫', '⸙', '⸛', '⸞',
  'ꙮ', '⍭', '⍔', '⍙', '⍚', '⍜', '⍡', '⍦',
  '⧋', '⧊', '⧉', '⧈', '⧇', '⧅', '⧃', '⧂',
  '⦿', '⧀', '⧁', '⦽', '⦼', '⦻', '⦹', '⦸',
  '⌘', '⌑', '⍯', '⎔', '⎓', '⏣', '⏢', '⏥',
  '⏧', '⌖', '⌬', '⌿', '⍀', '⍄', '⍅', '⍆',
  '⍍', '⍎', '⍏', '⍐', '⍑', '⍒', '⍕', '⍖',
  '⎊', '⎋', '⎌', '⍏', '⍖', '⍗', '⍘', '⍞',
  '⨂', '⨁', '⨀', '⧆', '⧬', '⧫', '⦻', '⦿',
  '⋈', '⋉', '⋊', '⋋', '⋌', '⋍', '⋎', '⋏',
  '⊍', '⊎', '⊏', '⊐', '⊑', '⊒', '⊓', '⊔',
  '⊕', '⊖', '⊗', '⊘', '⊙', '⊚', '⊛', '⊜'
];

type HorrorSymbolsProps = {
  visible: boolean;
  count?: number;
};

export default function HorrorSymbols({ visible, count = 150 }: HorrorSymbolsProps) {
  const [randomSymbols, setRandomSymbols] = useState<Array<{symbol: string, x: number, y: number, size: number, rotation: number, opacity: number, delay: number}>>([]);

  useEffect(() => {
    const newSymbols = Array(count)
      .fill(0)
      .map(() => ({
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 1,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 0.5
      }));
    setRandomSymbols(newSymbols);
  }, [count, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-horror-dark/90 flex items-center justify-center z-50 overflow-hidden">
      <div className="h-full w-full absolute">
        {randomSymbols.map((item, index) => (
          <div
            key={index}
            className="absolute horror-symbols text-horror-crimson animate-glitch"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}rem`,
              transform: `rotate(${item.rotation}deg)`,
              opacity: item.opacity,
              animationDelay: `${item.delay}s`,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>
    </div>
  );
}