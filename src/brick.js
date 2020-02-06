import Sprite from './sprite';

class Brick extends Sprite {
  constructor(x, y, w = 74, h = 20, color = 'blue') {
    super(x, y);
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
export default Brick;
