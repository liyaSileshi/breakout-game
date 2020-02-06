import Sprite from './sprite';
// import canvas from './script';
const canvas = document.getElementById('myCanvas');
class Paddle extends Sprite {
  constructor(x, y, w = 75, h = 10, color = 'blue') {
    super(x, y);
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

export default Paddle;
