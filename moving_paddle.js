
export function move_paddle()
{

    // Aggiunge eventi per il movimento della racchetta sinistra
    document.addEventListener('keydown', (event) =>
    {
        if (event.key === 'w')
            leftPaddle.move('up'); // Muove la racchetta su
        else if (event.key === 's')
            leftPaddle.move('down'); // Muove la racchetta giù
    });

    // Aggiunge eventi per il movimento della racchetta destra (IA)
    document.addEventListener('keydown', (event) =>
    {
        if (event.key === 'ArrowUp')
            rightPaddle.move('up'); // Muove la racchetta su
        else if (event.key === 'ArrowDown')
            rightPaddle.move('down'); // Muove la racchetta giù
    });
}