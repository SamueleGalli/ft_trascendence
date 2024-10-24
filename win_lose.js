// Funzione per gestire la fine della partita
function endGame(timer) 
{
    // Mostra un messaggio di fine partita
    alert(`Fine partita! Punteggio: Giocatore ${timer.playerScore} - IA ${timer.aiScore}`);

    // Reset dei punteggi
    timer.playerScore = 0;
    timer.aiScore = 0;
}

// Funzione per resettare la palla
function resetBall(ball, screenWidth, screenHeight) 
{
    ball.x = screenWidth / 2; // Reset della posizione X
    ball.y = screenHeight / 2; // Reset della posizione Y
    ball.velx = 2; // Reset della velocità (puoi cambiare la direzione se necessario)
    ball.vely = 2; // Reset della velocità
}

export function updateBall(ball, timer, leftPaddle, rightPaddle, screenHeight, screenWidth) 
{
    // Controlla se la palla colpisce il bordo superiore o inferiore dello schermo
    if (ball.y <= 0 || ball.y >= screenHeight) 
    {
        ball.vely = -ball.vely; // Rimbalza verticalmente
    }

    // Controlla la collisione con la racchetta sinistra
    if (ball.x <= leftPaddle.x + 10 && ball.y > leftPaddle.y && ball.y < leftPaddle.y + leftPaddle.height) 
    {
        ball.velx = -ball.velx; // Rimbalza orizzontalmente
    }

    // Controlla la collisione con la racchetta destra
    if (ball.x + 20 >= rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + rightPaddle.height) 
    {
        ball.velx = -ball.velx; // Rimbalza orizzontalmente
    }

    // Controlla se la palla esce dallo schermo a sinistra o a destra
    if (ball.x < 0) 
    {
        // Il giocatore ha perso il punto
        timer.aiScore++;
        resetBall(ball, screenWidth, screenHeight); // Reset della palla
    } 
    else if (ball.x > screenWidth) 
    {
        // L'IA ha perso il punto
        timer.playerScore++;
        resetBall(ball, screenWidth, screenHeight); // Reset della palla
    }

    // Controlla se un giocatore ha vinto la partita
    if (timer.playerScore === timer.setsToWin || timer.aiScore === timer.setsToWin) 
    {
        endGame(); // Funzione per gestire la fine del gioco
    }
}