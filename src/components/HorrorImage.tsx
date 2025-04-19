import { useState } from 'react';

type HorrorImageProps = {
  src: string;
  alt: string;
  onImageClick: () => void;
};

export default function HorrorImage({ src, alt, onImageClick }: HorrorImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-sm border-2 border-horror-blood cursor-pointer"
      onClick={onImageClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-horror-blood/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <img 
        src={src || "/placeholder.svg"} 
        alt={alt} 
        className={`horror-image w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`} 
      />
      <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-30' : ''}`}>
        <div className="horror-symbols text-3xl">⛧ ⛥ ☠ ⚰ ⛧</div>
      </div>
    </div>
  );
}