class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
}


export default Sprite;

// const {ctx, ball, paddle} = this //deconstructing instead of using this.ctx
//u can use ctx
// const ctx = this.ctx