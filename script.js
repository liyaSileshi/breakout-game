/* eslint-disable no-shadow */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 2;
// let dy = -2;
// const ballRadius = 10;
// let ballColor = '#0095DD';


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

// const ball = {
//   x: canvas.width / 2,
//   y: canvas.height - 30,
//   dx: 2,
//   dy: -2,
//   radius: 10,
//   color: 'red',
//   move() {
//     this.x += this.dx;
//     this.y += this.dy;
//   },
// };

class Ball {
  constructor(x, y, radius = 10, color = '#0095DD') {
    this.radius = radius;
    this.color = color;
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}


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
const ball = new Ball(canvas.width / 2, canvas.height - 30);

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
          ball.dy = -ball.dy; // bounce back
          b.status = 0; // hide the brick
          ball.color = getRandomColor();

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
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color;
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
  if (ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width - ball.radius) {
    ball.dx = -ball.dx;
    // ball.move();
    ball.color = getRandomColor();
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
    ball.color = getRandomColor();
  } else if (ball.y + ball.dy > canvas.height - ball.radius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
      ball.color = getRandomColor();
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
        // clearInterval(interval); // Needed for Chrome to end game
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  // ball.x += ball.dx;
  // ball.y += ball.dy;
  ball.move();
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
