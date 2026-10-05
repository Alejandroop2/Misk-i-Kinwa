// Inicializar Iconos Lucide
lucide.createIcons();

const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');
const optionsList = document.getElementById('optionsList');
const addForm = document.getElementById('addForm');
const newOptionText = document.getElementById('newOptionText');
const newOptionColor = document.getElementById('newOptionColor');
const historyList = document.getElementById('historyList');

// Lista por defecto de opciones
let options = [
  { label: 'Opción 1', color: '#f43f5e' },
  { label: 'Opción 2', color: '#06b6d4' },
  { label: 'Opción 3', color: '#10b981' },
  { label: 'Opción 4', color: '#f59e0b' },
  { label: 'Opción 5', color: '#8b5cf6' },
  { label: 'Opción 6', color: '#ec4899' }
];

let history = [];
let currentRotation = 0;
let isSpinning = false;

// Renderizar la lista de opciones editable
function renderOptionsUI() {
  optionsList.innerHTML = '';
  options.forEach((opt, index) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    item.innerHTML = `
      <div class="option-info">
        <span class="color-badge" style="background-color: ${opt.color}"></span>
        <span>${opt.label}</span>
      </div>
      <button class="btn-delete" onclick="removeOption(${index})" title="Eliminar">
        <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
      </button>
    `;
    optionsList.appendChild(item);
  });
  lucide.createIcons();
  drawWheel();
}

// Dibujar la ruleta en el Canvas
function drawWheel() {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;
  const numOptions = options.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (numOptions === 0) {
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '18px Outfit';
    ctx.fillText('Añade opciones para comenzar', centerX, centerY);
    return;
  }

  const arcSize = (2 * Math.PI) / numOptions;

  options.forEach((opt, index) => {
    // CORREGIDO: Se agregó el operador de multiplicación (*) que faltaba
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

// Añadir nueva opción
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = newOptionText.value.trim();
  if (!text) return;

  options.push({ label: text, color: newOptionColor.value });
  newOptionText.value = '';
  
  // Generar un nuevo color aleatorio vistoso para la siguiente opción
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  newOptionColor.value = randomColor;

  renderOptionsUI();
});

// Eliminar opción
window.removeOption = function(index) {
  if (options.length <= 1) {
    alert('Debes mantener al menos una opción en la ruleta.');
    return;
  }
  options.splice(index, 1);
  renderOptionsUI();
};

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

    // Añadir a historial
    history.unshift(winner);
    renderHistory();
  }, 4000);
});

function renderHistory() {
  historyList.innerHTML = history.slice(0, 6).map(item => `
    <span class="history-chip">${item}</span>
  `).join('');
}

// Cargar inicial
renderOptionsUI();