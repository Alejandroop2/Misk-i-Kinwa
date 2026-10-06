const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

// Opciones de la ruleta Misk'i Kinwa
const options = [
    "Café gratis",
    "Vuelve a intentarlo",
    "Nada",
    "Café gratis",
    "Vuelve a intentarlo",
    "Nada"
];

// Colores para cada sección
const colors = [
    "#f59e0b", // Café gratis - Amarillo/Naranja
    "#8b5cf6", // Vuelve a intentarlo - Morado
    "#f97316", // Nada - Naranja intenso
    "#ef4444", // Café gratis - Rojo
    "#3b82f6", // Vuelve a intentarlo - Azul
    "#10b981"  // Nada - Verde
];

const numOptions = options.length;
const arcSize = (2 * Math.PI) / numOptions;
let startAngle = 0;
let isSpinning = false;

// Dibujar la ruleta
function drawRoulette() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numOptions; i++) {
        const angle = startAngle + i * arcSize;
        
        // Dibujar tajada
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + arcSize);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dibujar texto
        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const textAngle = angle + arcSize / 2;
        ctx.translate(
            centerX + Math.cos(textAngle) * (radius / 1.5),
            centerY + Math.sin(textAngle) * (radius / 1.5)
        );
        ctx.rotate(textAngle + Math.PI / 2);
        ctx.fillText(options[i], 0, 0);
        ctx.restore();
    }
}

// Lógica para girar la ruleta
function spin() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    resultDiv.textContent = "";

    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 3000 + 4000;

    function rotateWheel() {
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            stopRotateWheel();
            return;
        }
        const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
        startAngle += (spinAngle * Math.PI) / 180;
        drawRoulette();
        requestAnimationFrame(rotateWheel);
    }

    rotateWheel();

    function stopRotateWheel() {
        isSpinning = false;
        spinBtn.disabled = false;

        const degrees = (startAngle * 180) / Math.PI + 90;
        const arcd = (arcSize * 180) / Math.PI;
        const index = Math.floor((360 - (degrees % 360)) / arcd) % numOptions;

        resultDiv.textContent = `¡Te tocó: ${options[index]}!`;
    }
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

// Event Listeners e inicialización
spinBtn.addEventListener('click', spin);
drawRoulette();