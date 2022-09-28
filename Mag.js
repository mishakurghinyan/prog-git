var LivingCreature = require("./LivingCreature");
module.exports = class Mag extends LivingCreature {
  chooseCell(char) {
    super.getNewCoordinates();
      var found = [];
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == char) {
            found.push(this.directions[i]);
          }
        }
      }
      return found;
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
