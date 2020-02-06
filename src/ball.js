import Sprite from './sprite';

class Ball extends Sprite {
  constructor(x, y, radius = 10, color = '#0095DD') {
    super(x, y);
    this.radius = radius;
    this.color = color;
    this.dx = 5;
    this.dy = -5;
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
export default Ball;
