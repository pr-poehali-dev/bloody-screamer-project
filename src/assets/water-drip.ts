// Функция для создания звука бульканья и капания
export function createDrippingSounds() {
  // Создаем аудио контекст
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Функция для создания одиночного звука капли
  function createDripSound(time: number, frequency = 800, decay = 3) {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.05, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    
    oscillator.start(time);
    oscillator.stop(time + decay);
  }
  
  // Функция для создания булькающего звука
  function createBubbleSound(time: number) {
    const frequency = 100 + Math.random() * 150;
    const decay = 0.1 + Math.random() * 0.3;
    
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 2;
    filter.Q.value = 10;
    
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.5, 
      time + decay * 0.5
    );
    
    gain.gain.setValueAtTime(0.04, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + decay);
    
    oscillator.start(time);
    oscillator.stop(time + decay);
  }
  
  // Функция для воспроизведения случайной последовательности капель
  function scheduleDrips() {
    const now = audioContext.currentTime;
    let nextDripTime = now;
    
    // Создаем несколько капель с разными интервалами
    for (let i = 0; i < 10; i++) {
      // Случайная задержка между каплями
      const interval = 0.5 + Math.random() * 3;
      nextDripTime += interval;
      
      // Создаем звук капли
      createDripSound(nextDripTime, 400 + Math.random() * 800, 2 + Math.random() * 2);
    }
    
    // Планируем следующий набор капель
    setTimeout(scheduleDrips, 5000);
  }
  
  // Функция для воспроизведения случайных булькающих звуков
  function scheduleBubbles() {
    const now = audioContext.currentTime;
    let nextBubbleTime = now;
    
    // Создаем несколько пузырьков с разными интервалами
    for (let i = 0; i < 5; i++) {
      // Случайная задержка между пузырьками
      const interval = 0.2 + Math.random() * 1.5;
      nextBubbleTime += interval;
      
      // Создаем звук пузырька
      createBubbleSound(nextBubbleTime);
    }
    
    // Планируем следующий набор пузырьков
    setTimeout(scheduleBubbles, 3000);
  }
  
  // Начинаем воспроизведение звуков
  function startSounds() {
    // Возобновляем контекст, если он был приостановлен
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    scheduleDrips();
    scheduleBubbles();
  }
  
  // Останавливаем звуки
  function stopSounds() {
    audioContext.suspend();
  }
  
  return {
    start: startSounds,
    stop: stopSounds,
  };
}