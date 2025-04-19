import { useEffect, useRef, useState } from 'react';

type ParkourGameProps = {
  visible: boolean;
  onDeath: () => void;
  onClose: () => void;
};

type GameObject = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'player' | 'platform' | 'spike';
  velocityY?: number;
  jumping?: boolean;
};

export default function ParkourGame({ visible, onDeath, onClose }: ParkourGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    if (!visible || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Размеры игры
    canvas.width = 800;
    canvas.height = 400;
    
    // Создаем игрока
    const player: GameObject = {
      x: 50,
      y: 300,
      width: 20,
      height: 20,
      type: 'player',
      velocityY: 0,
      jumping: false
    };
    
    // Создаем платформы
    const platforms: GameObject[] = [
      { x: 0, y: 350, width: 200, height: 50, type: 'platform' },
      { x: 250, y: 350, width: 100, height: 50, type: 'platform' },
      { x: 400, y: 300, width: 100, height: 50, type: 'platform' },
      { x: 550, y: 250, width: 100, height: 50, type: 'platform' },
      { x: 700, y: 350, width: 100, height: 50, type: 'platform' }
    ];
    
    // Создаем шипы
    const spikes: GameObject[] = [
      { x: 200, y: 330, width: 50, height: 20, type: 'spike' },
      { x: 350, y: 330, width: 50, height: 20, type: 'spike' },
      { x: 500, y: 280, width: 50, height: 20, type: 'spike' },
      { x: 650, y: 230, width: 50, height: 20, type: 'spike' }
    ];
    
    let keys: { [key: string]: boolean } = {};
    
    // Обработчики клавиш
    window.addEventListener('keydown', (e) => {
      keys[e.key] = true;
    });
    
    window.addEventListener('keyup', (e) => {
      keys[e.key] = false;
    });
    
    // Игровой цикл
    const gameLoop = () => {
      if (gameOver) return;
      
      // Очистка холста
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Гравитация
      player.velocityY! += 0.5;
      player.y += player.velocityY!;
      
      // Проверка столкновения с платформами
      let onGround = false;
      platforms.forEach(platform => {
        if (
          player.x < platform.x + platform.width &&
          player.x + player.width > platform.x &&
          player.y + player.height > platform.y &&
          player.y + player.height < platform.y + platform.height &&
          player.velocityY! > 0
        ) {
          player.y = platform.y - player.height;
          player.velocityY = 0;
          player.jumping = false;
          onGround = true;
        }
      });
      
      // Проверка столкновения со шипами
      spikes.forEach(spike => {
        if (
          player.x < spike.x + spike.width &&
          player.x + player.width > spike.x &&
          player.y < spike.y + spike.height &&
          player.y + player.height > spike.y
        ) {
          setGameOver(true);
          onDeath();
        }
      });
      
      // Проверка падения
      if (player.y > canvas.height) {
        setGameOver(true);
        onDeath();
      }
      
      // Движение
      if (keys['ArrowLeft'] || keys['a']) {
        player.x -= 5;
      }
      if (keys['ArrowRight'] || keys['d']) {
        player.x += 5;
      }
      if ((keys['ArrowUp'] || keys[' '] || keys['w']) && !player.jumping && onGround) {
        player.velocityY = -12;
        player.jumping = true;
      }
      
      // Отрисовка игрока (черный пиксельный человечек)
      ctx.fillStyle = 'white';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      
      // Отрисовка платформ
      ctx.fillStyle = '#333';
      platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });
      
      // Отрисовка шипов
      ctx.fillStyle = '#8a0303';
      spikes.forEach(spike => {
        // Рисуем шипы в виде треугольников
        ctx.beginPath();
        ctx.moveTo(spike.x, spike.y + spike.height);
        ctx.lineTo(spike.x + spike.width / 2, spike.y);
        ctx.lineTo(spike.x + spike.width, spike.y + spike.height);
        ctx.closePath();
        ctx.fill();
      });
      
      // Цель (финиш)
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(750, 300, 30, 50);
      
      // Проверка достижения финиша
      if (
        player.x < 780 &&
        player.x + player.width > 750 &&
        player.y < 350 &&
        player.y + player.height > 300
      ) {
        onClose();
      }
      
      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };
    
    gameLoop();
    
    return () => {
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('keyup', () => {});
    };
  }, [visible, gameOver, onDeath, onClose]);
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-horror-dark">
      <div className="relative bg-black p-4 border-2 border-horror-blood">
        <div className="text-horror-blood mb-2 text-center">Пройдите паркур, чтобы выбраться</div>
        <canvas 
          ref={canvasRef} 
          className="game-canvas border border-horror-blood" 
        />
        <div className="text-horror-blood text-sm mt-2 text-center">
          Управление: ← → для движения, ↑ или пробел для прыжка
        </div>
      </div>
    </div>
  );
}