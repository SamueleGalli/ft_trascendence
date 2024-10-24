import { Ball, Paddle, Timer } from './ball_and_paddle.js';
import { move_paddle } from './moving_paddle.js';
import { updateBall } from './win_lose.js';
import { updateAIPaddle } from './IA.js';

// Inizializza la palla e le racchette
const ball = new Ball(window.innerWidth / 2 - 10, window.innerHeight / 2 - 10, 2, 2);    
const leftPaddle = new Paddle(0, window.innerHeight / 2 - 50, 100, 5);   
const rightPaddle = new Paddle(window.innerWidth - 10, window.innerHeight / 2 - 50, 100, 5); 
export function simulateGame()
{
    const timer = new Timer();
    timer.setsToWin = 3;

    const screenHeight = 480; // Imposta l'altezza dello schermo
    const screenSize = 620;    // Imposta la larghezza dello schermo
    // Rimuovi il titolo e il pulsante
    const title = document.getElementById('gameTitle');
    const button = document.getElementById('aiButton');
    if (title)
        title.remove(); // Rimuove il titolo se esiste
    if (button)
        button.remove(); // Rimuove il pulsante se esiste*/
    let time = { value: 0 };
    updateAIPaddle(rightPaddle, timer, ball, screenHeight, screenSize, time);
    updateBall(ball, timer, leftPaddle, rightPaddle, screenHeight, window.innerWidth);// Rimbalzo della palla ai bordi dello schermo
    requestAnimationFrame(simulateGame);
}

move_paddle(); // Se necessario, chiama questa funzione prima di avviare la simulazione
requestAnimationFrame(simulateGame);

window.simulateGame = simulateGame;