// Struttura per la palla
export class Ball
{
    constructor(x, y, velx, vely)
    {
        this.x = x;
        this.y = y;
        this.velx = velx;
        this.vely = vely;

        // Crea l'elemento HTML per la palla
        this.element = document.createElement('div');
        this.element.style.width = '20px';
        this.element.style.height = '20px';
        this.element.style.backgroundColor = 'red';
        this.element.style.borderRadius = '50%';
        this.element.style.position = 'absolute';
        this.updatePosition(); // Aggiorna la posizione iniziale della palla

        // Aggiunge la palla al corpo del documento
        document.body.appendChild(this.element);
    }

    // Metodo per aggiornare la posizione della palla
    updatePosition()
    {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }
}

export class Timer
{
    constructor()
    {
        this.deltaTime = 0.016; // Approssimativamente 60 FPS
        this.playerScore = 0;
        this.aiScore = 0;
        this.setsToWin = 2; // Numero di set necessari per vincere
    }
}

// Struttura per la racchetta (IA)
export class Paddle
{
    constructor(x, y, height, speed)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.speed = speed;
        
        // Crea l'elemento HTML per la racchetta
        this.element = document.createElement('div');
        this.element.style.width = '10px';
        this.element.style.height = this.height + 'px';
        this.element.style.backgroundColor = 'black';
        this.element.style.position = 'absolute';
        this.updatePosition(); // Aggiorna la posizione iniziale della racchetta
        
        // Aggiunge la racchetta al corpo del documento
        document.body.appendChild(this.element);
    }

    // Metodo per aggiornare la posizione della racchetta
    updatePosition()
    {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    }

    // Metodo per muovere la racchetta
    move(direction)
    {
        if (direction === 'up')
            this.y -= this.speed;
        else if (direction === 'down')
            this.y += this.speed;
        this.updatePosition(); // Aggiorna la posizione dopo il movimento
    }
}