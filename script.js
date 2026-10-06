const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

// Opciones intercaladas para que no queden juntas
const options = [
    'Café gratis',
    'Vuelve a intentarlo',
    'Nada',
    'Café gratis',
    'Vuelve a intentarlo',
    'Nada'
];

// Colores vistosos y variados
const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22'];

const numOptions = options.length;
const arcSize = (2 * Math.PI) / numOptions;
let currentAngle = 0;
let isSpinning = false;

// Dibujar la ruleta
function drawRoulette() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numOptions; i++) {
        const startAngle = currentAngle + i * arcSize;
        const endAngle = startAngle + arcSize;

        // Sector
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px Arial';
        ctx.fillText(options[i], radius - 20, 5);
        ctx.restore();
    }
}

// Girar la ruleta
function spin() {
    if (isSpinning) return;
    isSpinning = true;
    resultDiv.textContent = '';

    const spinAngle = Math.random() * 2000 + 3000; 
    const duration = 4000; 
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Desaceleración
        const easeOut = 1 - Math.pow(1 - progress, 3);
        currentAngle = (spinAngle * easeOut * Math.PI) / 180;

        drawRoulette();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            calculateWinner();
        }
    }

    requestAnimationFrame(animate);
}

// Calcular ganador con mensaje adecuado
function calculateWinner() {
    const normalizedAngle = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const pointerAngle = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
    const winnerIndex = Math.floor(pointerAngle / arcSize);
    const prize = options[winnerIndex];

    if (prize === 'Café gratis') {
        resultDiv.textContent = `🎉 ¡Felicidades, ganaste un Café Gratis! ☕`;
    } else if (prize === 'Vuelve a intentarlo') {
        resultDiv.textContent = `🔄 ¡Casi! Vuelve a intentarlo.`;
    } else {
        resultDiv.textContent = `😅 Gracias por participar. ¡Sigue intentando!`;
    }
}

drawRoulette();
spinBtn.addEventListener('click', spin);