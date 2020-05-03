const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


const levelNumber = document.querySelector('#level__number');
const levelInput = document.querySelector('#level__input');
const levelButton = document.querySelector('.level__button');




//Карта игры 
const ground = new Image();
ground.src = 'img/ground.png';
//еда для змейки
const foodImg = new Image();
foodImg.src = 'img/food.png';

const box = 32;

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

let snake = [

];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};


let ldir;

levelButton.addEventListener('click', levelDirection);
document.addEventListener('keydown', levelDirection);


//Функция для вывода значение в input
function levelDirection(event) {
    if (event.keyCode == 13 || 'click') {
        levelInputValue = levelInput.value;
        levelInput.value = '';
        ldir = levelInputValue;
    }

    if (ldir == 1) {
        game == setInterval(drawGame, 400);
        levelNumber.innerHTML = 1;
    } else if (ldir == 2) {
        game == setInterval(drawGame, 300);
        console.log('2 level');
        levelNumber.innerHTML = 2;
    } else if (ldir == 3) {
        game == setInterval(drawGame, 200);
        levelNumber.innerHTML = 3;
    } else if (ldir == 4) {
        game == setInterval(drawGame, 100);
        levelNumber.innerHTML = 4;
    } else if (ldir == 5) {
        alert('Самоубийца!');
        game == setInterval(drawGame, 60);
        levelNumber.innerHTML = 5;
    } else if (ldir > 5) {
        alert('Ошибка, такого уровня нет!');
    } else if (ldir == String) {
        alert('Ошибка, такого уровня нет!');
    }
};



document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if (event.keyCode == 65 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 87 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 68 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 83 && dir != 'up')
        dir = 'down';
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            score = 'Game Over'
            clearInterval(game);
            window.location.reload();
        }
    }
}


//игра
drawGame = () => {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y);


    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'yellow';
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 2.5, box * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY > box * 17 || snakeY < 3 * box) {
        score = 'Game Over';
        clearInterval(game);
        window.location.reload();
    }

    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };



    eatTail(newHead, snake);


    snake.unshift(newHead);
};


let game = setInterval(drawGame, 400);