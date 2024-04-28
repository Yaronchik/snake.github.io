// Создаем переменные игрового поля и делаем 2д.
const cvs = document.getElementById("canvas");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Указываем путь к игровому полю и еде.
const ground = new Image();   // Вызываем поле
ground.src = "img/Ground.png" // Путь к картинке

const foodImg = new Image();     // Вызываем еду
foodImg.src = "img/Food.png"     // Путь к картинке еды

// Создаем переменную где указываем размер одной клетки
// И переменную очков.
let box = 32;  // Размер одного квадратика на карте.
let score = 0; // Очки всегда с нуля отчет введут.

// Создаем обработчик событий.
document.addEventListener('keydown', direction);

// Назначем кнопки
let dir;
function direction(event) {
    if(event.keyCode == 37 && dir != 'right')
    dir = 'left';
    else if(event.keyCode == 38 && dir != 'down')
    dir = 'up';
    else if(event.keyCode == 39 && dir != 'left')
    dir = 'right';
    else if(event.keyCode == 40 && dir != 'up')
    dir = 'down';
    else if(event.keyCode == 65 && dir != 'right')
    dir = 'left';
    else if(event.keyCode == 87 && dir != 'down')
    dir = 'up';
    else if(event.keyCode == 68 && dir != 'left')
    dir = 'right';
    else if(event.keyCode == 83 && dir != 'up')
    dir = 'down';
}

// Рисуем объекты внутри канваса
function drawGame () {
    ctx.drawImage(ground, 0, 0)

    ctx.drawImage(foodImg, food.x, food.y) // Рисуем еду в случайном месте.
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'red'; // Нарисовали змею и дали ее зеленый цвет.
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // Задали кординаты змеи.
    }
    // Рисуем счет.
    ctx.fillStyle = 'white'; // Цвет
    ctx.font = '50px Arial'; // Шрифт
    ctx.fillText('Score: ' + score, box * 2.5, box * 1.7); // Координаты счета

    // Рисуем Game over
    function gameOver () {
            ctx.font = '100px Arial';
            ctx.fillStyle = 'black';
            
            ctx.fillText('Game Over', box * 1.5, box * 11);
        };
    

    // Рисуем передвижение змейки.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Логика того что змея сьела еду.
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = { // Новые координаты еды
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop();
    }

    // Условия проигрыша.
    if (snakeX < box || snakeX >box * 17 
        || snakeY < 3 * box || snakeY > box * 17){
        clearInterval(game);
        gameOver(game);
    };
    // Второе условие проигрыша когда змея ест свое тело.
    function eatTail(head, arr) {
        for(let i = 0; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y){
            clearInterval(game)
            gameOver(game);
        }
    }
}

    // Показываем когда надо добовлять тело змеи    
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    // Добовлем тело змеи.
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    // Вызывваем функцию когда змея ест себя же
    eatTail(newHead, snake);
    
    snake.unshift(newHead);
};

// Создаем интервал отображения игрового поля!
let game = setInterval(drawGame, 120);

// Создаем рандомное место под еду.
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};

// Создаем объект для отображения змейки и добовления тела змеии.
let snake = [];
snake [0] = {
    x: 9 * box,
    y: 10 * box
};

