const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

// Configura aquí tus opciones directamente en el código:
let options = [
  { label: 'Opción 1', color: '#f43f5e' },
  { label: 'Opción 2', color: '#06b6d4' },
  { label: 'Opción 3', color: '#10b981' },
  { label: 'Opción 4', color: '#f59e0b' },
  { label: 'Opción 5', color: '#8b5cf6' },
  { label: 'Opción 6', color: '#ec4899' }
];

let currentRotation = 0;
let isSpinning = false;

// Dibujar la ruleta en el Canvas
function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
  const numOptions = options.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (numOptions === 0) return;

  const arcSize = (2 * Math.PI) / numOptions;

  options.forEach((opt, index) => {
    const startAngle = index * arcSize - Math.PI / 2;
    const endAngle = startAngle + arcSize;

    // Dibujar Sector
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = opt.color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Dibujar Texto
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle + arcSize / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText(opt.label, radius - 25, 6);
    ctx.restore();
  });
}

// Girar la Ruleta
spinBtn.addEventListener('click', () => {
  if (isSpinning || options.length === 0) return;

  isSpinning = true;
  spinBtn.disabled = true;
  resultDiv.textContent = '';

  const numOptions = options.length;
  const randomExtraDegrees = Math.floor(Math.random() * 360);
  const totalDegrees = 1800 + randomExtraDegrees; // Mínimo 5 vueltas
  currentRotation += totalDegrees;

  canvas.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    isSpinning = false;
    spinBtn.disabled = false;

    const actualDegrees = currentRotation % 360;
    const winningIndex = Math.floor((360 - (actualDegrees % 360)) / (360 / numOptions)) % numOptions;
    const winner = options[winningIndex].label;

    resultDiv.textContent = `🎉 ¡Ganó: ${winner}!`;
  }, 4000);
});

// Dibujar la ruleta al cargar
drawWheel();