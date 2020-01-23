const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;
let ballColor = '#0095DD';
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; // puts it in the middle??
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 5;
const brickColumnCount = 8;
let brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 3;

const bricks = [];
// create new brick objects
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    let color;
    switch (c) {
      case 0:
        color = '#C0392B';
        break;

      case 1:
        color = '#E74C3C';
        break;

      case 2:
        color = '#9B59B6';
        break;

      case 3:
        color = '#8E44AD';
        break;

      case 4:
        color = '#2980B9';
        break;

      case 5:
        color = '#3498DB';
        break;

      default:
        color = '#17A589';
        break;
    }

    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
      color,
    };
  }
}

function keyDownHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2; // paddlewidth/2 is so that the
    // movement will be relative to the middle of the paddle
  }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

//     Responsive canvase formula
// 1, listen for changes in window size
// 2, update size of canvas
// 3, notify program about new canvas size
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy; // bounce back
          b.status = 0; // hide the brick
          ballColor = getRandomColor();

          switch (r) {
            case 0:
              score += 100000;
              break;

            case 1:
              score += 10000;
              break;

            case 2:
              score += 1000;
              break;

            case 3:
              score += 100;
              break;

            default:
              score += 10;
          }

          // score += 1;
          if (score === 111110) {
            // brickRowCount * brickColumnCount
            // eslint-disable-next-line no-alert
            alert('You win, congrats!!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

// function drawBall2() {
//   ctx.beginPath();
//   ctx.arc(10 * dx, 30 * dy, ballRadius, 0, Math.PI * 2);
//   ctx.fillStyle = ballColor;
//   ctx.fill();
//   ctx.closePath();
// }

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        if (r % 2 === 0) {
          brickWidth = 74;
        } else {
          brickWidth = 74 / 2;
        }
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = bricks[c][r].color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#2E4053';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  // drawing code
  drawBackground();
  // ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas first
  drawBricks();
  drawBall();
  // drawBall2();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
    ballColor = getRandomColor();
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    ballColor = getRandomColor();
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      ballColor = getRandomColor();
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  x += dx;
  y += dy;
  if (rightPressed) {
    paddleX += 10;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 10;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  requestAnimationFrame(draw); // causes the draw() function to call
// itself over and over again
}


// myVar = setInterval("javascript function", milliseconds);
// var interval = setInterval(draw, 10);
draw();
