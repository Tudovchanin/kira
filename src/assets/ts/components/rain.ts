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

