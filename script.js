* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    /* FONDO DE UNA SOLA IMAGEN COMPLETA */
    background-image: url('https://elpopular.cronosmedia.glr.pe/original/2022/10/08/6341d5bc2be9491dc519eab0.jpg'); /* Cambia esto por el nombre exacto de tu archivo en GitHub */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow-x: hidden;
}

/* --- TARJETA AZUL CENTRADA --- */
.main-container {
    text-align: center;
    background: rgba(22, 33, 62, 0.90); /* Fondo azul oscuro semitransparente */
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    max-width: 420px;
    width: 90%;
    backdrop-filter: blur(5px);
    margin: 20px;
}

h1 {
    margin-bottom: 20px;
    color: #f1f5f9;
    font-size: 26px;
    font-weight: bold;
}

.roulette-container {
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
}

.pointer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    color: #ff0055;
    z-index: 10;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

#rouletteCanvas {
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    max-width: 100%;
    height: auto;
}

button {
    background: linear-gradient(135deg, #e94560, #d6336c);
    color: white;
    border: none;
    padding: 12px 35px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    transition: transform 0.2s, background-color 0.2s;
    margin-top: 15px;
    box-shadow: 0 4px 15px rgba(233, 69, 96, 0.4);
}

button:hover {
    transform: scale(1.05);
}

button:active {
    transform: scale(0.95);
}

#result {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    color: #00fff5;
    min-height: 30px;
}