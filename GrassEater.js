var LivingCreature = require("./LivingCreature");

module.exports = class GrassEater extends LivingCreature {
  constructor(x, y) {
    super(x, y);
    this.energy = 20;
  }

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
  mul() {
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact && this.energy >= 12) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 2;
      grEaterArr.push(new GrassEater(x, y));
      this.energy = 20;
    }
  }
  eat() {
    let found = this.chooseCell(1);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact) {
      this.energy += 5;
      let x = exact[0];
      let y = exact[1];
      for (var i = 0; i < grassArr.length; i++) {
        if (x == grassArr[i].x && y == grassArr[i].y) {
          grassArr.splice(i, 1);
          matrix[y][x] = 2;
        }
      }

      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      if (this.energy > 30) {
        this.mul();
      }
    } else {
      this.move();
    }
  }
  move() {
    this.energy -= 5;
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 2;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      if (this.energy < 0) {
        this.die();
      }
    }
  }
  die() {
    for (var i = 0; i < grEaterArr.length; i++) {
      if (this.x == grEaterArr[i].x && this.y == grEaterArr[i].y) {
        grEaterArr.splice(i, 1);
        matrix[this.y][this.x] = 0;
      }
    }
  }
};
