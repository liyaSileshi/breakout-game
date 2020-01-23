const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
var x = canvas.width/2 
var y = canvas.height-30
var dx = 2
var dy = -2
var ballRadius = 10
var ballColor = "#0095DD"
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width-paddleWidth)/2 //puts it in the middle??
var rightPressed = false
var leftPressed = false
var brickRowCount = 5
var brickColumnCount = 7
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var score = 0

var bricks = []
// create new brick objects
for (var c=0; c<brickColumnCount; c++){
    bricks[c] = []
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1}
    }
}

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

function keyDownHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true
    }
}

function keyUpHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false 
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2 //paddlewidth/2 is so that the
                                            // movement will be relative to the middle of the paddle
    }
}


//     Responsive canvase formula
// 1, listen for changes in window size
// 2, update size of canvas
// 3, notify program about new canvas size
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r]
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy //bounce back
                    b.status = 0 //hide the brick
                    ballColor = getRandomColor()
                    score++
                    if(score == brickRowCount*brickColumnCount) {
                        alert("You win, congrats!!")
                        document.location.reload()
                        clearInterval(interval)
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial'
    ctx.fillStyle = '#0095DD'
    ctx.fillText("Score: "+score, 8, 20)
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = '#0095DD'
    ctx.fill()
    ctx.closePath()
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    // drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the canvas first
    drawBricks()
    drawBall()
    drawPaddle()
    drawScore()
    collisionDetection()
    if(x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx
        ballColor = getRandomColor()
    }
    if(y + dy < ballRadius){
        dy = -dy
        ballColor = getRandomColor()
    }
    else if (y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy
            ballColor = getRandomColor()
        }
        else{
            alert('Game Over!!')
            document.location.reload()
            clearInterval(interval) //needed for chrome to end game
        }
    }
    x += dx
    y += dy

    if(rightPressed) {
        paddleX += 10
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth
        }
    }
    else if(leftPressed) {
        paddleX -= 10
        if (paddleX < 0) {
            paddleX = 0
        }
    }
}


// myVar = setInterval("javascript function", milliseconds);
var interval = setInterval(draw, 10);
