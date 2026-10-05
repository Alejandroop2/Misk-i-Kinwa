<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Misk'i Kinwa - Ruleta Interactiva</title>
  <style>
    /* 1. CONFIGURACIÓN DEL FONDO AMPLIADO */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      /* Fondo dinámico en degradado completo para dar más estilo */
      background: radial-gradient(circle at center, #1e1e38 0%, #0d0d1a 100%);
      color: #ffffff;
      padding: 20px;
    }

    /* 2. CONTENEDOR PRINCIPAL / TARJETA */
    .card-container {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 30px 40px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 480px;
      width: 100%;
    }

    .title {
      font-size: 2rem;
      font-weight: 800;
      color: #ff3366;
      margin-bottom: 25px;
      text-shadow: 0 0 15px rgba(255, 51, 102, 0.4);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* 3. RULETA Y FLECHA INDICADORA */
    .wheel-wrapper {
      position: relative;
      width: 320px;
      height: 320px;
      margin-bottom: 30px;
    }

    /* Flecha indicadora superior */
    .pointer {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;
      border-top: 25px solid #ff0055;
      z-index: 10;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
    }

    canvas {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.6);
      transition: transform 4s cubic-bezier(0.15, 0.99, 0.35, 1);
    }

    /* 4. BOTÓN Y MENSAJE DE RESULTADO */
    .btn-spin {
      background: linear-gradient(135deg, #ff0055, #ff5500);
      color: #ffffff;
      border: none;
      padding: 14px 36px;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(255, 0, 85, 0.4);
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .btn-spin:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 12px 25px rgba(255, 0, 85, 0.6);
    }

    .btn-spin:active {
      transform: translateY(1px);
    }

    .result-message {
      margin-top: 20px;
      font-size: 1.1rem;
      font-weight: 600;
      color: #00f2fe;
      min-height: 30px;
      text-align: center;
      text-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
    }
  </style>
</head>
<body>

  <div class="card-container">
    <h1 class="title">💜 Misk'i Kinwa</h1>

    <div class="wheel-wrapper">
      <div class="pointer"></div>
      <canvas id="wheelCanvas" width="400" height="400"></canvas>
    </div>

    <button class="btn-spin" id="spinBtn">GIRAR RULETA</button>

    <div class="result-message" id="result"></div>
  </div>

  <script>
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const resultDiv = document.getElementById('result');

    // OPCIONES Y PALETA DE COLORES PERSONALIZABLE
    const options = [
      { label: 'Opción 1', color: '#FF5722' },
      { label: 'Opción 2', color: '#00BCD4' },
      { label: 'Opción 3', color: '#4CAF50' },
      { label: 'Opción 4', color: '#FFC107' },
      { label: 'Opción 5', color: '#E91E63' },
      { label: 'Opción 6', color: '#FF9800' }
    ];

    const numOptions = options.length;
    const arcSize = (2 * Math.PI) / numOptions;
    let currentRotation = 0;
    let isSpinning = false;

    // Dibujar la ruleta en el Canvas
    function drawWheel() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = canvas.width / 2 - 10;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      options.forEach((opt, index) => {
        const startAngle = index * arcSize - Math.PI / 2;
        const endAngle = startAngle + arcSize;

        // Dibujar sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = opt.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Dibujar texto inclinado
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arcSize / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Poppins, sans-serif';
        ctx.fillText(opt.label, radius - 30, 6);
        ctx.restore();
      });
    }

    drawWheel();

    // Lógica para girar la ruleta
    spinBtn.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      resultDiv.textContent = '';

      // Vueltas aleatorias + ángulo final
      const randomExtraDegrees = Math.floor(Math.random() * 360);
      const totalDegrees = 1800 + randomExtraDegrees; // 5 vueltas completas mínimo
      currentRotation += totalDegrees;

      canvas.style.transform = rotate(${currentRotation}deg);

      // Determinar ganador al finalizar animación (4 segundos)
      setTimeout(() => {
        isSpinning = false;
        
        // Calcular la opción ganadora
        const actualDegrees = currentRotation % 360;
        const winningIndex = Math.floor((360 - (actualDegrees % 360)) / (360 / numOptions)) % numOptions;
        
        const winner = options[winningIndex].label;
        resultDiv.textContent = 🎉 ¡Felicidades! Ganaste ${winner};
      }, 4000);
    });
  </script>
</body>
</html>
