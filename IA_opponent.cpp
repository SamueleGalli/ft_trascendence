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

//aggiornare posizione racchetta
void    updateAIPaddle(Paddle &ai, const Ball &ball, float deltaTime, int ScreenSize)
{
    //se la palla si muove verso l'IA
    if (ball.velx > 0)
    {
        if (ball.y < ai.y + ai.height / 2) //se va sopra la racchetta si muove su
            ai.y -= ai.speed * deltaTime;
        else if (ball.y > ai.y + ai.height / 2) //se va sotto la racchetta si muove giu
            ai.y += ai.speed *deltaTime;
    }
    //limita la posizione della racchetta entro i limiti dello schermo (ScreenSize)
    if (ai.y < 0)
        ai.y = 0;
    if (ai.y + ai.height > ScreenSize)
        ai.y = ScreenSize - ai.height;
}

//variabili racchetta e palla placeholder
int main()
{
    int ScreenSize = 480;
    //posizione e velocita iniziali
    Ball ball = {320, 240, -200, 100};
    Paddle ai = {620, 200, 80, 250};

    //velocita aggiornamento frame
    float deltaTime = 0.016f;

    for (int i = 0; i < 1000; ++i)
    {
        //aggiorna la posizione della racchetta
        updateAIPaddle(ai, ball, deltaTime, ScreenSize);
        //posizione racchetta
        std::cout << "Posizione IA : " << ai.y << std::endl;
        //aggiorna la posizione della palla
        ball.x += ball.velx * deltaTime;
        ball.y += ball.vely * deltaTime;
        //se la barda colpisce i bordi la rifletti
        if (ball.y <= 0 || ball.y >= ScreenSize)
            ball.vely = -ball.vely;
    }
    return 0;
}