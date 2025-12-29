/* ===== ELEMENTOS ===== */
const startScreen = document.getElementById('startScreen');
const content = document.getElementById('content');
const images = document.querySelectorAll('.carousel img');
const music = document.getElementById('music');
const timeElement = document.getElementById('time');

/* ===== MÚSICA ===== */
const REFRAIN_TIME = 45; // ajuste para o início do refrão

startScreen.addEventListener('click', () => {
  startScreen.style.display = 'none';
  content.classList.remove('hidden');

  music.currentTime = REFRAIN_TIME;
  music.volume = 0.8;
  music.play();
});

/* ===== CARROSSEL ===== */
let index = 0;
let startX = 0;
let endX = 0;

function showImage(i) {
  images.forEach(img => img.classList.remove('active'));
  images[i].classList.add('active');
}

setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 4000);

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

carousel.addEventListener('mousedown', e => {
  startX = e.clientX;
});

carousel.addEventListener('mouseup', e => {
  endX = e.clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (diff > 50) {
    index = (index + 1) % images.length;
  } else if (diff < -50) {
    index = (index - 1 + images.length) % images.length;
  }

  showImage(index);
}

/* ===== CONTADOR ===== */
const startDate = new Date(2024, 10, 17, 0, 0, 0);

function updateCounter() {
  const now = new Date();
  let diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const remainingDays = (days % 365) % 30;

  timeElement.innerHTML = `
    ${years} anos, ${months} meses, ${remainingDays} dias,<br>
    ${hours % 24} horas, ${minutes % 60} minutos e ${seconds % 60} segundos
  `;
}

setInterval(updateCounter, 1000);
updateCounter();

/* ===== CHUVA DE CORAÇÕES E ROSAS ===== */
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const symbols = ['❤️', '🌹'];
const drops = [];

for (let i = 0; i < 35; i++) {
  drops.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.5 + Math.random() * 1,
    symbol: symbols[Math.floor(Math.random() * symbols.length)]
  });
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '24px serif';

  drops.forEach(drop => {
    ctx.fillText(drop.symbol, drop.x, drop.y);
    drop.y += drop.speed;

    if (drop.y > canvas.height) {
      drop.y = -9;
      drop.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawRain);
}

drawRain();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});