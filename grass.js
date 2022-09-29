var LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature {
  mul() {
    this.multiplay += 5;
    let found = super.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];

    if (this.multiplay > 10 && exact) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y));
      this.multiplay = 0;
    }
  }
};
