export function initRain(canvasId: string = 'rain') {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const context = ctx;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize();
  window.addEventListener('resize', resize);

  interface Drop {
    x: number;
    y: number;
    len: number;
    speed: number;
    thickness: number;
    sway: number;
  }

  const dropsCount = 400; // Больше капель
  const drops: Drop[] = [];

  for (let i = 0; i < dropsCount; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      len: 8 + Math.random() * 12,
      speed: 7 + Math.random() * 6,
      thickness: 0.5 + Math.random() * 0.8,
      sway: (Math.random() - 0.5) * 0.02,
    });
  }
  function draw() {
    // Полная очистка без черного
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    context.strokeStyle = 'white';
    context.lineCap = 'round';
    context.lineWidth = 1;
  
    for (const d of drops) {
      context.beginPath();
      context.moveTo(d.x, d.y);
      context.lineTo(d.x, d.y + d.len);
      context.stroke();
  
      d.y += d.speed;
      if (d.y > canvas.height) {
        d.y = -d.len;
        d.x = Math.random() * canvas.width;
      }
    }
  
    requestAnimationFrame(draw);
  }
  

  draw();
}
export function initSnowSpeed(canvasId: string = 'snow') {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Размеры
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);
  
  interface Snowflake {
    x: number;
    y: number;
    vx: number;  // скорость X (ветер)
    vy: number;  // скорость Y (падение)
    size: number;
    rotation: number;
    sway: number;
  }
  
  const snowflakes: Snowflake[] = [];
  const maxSnow = 120;
  
  // Реалистичная снежинка
  const createSnow = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * -100,
    vx: (Math.random() - 0.5) * 1.5,  // ветер влево/вправо
    vy: 0.5 + Math.random() * 1.5,     // гравитация
    size: 1.5 + Math.random() * 3,
    rotation: Math.random() * Math.PI * 2,
    sway: (Math.random() - 0.5) * 0.03
  });
  
  // Заполнить
  for (let i = 0; i < maxSnow; i++) {
    snowflakes.push(createSnow());
  }
  
  // Анимация с физикой
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach((flake, i) => {
      // ФИЗИКА: ускорение падения + ветер
      flake.vy += 0.02;  // гравитация
      flake.vx += Math.sin(flake.y * 0.001) * 0.005;  // турбулентность
      
      flake.x += flake.vx;
      flake.y += flake.vy;
      flake.rotation += flake.sway;
      
      // Размер с тенью
      const size = flake.size;
      const alpha = Math.max(0.3, 1 - flake.y / canvas.height);
      
      // Рисуем снежинку (круг + тень)
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(flake.x, flake.y);
      ctx.rotate(flake.rotation);
      
      // Тень
      ctx.shadowColor = 'rgba(0,0,0,0.1)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.fillStyle = '#f8f9ff';
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      
      // Крест для реализма
      ctx.moveTo(-size * 0.6, 0);
      ctx.lineTo(size * 0.6, 0);
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(0, size * 0.6);
      
      ctx.lineWidth = size * 0.2;
      ctx.strokeStyle = '#e0e7ff';
      ctx.fill();
      ctx.stroke();
      
      ctx.restore();
      
      // Respawn
      if (flake.y > canvas.height + 50 || flake.x > canvas.width + 50 || flake.x < -50) {
        snowflakes[i] = createSnow();
      }
    });
    
    requestAnimationFrame(animate);
  };
  
  animate();
}
