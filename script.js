const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// draw a rectangle
ctx.beginPath()    //begins a new path
// ctx.rect(x,y,width,height)
ctx.rect(100,50,120,56)         //draws a rectangular path
ctx.fillStyle='#0095DD'         //sets the fill color
ctx.closePath()                 //close the path
ctx.fill()                      //fills the current path

ctx.beginPath()
ctx.rect(300,300,120,56)
ctx.fillStyle='#0095DD'  
ctx.closePath()                
ctx.fill()                      

ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

//     Responsive canvase formula
// 1, listen for changes in window size
// 2, update size of canvas
// 3, notify program about new canvas size