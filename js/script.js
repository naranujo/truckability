const totalDistance = 1350; // Distancia total a recorrer en píxeles
const wheelRadius = 50; // Radio de la rueda en píxeles
const segundos = 6; // Duración de la animación en segundos
const frames = segundos * 24; // Número total de cuadros
const wheel = document.getElementById('wheel');
const gifContainer = document.getElementById('gifContainer');
const text = document.getElementById('text');
const startButton = document.getElementById('startButton');

// Calcular la circunferencia de la rueda
const circumference = 2 * Math.PI * wheelRadius;

// Calcular los grados que debe rotar en cada cuadro
const degreesPerFrame = (totalDistance / circumference) * 360 / frames;

let currentDistance = 0; // Distancia recorrida
let currentFrame = 0; // Contador de cuadros

// Crear el GIF
const gif = new GIF({
    workers: 2,
    quality: 10,
    width: 100, // Ancho del GIF
    height: 100 // Alto del GIF
});

function empujarTelon(contador) {
    const telon = document.getElementById('telon');
    telon.style.left = `${contador}px`;
}

function resetAnimation() {
    // Reiniciar variables y estilos
    currentDistance = 0;
    currentFrame = 0;
    wheel.style.transform = `rotate(0deg)`; // Reiniciar la rotación
    wheel.style.left = `0px`; // Reiniciar la posición horizontal
    gifContainer.style.display = "none"; // Ocultar el GIF
    document.getElementById('telon').style.left = '50px'; // Reiniciar telón
    startButton.innerText = "Reiniciar"; // Cambiar texto del botón
}

function animateWheel() {
    if (currentFrame < frames) {
        currentDistance += degreesPerFrame; // Incrementar distancia
        wheel.style.transform = `rotate(${currentDistance}deg)`; // Aplicar rotación
        const wheelPosition = (currentFrame / frames) * totalDistance; // Posición de la rueda
        wheel.style.left = `${wheelPosition}px`; // Desplazamiento horizontal de la rueda
        wheel.style.display = "block"; // Mostrar la rueda

        // Capturar el cuadro actual
        gif.addFrame(wheel, { delay: 1000 / 24, copy: true }); 
        empujarTelon(wheelPosition + 50); // Empujar el telón
        currentFrame++; // Incrementar el cuadro
        requestAnimationFrame(animateWheel); // Llamar al siguiente cuadro
    } else {
        // Hacer que la rueda salga del plano al final
        wheel.style.left = `${totalDistance + 0}px`; // Mover la rueda fuera del plano
        gif.on('finished', function(blob) {
            // Crear un URL para el GIF y mostrarlo
            const url = URL.createObjectURL(blob);
            gifContainer.innerHTML = `<img src="${url}" alt="GIF de Rueda">`;
            gifContainer.style.display = "block"; // Mostrar el GIF
        });
        gif.render(); // Renderizar el GIF
    }
}

// Iniciar la animación
startButton.addEventListener('click', function() {
    resetAnimation(); // Reiniciar antes de comenzar la animación
    // Agregar sonido
    var audio = new Audio('./assets/camion.mov');
    audio.play();
    animateWheel();
});
