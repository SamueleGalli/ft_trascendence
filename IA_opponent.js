/*
creare player base
creare area con player e ia
aggiungere possbilita di gioco*/
// Struttura per la palla
class Ball
{
    constructor(x, y, velx, vely)
    {
        this.x = x;
        this.y = y;
        this.velx = velx;
        this.vely = vely;
    }
}

// Struttura per la racchetta (IA)
class Paddle
{
    constructor(x, y, height, speed)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.speed = speed;
    }
}

// Previsione della posizione Y della palla
function predictBallY(ball, screenSize, screenHeight)
{
    // Se la palla si sta muovendo verso la IA
    if (ball.velx > 0)
        {
            // Tempo necessario affinché la palla raggiunga la IA
            let timeToReachAI = (screenSize - ball.x) / ball.velx;
        // Prevedi la posizione Y della palla in quel momento
        let futureBallY = ball.y + ball.vely * timeToReachAI;
        
        // Se la palla supera i bordi dello schermo, calcola il rimbalzo
        while (futureBallY < 0 || futureBallY > screenHeight)
            {
                if (futureBallY < 0)
            {
                // La palla rimbalza dal bordo superiore
                futureBallY = -futureBallY;
            }
            else if (futureBallY > screenHeight)
                {
                    // La palla rimbalza dal bordo inferiore
                    futureBallY = 2 * screenHeight - futureBallY;
                }
            }
            return futureBallY;
        }
        // Altrimenti, restituisci la posizione attuale della palla
        return ball.y;
}

// Funzione per aggiornare la posizione della racchetta IA
function updateAIPaddle(ai, ball, deltaTime, screenHeight, screenSize, time) {
    time.value += deltaTime;
    
    // Se è passato un secondo, inizia ad aggiornare
    if (time.value >= 1.0) {
        time.value = 0;
        
        // Previsione posizione palla
        let targetY = predictBallY(ball, screenSize, screenHeight);
        
        // Distanza tra la posizione della palla prevista e il centro della racchetta
        let distance = targetY - (ai.y + ai.height / 2);
        
        // Decidi la direzione del movimento
        let direction = distance > 0 ? 1.0 : -1.0;
        
        // Muovi la racchetta basandoti sulla velocità e sulla distanza
        ai.y += direction * Math.min(ai.speed, Math.abs(distance));
        
        // Limita il movimento della racchetta all'interno dello schermo
        if (ai.y < 0) ai.y = 0;
        if (ai.y + ai.height > screenHeight) ai.y = screenHeight - ai.height;
        
        console.log("Posizione IA:", ai.y);
    }
}

// Simulazione del gioco
function simulateGame() {
    const screenHeight = 480;
    const screenSize = 620;
    
    // Inizializza la palla e la racchetta IA
    let ball = new Ball(320, 240, -200, 100);
    let ai = new Paddle(620, 200, 80, 250);
    
    // Variabili per il tempo e il deltaTime
    let deltaTime = 0.016; // Approssimativamente 60 FPS
    let time = { value: 0 };
    
    // Simulazione di 1000 frame
    for (let i = 0; i < 1000; i++) {
        // Aggiorna la posizione della racchetta IA
        updateAIPaddle(ai, ball, deltaTime, screenHeight, screenSize, time);
        
        // Aggiorna la posizione della palla
        ball.x += ball.velx * deltaTime;
        ball.y += ball.vely * deltaTime;
        
        // Rimbalzo della palla ai bordi dello schermo
        if (ball.y <= 0 || ball.y >= screenHeight) {
            ball.vely = -ball.vely;
        }
    }
}

// Avvia la simulazione
simulateGame();