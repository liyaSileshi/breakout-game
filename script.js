const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
var x = canvas.width/2
var y = canvas.height-30
var dx = 2
var dy = -2
var ballRadius = 10
var ballColor = "#0095DD"

// draw a rectangle
// ctx.beginPath()    //begins a new path
// // ctx.rect(x,y,width,height)
// ctx.rect(100,50,120,56)         //draws a rectangular path
// ctx.fillStyle='#0095DD'         //sets the fill color
// ctx.closePath()                 //close the path
// ctx.fill()                      //fills the current path

// ctx.beginPath()
// ctx.rect(300,300,120,56)
// ctx.fillStyle='#0095DD'  
// ctx.closePath()                
// ctx.fill()                      

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

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
  
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    // drawing code
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the canvas first
    drawBall()
    if(x + dx < ballRadius || x + dx > canvas.width-ballRadius){
        dx = -dx
        ballColor = getRandomColor()
    }
    if(y + dy < ballRadius || y + dy > canvas.height-ballRadius){
        dy = -dy
        ballColor = getRandomColor()
    }
    x += dx
    y += dy
}




setInterval(draw, 10);