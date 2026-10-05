const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

// Opciones de la ruleta (puedes cambiar los nombres después)
const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5', 'Opción 6'];
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
        ctx.stroke();

        // Texto
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
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

// Calcular ganador
function calculateWinner() {
    const normalizedAngle = (currentAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    const pointerAngle = (1.5 * Math.PI - normalizedAngle + 2 * Math.PI) % (2 * Math.PI);
    const winnerIndex = Math.floor(pointerAngle / arcSize);

    resultDiv.textContent = `🎉 ¡Felicidades Ganastes un ${options[winnerIndex]}!`;
}

drawRoulette();
spinBtn.addEventListener('click', spin);