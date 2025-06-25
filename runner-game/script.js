const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const livesText = document.getElementById("lives");
const scoreText = document.getElementById("score");
const gameoverText = document.getElementById("gameover");

let lives = 3;
let score = 0;
let gameInterval;
let obstacleSpeed = 2;

let playerX = 135;
let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function movePlayer() {
  if (keys["ArrowLeft"] && playerX > 0) playerX -= 5;
  if (keys["ArrowRight"] && playerX < 270) playerX += 5;
  player.style.left = playerX + "px";
}

function moveObstacle() {
  let y = parseInt(obstacle.style.top);
  if (isNaN(y)) y = 0;
  y += obstacleSpeed;
  obstacle.style.top = y + "px";

  if (y > 400) {
    resetObstacle();
    score++;
    scoreText.textContent = score;
    if (score % 5 === 0) obstacleSpeed += 0.5;
  }

  // 衝突判定
  const px = playerX;
  const py = 370;
  const ox = parseInt(obstacle.style.left);
  const oy = y;

  if (
    px < ox + 30 &&
    px + 30 > ox &&
    py < oy + 30 &&
    py + 30 > oy
  ) {
    lives--;
    livesText.textContent = lives;
    resetObstacle();

    if (lives <= 0) {
      clearInterval(gameInterval);
      gameoverText.classList.remove("hidden");
    }
  }
}

function resetObstacle() {
  obstacle.style.top = "0px";
  obstacle.style.left = Math.floor(Math.random() * 270) + "px";
}

function gameLoop() {
  movePlayer();
  moveObstacle();
}

function startGame() {
  lives = 3;
  score = 0;
  obstacleSpeed = 2;
  playerX = 135;
  player.style.left = playerX + "px";
  livesText.textContent = lives;
  scoreText.textContent = score;
  gameoverText.classList.add("hidden");
  resetObstacle();
  gameInterval = setInterval(gameLoop, 20);
}

startGame();
