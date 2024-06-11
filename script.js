const ball = document.getElementById('ball');
let ballX = 390;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;

const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
let leftPaddleY = 150;
let rightPaddleY = 150;

let P1_Score = document.querySelector(".P1_Score");
let P2_Score = document.querySelector(".P2_Score");
let Message = document.querySelector('.Message');

const scoreDisplayP1 = document.querySelector('.P1_Score');
const scoreDisplayP2 = document.querySelector('.P2_Score');
const messageDisplay = document.querySelector('.Message');

let P1 = 0;
let P2 = 0;
let gameStarted = false;
const winningScore = 10;

document.addEventListener('keydown',function(event){
    if(!gameStarted && event.key === 'Enter'){
        gameStarted = true;
        Message.style.display = 'none';
        update();
    }
    if(gameStarted){
        if (event.key === 'w' && leftPaddleY > 0) {
            leftPaddleY -= 20;
        } else if (event.key === 's' && leftPaddleY < 300) {
            leftPaddleY += 20;
        } else if (event.key === 'ArrowUp' && rightPaddleY > 0) {
            rightPaddleY -= 20;
        } else if (event.key === 'ArrowDown' && rightPaddleY < 300) {
            rightPaddleY += 20;
        }
    }
});

function update() {
    if(!gameStarted)
        return;
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY >= 380 || ballY <= 0) {
        ballSpeedY = -ballSpeedY;
    }

    if ((ballX <= 30 && ballX >= 10 && ballY >= leftPaddleY && ballY <= leftPaddleY + 100) ||
        (ballX >= 750 && ballX <= 770 && ballY >= rightPaddleY && ballY <= rightPaddleY + 100)) {
        ballSpeedX = -ballSpeedX;
    } 
    if (ballX >= 800) {
        P1++;
        P1_Score.textContent = P1;
        checkGameOver();
        resetBall();
    }
    else if(ballX <= 0) {
        P2++;
        P2_Score.textContent = P2;
        checkGameOver();
        resetBall();
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    leftPaddle.style.top = leftPaddleY + 'px';
    rightPaddle.style.top = rightPaddleY + 'px';

    requestAnimationFrame(update);
}

function resetBall(){
    ballX = 390;
    ballY = 290;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 2;
}

function checkGameOver(){
    if(P1>=winningScore || P2>=winningScore){
        gameOver();
    }
}

function resetGame(){
    ballX = 390;
    ballY = 190;
    ballSpeedX = 2;
    ballSpeedY = 2;
    leftPaddleY = 150;
    rightPaddleY = 150;
    P1_ScoreValue = 0;
    P2_ScoreValue = 0;
    P1_Score.textContent = P1_ScoreValue;
    P2_Score.textContent = P2_ScoreValue;
    Message.style.display = 'block';
    Message.textContent = 'Press Enter to Start!';
    gameStarted = false;
}

function gameOver() {
    alert('Game Over!');
    resetGame();
}

update(); // Start the game loop
