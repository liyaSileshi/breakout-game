/* eslint-disable max-classes-per-file */
/* eslint-disable no-shadow */
// const canvas = document.getElementById('myCanvas');
// const ctx = canvas.getContext('2d');
// let paddleX = (canvas.width - paddleWidth) / 2; // puts it in the middle??
// let rightPressed = false;
// let leftPressed = false;
// const brickRowCount = 5;
// const brickColumnCount = 8;
// let brickWidth = 75;
// const brickHeight = 20;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// let score = 0;
// let lives = 3;


const canvas = document.getElementById('myCanvas');

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

class Brick {
  constructor(x, y, w = 74, h = 20, color = 'blue') {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.color = color;
    this.width = w;
    this.height = h;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(x, y, w = 75, h = 10, color = 'blue') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = w;
    this.height = h;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

class Background {
  constructor(color = '#2E4053') {
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Score {
  constructor(x, y, color, font) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }

  update(points) {
    this.score += points;
  }

  reset() {
    this.score = 0;
  }
}

class Lives {
  constructor(x, y, color, font) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.lives = 3;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.lives -= 1;
  }

  reset() {
    this.lives = 3;
  }
}

class Game {
  constructor() {
    this.brickWidth = 75;
    this.brickHeight = 20;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.rightPressed = false;
    this.leftPressed = false;
    this.brickRowCount = 5;
    this.brickColumnCount = 8;
    this.ctx = canvas.getContext('2d');
    // this.ball = new Ball(50, 50);
    this.ball = new Ball(canvas.width / 2, canvas.height - 30);
    this.lives = new Lives(canvas.width - 65, 20, '#0095DD', '16px Arial');
    this.score = new Score(8, 20, '#0095DD', '16px Arial');
    this.background = new Background();
    this.paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10);

    this.bricks = [];
    // create new brick objects
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r += 1) {
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

        if (r % 2 === 0) {
          this.brickWidth = 74;
        } else {
          this.brickWidth = 74 / 2;
        }
        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
        this.bricks[c][r] = new Brick(brickX, brickY, this.brickWidth, this.brickHeight, color);
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
      // console.log(this.rightPressed);
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
      // console.log(this.leftPressed);
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      // paddlewidth/2 is so that the
      // movement will be relative to the middle of the paddle
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (this.ball.x > b.x && this.ball.x < b.x + this.brickWidth && this.ball.y > b.y && this.ball.y < b.y + this.brickHeight) {
            this.ball.dy = -this.ball.dy; // bounce back
            b.status = 0; // hide the brick
            this.ball.color = this.getRandomColor();
            switch (r) {
              case 0:
                this.score.update(100000);
                break;
              case 1:
                this.score.update(10000);
                break;
              case 2:
                this.score.update(1000);
                break;
              case 3:
                this.score.update(100);
                break;
              default:
                this.score.update(10);
            }

            if (this.score.score >= 111110) {
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

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c += 1) {
      for (let r = 0; r < this.brickRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(this.ctx);
        }
      }
    }
  }

  draw() {
    // drawing code
    this.background.render(this.ctx);
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas first
    this.drawBricks();
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.score.render(this.ctx);
    this.lives.render(this.ctx);
    this.collisionDetection();

    if (this.ball.x + this.ball.dx < this.ball.radius || this.ball.x + this.ball.dx > canvas.width - this.ball.radius) {
      this.ball.dx = -this.ball.dx;
      // ball.move();
      this.ball.color = this.getRandomColor();
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
      this.ball.color = this.getRandomColor();
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
        this.ball.color = this.getRandomColor();
      } else {
        this.lives.loseLife();
        if (this.lives.lives < 1) {
          // eslint-disable-next-line no-alert
          alert('GAME OVER');
          document.location.reload();
          // clearInterval(interval); // Needed for Chrome to end game
        } else {
          this.ball.x = canvas.width / 2;
          this.ball.y = canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = (canvas.width - this.paddle.width) / 2;
        }
      }
    }
    this.ball.move();
    console.log(this.rightPressed);
    if (this.rightPressed) {
      console.log('right');
      this.paddle.x += 10;
      if (this.paddle.x + this.paddle.width > canvas.width) {
        this.paddle.x = canvas.width - this.paddle.width;
      }
    } else if (this.leftPressed) {
      this.paddle.x -= 10;
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    }
    requestAnimationFrame(this.draw); // causes the draw() function to call
    // let interval = setInterval(this.draw, 10);
  // itself over and over again
  }
}


const game = new Game();
// const ctxt = canvas.getContext('2d');
// console.log(game.background.render(ctxt));
document.addEventListener('keydown', game.keyDownHandler, false);
document.addEventListener('keyup', game.keyUpHandler, false);
document.addEventListener('mousemove', game.mouseMoveHandler, false);
game.draw();

// window.onload = function(){
//   canvas = document.getElementById("myCanvas");
//   game.draw();
// };

// const ball = new Ball(canvas.width / 2, canvas.height - 30);
// const lives = new Lives(canvas.width - 65, 20, '#0095DD', '16px Arial');
// const score = new Score(8, 20, '#0095DD', '16px Arial');
// const background = new Background();
// const paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10);
// const bricks = [];
// // create new brick objects
// for (let c = 0; c < brickColumnCount; c += 1) {
//   bricks[c] = [];
//   for (let r = 0; r < brickRowCount; r += 1) {
//     let color;
//     switch (c) {
//       case 0:
//         color = '#C0392B';
//         break;

//       case 1:
//         color = '#E74C3C';
//         break;

//       case 2:
//         color = '#9B59B6';
//         break;

//       case 3:
//         color = '#8E44AD';
//         break;

//       case 4:
//         color = '#2980B9';
//         break;

//       case 5:
//         color = '#3498DB';
//         break;

//       default:
//         color = '#17A589';
//         break;
//     }

//     if (r % 2 === 0) {
//       brickWidth = 74;
//     } else {
//       brickWidth = 74 / 2;
//     }
//     const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
//     const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
//     bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight, color);
//   }
// }

// function keyDownHandler(e) {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = true;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = true;
//   }
// }

// function keyUpHandler(e) {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = false;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = false;
//   }
// }

// function mouseMoveHandler(e) {
//   const relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     // paddlewidth/2 is so that the
//     // movement will be relative to the middle of the paddle
//     paddle.x = relativeX - paddle.width / 2;
//   }
// }

//     Responsive canvase formula
// 1, listen for changes in window size
// 2, update size of canvas
// 3, notify program about new canvas size
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i += 1) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }


// function collisionDetection() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       const b = bricks[c][r];
//       if (b.status === 1) {
//         if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y >
//  b.y && ball.y < b.y + brickHeight) {
//           ball.dy = -ball.dy; // bounce back
//           b.status = 0; // hide the brick
//           ball.color = getRandomColor();

//           switch (r) {
//             case 0:
//               score.update(100000);
//               break;

//             case 1:
//               score.update(10000);
//               break;

//             case 2:
//               score.update(1000);
//               break;

//             case 3:
//               score.update(100);
//               break;

//             default:
//               score.update(10);
//           }

//           if (score.score >= 111110) {
//             // brickRowCount * brickColumnCount
//             // eslint-disable-next-line no-alert
//             alert('You win, congrats!!');
//             document.location.reload();
//           }
//         }
//       }
//     }
//   }
// }

// function drawBricks() {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       if (bricks[c][r].status === 1) {
//         bricks[c][r].render(ctx);
//       }
//     }
//   }
// }

// function draw() {
//   // drawing code
//   background.render(ctx);
//   // ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas first
//   drawBricks();
//   ball.render(ctx);
//   paddle.render(ctx);
//   score.render(ctx);
//   lives.render(ctx);
//   collisionDetection();
//   if (ball.x + ball.dx < ball.radius || ball.x + ball.dx > canvas.width - ball.radius) {
//     ball.dx = -ball.dx;
//     // ball.move();
//     ball.color = getRandomColor();
//   }
//   if (ball.y + ball.dy < ball.radius) {
//     ball.dy = -ball.dy;
//     ball.color = getRandomColor();
//   } else if (ball.y + ball.dy > canvas.height - ball.radius) {
//     if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
//       ball.dy = -ball.dy;
//       ball.color = getRandomColor();
//     } else {
//       lives.loseLife();
//       if (lives.lives < 1) {
//         // eslint-disable-next-line no-alert
//         alert('GAME OVER');
//         document.location.reload();
//         // clearInterval(interval); // Needed for Chrome to end game
//       } else {
//         ball.x = canvas.width / 2;
//         ball.y = canvas.height - 30;
//         ball.dx = 2;
//         ball.dy = -2;
//         paddle.x = (canvas.width - paddle.width) / 2;
//       }
//     }
//   }
//   ball.move();
//   if (rightPressed) {
//     paddle.x += 10;
//     if (paddle.x + paddle.width > canvas.width) {
//       paddle.x = canvas.width - paddle.width;
//     }
//   } else if (leftPressed) {
//     paddle.x -= 10;
//     if (paddle.x < 0) {
//       paddle.x = 0;
//     }
//   }
//   requestAnimationFrame(draw); // causes the draw() function to call
// // itself over and over again
// }

// myVar = setInterval("javascript function", milliseconds);
// var interval = setInterval(draw, 10);
