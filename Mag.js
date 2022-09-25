var LivingCreature = require("./LivingCreature");
module.exports = class Mag extends LivingCreature {
  chooseCell(char) {
    super.getNewCoordinates();
    super.chooseCell(char);
  }
  move() {
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 7;
      matrix[this.y][this.x] = 1;
      this.y = y;
      this.x = x;
      let gr = new Grass(x, y);
      grassArr.push(gr);
    }
  }
};
