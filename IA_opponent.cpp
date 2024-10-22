/*  SUBJECT
Major module: Introduce an AI Opponent.
In this major module, the objective is to incorporate an AI player into the game.
Notably, the use of the A* algorithm is not permitted for this task. Key features
and goals include:
◦ Develop an AI opponent that provides a challenging and engaging gameplay
experience for users.
◦ The AI must replicate human behavior, meaning that in your AI implemen-
tation, you must simulate keyboard input. The constraint here is that the AI
can only refresh its view of the game once per second, requiring it to anticipate
bounces and other actions.
The AI must utilize power-ups if you have chosen to implement the
Game customization options module.
◦ Implement AI logic and decision-making processes that enable the AI player
to make intelligent and strategic moves.
◦ Explore alternative algorithms and techniques to create an effective AI player
without relying on A*.
◦ Ensure that the AI adapts to different gameplay scenarios and user interac-
tions.
Attention: You will need to explain in detail how your AI functions
during your evaluation. Creating an AI that does nothing is strictly
prohibited; it must have the capability to win occasionally.
This major module aims to enhance the game by introducing an AI opponent that
adds excitement and competitiveness without relying on the A* algorithm.
*/
#include <iostream>
#include <cmath>

//palla
struct Ball
{
    float x, y; //coordinta x,y
    float velx, vely; //velocita x,y
};

//racchetta
struct Paddle
{
    float x, y; //coordinta x,y
    float height; //altezza
    float speed; //velocita
};

float   predictBallY(const Ball &ball, int ScreenSize, int Screenheight)
{
    //palla sta andando verso la ia in largezza
    if (ball.velx > 0)
    {
        //tempo neccessario per cui la palla raggiunge l'IA
        float timeToReachAI = (ScreenSize - ball.x) / ball.velx;

        //prevedi la posizone Y della palla in quel momento
        float futureBallY = ball.y + ball.vely * timeToReachAI;

        // Se la palla supera i bordi superiori o inferiori dello schermo, calcola il rimbalzo
        while (futureBallY < 0 || futureBallY > Screenheight)
        {
            if (futureBallY < 0)
            {
                // La palla rimbalza dal bordo superiore
                futureBallY = -futureBallY;
            }
            else if (futureBallY > Screenheight)
            {
                // La palla rimbalza dal bordo inferiore
                futureBallY = 960 - futureBallY;
            }
        }
        //posizione prevista palla
        return futureBallY;
    }
    //posizione corrente
    return ball.y;
}

//aggiornare posizione racchetta
void    updateAIPaddle(Paddle &ai, const Ball &ball, float deltaTime, int Screenheight, int ScreenSize, float &time)
{
    time +=  deltaTime;

    //se il tempo arriva a un secondo inizio a aggiornare il tutto
    if (time >= 1.0f)
    {
        time = 0;
        //previsione posizione palla
        float targety = predictBallY(ball, ScreenSize, Screenheight);
        // Calcola la distanza tra la posizione prevista della palla e il centro della racchetta
        float distance = targety - (ai.y + ai.height / 2);
        float direction = 0;
        //in base alla distanza vado o su o giu
        if (distance > 0)
            distance = 1.0f;
        else
            distance = -1.0f;
        // Muovi la racchetta in base alla velocità e alla distanza, senza superare la velocità massima
        ai.y += direction * std::min(ai.speed, std::abs(distance));

        //limita racchetta all'interno dello schermo
        if (ai.y < 0)
            ai.y = 0;
        if (ai.y + ai.height > Screenheight)
            ai.y = Screenheight - ai.height;
        //posizione racchetta
        std::cout << "Posizione IA : " << ai.y << std::endl;
    }
}

//variabili racchetta e palla placeholder
int main()
{
    int Screenheight = 480;
    int screenSize = 620;
    //posizione e velocita iniziali
    Ball ball = {320, 240, -200, 100};
    Paddle ai = {620, 200, 80, 250};

    //velocita aggiornamento frame
    float deltaTime = 0.016f;
    float time = 0.0f;

    for (int i = 0; i < 1000; ++i)
    {
        //aggiorna la posizione della racchetta
        updateAIPaddle(ai, ball, deltaTime, Screenheight, screenSize, time);
        //aggiorna la posizione della palla
        ball.x += ball.velx * deltaTime;
        ball.y += ball.vely * deltaTime;
        //se la barda colpisce i bordi la rifletti
        if (ball.y <= 0 || ball.y >= Screenheight)
            ball.vely = -ball.vely;
    }
    return 0;
}