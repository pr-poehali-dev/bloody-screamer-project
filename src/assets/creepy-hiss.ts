export const playHissSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Создаем генератор шума
    const noiseLength = 2;
    const bufferSize = audioContext.sampleRate * noiseLength;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Заполняем буфер шумом
    for (let i = 0; i < bufferSize; i++) {
      // Шипящий шум с изменяемой громкостью
      const fade = 1.0 - (i / bufferSize); // Затухание к концу
      data[i] = (Math.random() * 2 - 1) * fade * (0.5 + Math.sin(i / 10000) * 0.5);
    }
    
    // Создаем источник звука
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    // Создаем фильтр для шипения
    const filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1000;
    filter.Q.value = 8;
    
    // Искажение для более жуткого звука
    const distortion = audioContext.createWaveShaper();
    function makeDistortionCurve(amount = 50) {
      const k = typeof amount === 'number' ? amount : 50;
      const nSamples = 44100;
      const curve = new Float32Array(nSamples);
      const deg = Math.PI / 180;
      for (let i = 0; i < nSamples; ++i) {
        const x = i * 2 / nSamples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
      }
      return curve;
    }
    distortion.curve = makeDistortionCurve(400);
    
    // Контроль громкости
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3; // Уменьшаем громкость для безопасности
    
    // Соединяем ноды
    source.connect(filter);
    filter.connect(distortion);
    distortion.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Запускаем звук
    source.start();
    
    // Останавливаем звук через 2 секунды
    setTimeout(() => {
      source.stop();
    }, 2000);
    
    return source;
  } catch (error) {
    console.error("Ошибка воспроизведения звука:", error);
    return null;
  }
};