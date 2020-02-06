/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* eslint-disable max-classes-per-file */\n/* eslint-disable no-shadow */\n\nconst canvas = document.getElementById('myCanvas');\n\nclass Sprite {\n  constructor(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  moveTo(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  moveBy(dx, dy) {\n    this.x += dx;\n    this.y += dy;\n  }\n}\n\nclass Ball extends Sprite {\n  constructor(x, y, radius = 10, color = '#0095DD') {\n    super(x, y);\n    this.radius = radius;\n    this.color = color;\n    this.dx = 5;\n    this.dy = -5;\n  }\n\n  move() {\n    this.x += this.dx;\n    this.y += this.dy;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Brick extends Sprite {\n  constructor(x, y, w = 74, h = 20, color = 'blue') {\n    super(x, y);\n    this.status = 1;\n    this.color = color;\n    this.width = w;\n    this.height = h;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Paddle extends Sprite {\n  constructor(x, y, w = 75, h = 10, color = 'blue') {\n    super(x, y);\n    this.color = color;\n    this.width = w;\n    this.height = h;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, canvas.height - this.height, this.width, this.height);\n    ctx.fillStyle = '#0095DD';\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Background {\n  constructor(color = '#2E4053') {\n    this.color = color;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(0, 0, canvas.width, canvas.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n}\n\nclass Score extends Sprite {\n  constructor(x, y, color, font) {\n    super(x, y);\n    this.score = 0;\n    this.color = color;\n    this.font = font;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Score: ${this.score}`, this.x, this.y);\n  }\n\n  update(points) {\n    this.score += points;\n  }\n\n  reset() {\n    this.score = 0;\n  }\n}\n\nclass Lives extends Sprite {\n  constructor(x, y, color, font) {\n    super(x, y);\n    this.color = color;\n    this.font = font;\n    this.lives = 3;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);\n  }\n\n  loseLife() {\n    this.lives -= 1;\n  }\n\n  reset() {\n    this.lives = 3;\n  }\n}\n\nclass Game {\n  constructor() {\n    this.brickWidth = 75;\n    this.brickHeight = 20;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.rightPressed = false;\n    this.leftPressed = false;\n    this.brickRowCount = 5;\n    this.brickColumnCount = 8;\n    this.ctx = canvas.getContext('2d');\n    // this.ball = new Ball(50, 50);\n    this.ball = new Ball(canvas.width / 2, canvas.height - 30);\n    this.lives = new Lives(canvas.width - 65, 20, '#0095DD', '16px Arial');\n    this.score = new Score(8, 20, '#0095DD', '16px Arial');\n    this.background = new Background();\n    this.paddle = new Paddle((canvas.width - 75) / 2, canvas.height - 10);\n    console.log(this.paddle.width);\n\n    this.bricks = [];\n    // create new brick objects\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      this.bricks[c] = [];\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        let color;\n        switch (c) {\n          case 0:\n            color = '#C0392B';\n            break;\n\n          case 1:\n            color = '#E74C3C';\n            break;\n\n          case 2:\n            color = '#9B59B6';\n            break;\n\n          case 3:\n            color = '#8E44AD';\n            break;\n\n          case 4:\n            color = '#2980B9';\n            break;\n\n          case 5:\n            color = '#3498DB';\n            break;\n\n          default:\n            color = '#17A589';\n            break;\n        }\n\n        if (r % 2 === 0) {\n          this.brickWidth = 74;\n        } else {\n          this.brickWidth = 74 / 2;\n        }\n        const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;\n        const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;\n        this.bricks[c][r] = new Brick(brickX, brickY, this.brickWidth, this.brickHeight, color);\n      }\n    }\n  }\n\n  keyDownHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = true;\n      // console.log(this.rightPressed);\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = true;\n      // console.log(this.leftPressed);\n    }\n  }\n\n  keyUpHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = false;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = false;\n    }\n  }\n\n  mouseMoveHandler(e) {\n    const relativeX = e.clientX - canvas.offsetLeft;\n    // console.log(relativeX)\n    if (relativeX > 0 && relativeX < canvas.width) {\n      // paddlewidth/2 is so that the\n      // movement will be relative to the middle of the paddle\n      console.log('********');\n      console.log(this.paddle.width);\n      this.paddle.x = relativeX - this.paddle.width / 2;\n    }\n  }\n\n  collisionDetection() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        const b = this.bricks[c][r];\n        if (b.status === 1) {\n          if (this.ball.x > b.x && this.ball.x < b.x + this.brickWidth && this.ball.y > b.y && this.ball.y < b.y + this.brickHeight) {\n            this.ball.dy = -this.ball.dy; // bounce back\n            b.status = 0; // hide the brick\n            this.ball.color = this.getRandomColor();\n            this.score.update(10 ** (5 - r)); //different rows have different scores\n            // if (this.score.score >= 111110) {\n            if (this.gameOver() === true) {\n            //     // brickRowCount * brickColumnCount\n            //     // eslint-disable-next-line no-alert\n              alert('You win, congrats!!');\n              document.location.reload();\n            }\n            // }\n          }\n        }\n      }\n    }\n  }\n\n  gameOver() {\n    let sum = 0;\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        const b = this.bricks[c][r];\n        if (b.status === 0) {\n          sum += 1;\n        }\n      }\n    }\n    if (sum === (this.brickColumnCount * this.brickRowCount)) {\n      return true;\n    }\n    else {\n      return false;\n    }\n  }\n\n\n\n  getRandomColor()  {\n    const letters = '0123456789ABCDEF';\n    let color = '#';\n    for (let i = 0; i < 6; i += 1) {\n      color += letters[Math.floor(Math.random() * 16)];\n    }\n    return color;\n  }\n\n  drawBricks() {\n    for (let c = 0; c < this.brickColumnCount; c += 1) {\n      for (let r = 0; r < this.brickRowCount; r += 1) {\n        if (this.bricks[c][r].status === 1) {\n          this.bricks[c][r].render(this.ctx);\n        }\n      }\n    }\n  }\n\n  draw() {\n    // drawing code\n    // console.log('****************');\n    // console.log(this.background);\n    this.background.render(this.ctx);\n    // ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the canvas first\n    this.drawBricks();\n    this.ball.render(this.ctx);\n    this.paddle.render(this.ctx);\n    this.score.render(this.ctx);\n    this.lives.render(this.ctx);\n    this.collisionDetection();\n\n    if (this.ball.x + this.ball.dx < this.ball.radius || this.ball.x + this.ball.dx > canvas.width - this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n      // ball.move();\n      this.ball.color = this.getRandomColor();\n    }\n    if (this.ball.y + this.ball.dy < this.ball.radius) {\n      this.ball.dy = -this.ball.dy;\n      this.ball.color = this.getRandomColor();\n    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n        this.ball.dy = -this.ball.dy;\n        this.ball.color = this.getRandomColor();\n      } else {\n        this.lives.loseLife();\n        if (this.lives.lives < 1) {\n          // eslint-disable-next-line no-alert\n          alert('GAME OVER');\n          document.location.reload();\n          // clearInterval(interval); // Needed for Chrome to end game\n        } else {\n          this.ball.x = canvas.width / 2;\n          this.ball.y = canvas.height - 30;\n          this.ball.dx = 5;\n          this.ball.dy = -5;\n          this.paddle.x = (canvas.width - this.paddle.width) / 2;\n        }\n      }\n    }\n    this.ball.move();\n    // console.log(this.rightPressed);\n    if (this.rightPressed) {\n      // console.log('right');\n      this.paddle.x += 10;\n      if (this.paddle.x + this.paddle.width > canvas.width) {\n        this.paddle.x = canvas.width - this.paddle.width;\n      }\n    } else if (this.leftPressed) {\n      this.paddle.x -= 10;\n      if (this.paddle.x < 0) {\n        this.paddle.x = 0;\n      }\n    }\n\n    // requestAnimationFrame(this.draw)\n    // works with closure\n    requestAnimationFrame(() => {\n      this.draw();\n    }); // causes the draw() function to call\n  // itself over and over again\n  }\n}\n\nconst game = new Game();\n// const ctxt = canvas.getContext('2d');\n// console.log(game.background.render(ctxt));\ndocument.addEventListener('keydown', (e) => {\n  game.keyDownHandler(e);\n}, false);\n\ndocument.addEventListener('keyup', (e) => {\n  game.keyUpHandler(e);\n}, false);\n\ndocument.addEventListener('mousemove', (e) => {\n  game.mouseMoveHandler(e);\n}, false);\n\ngame.draw();\n\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ })

/******/ });