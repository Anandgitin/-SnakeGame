// Snake Game

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snakeSize = 10; // size of the snake and food
let snake = [{ x: 50, y: 50 }]; // initial snake position
let food = { x: 100, y: 100 }; // initial food position
let direction = 'RIGHT';
let score = 0;
let level = 1;
let speed = 100; // initial speed
let gameOver = false;

// Draw Snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

// Draw Food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Update Snake Position
function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= snakeSize;
    if (direction === 'DOWN') head.y += snakeSize;
    if (direction === 'LEFT') head.x -= snakeSize;
    if (direction === 'RIGHT') head.x += snakeSize;

    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        increaseLevel();
        generateFood();
    } else {
        snake.pop(); // remove tail
    }
}

// Generate New Food Position
function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize
    };
}

// Check for Collisions
function checkCollision() {
    const head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

// Increase Level (faster game)
function increaseLevel() {
    if (score % 50 === 0) {
        level++;
        speed = Math.max(50, speed - 10); // speed up as level increases
        document.getElementById('level').innerText = `Level: ${level}`;
    }
}

// Draw Everything on Canvas
function drawGame() {
    if (gameOver) {
        document.getElementById('gameOverMessage').innerText = 'Game Over! Press Restart to play again';
        document.getElementById('restartButton').style.display = 'block';
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    document.getElementById('score').innerText = `Score: ${score}`;

    moveSnake();
    checkCollision();

    setTimeout(drawGame, speed); // Refresh game frame
}

// Control Snake Movement
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Restart Game
document.getElementById('restartButton').addEventListener('click', () => {
    snake = [{ x: 50, y: 50 }];
    direction = 'RIGHT';
    score = 0;
    level = 1;
    speed = 100;
    gameOver = false;
    document.getElementById('gameOverMessage').innerText = '';
    document.getElementById('restartButton').style.display = 'none';
    drawGame();
});

// Start the Game
drawGame();
