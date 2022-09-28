
var LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature {

  mul() {
    this.multiplay += 5;
    let found = super.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];

    if (exact && this.multiplay > 1) {
      let x = exact[0];
      let y = exact[1];
      let grass = new Grass(x, y);
      matrix[y][x] = 1;
      grassArr.push(grass);
      this.multiplay = 0;
    }
  }
};
