var LivingCreature = require("./LivingCreature");
module.exports = class Hunter extends LivingCreature {
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

  eat() {
    let found = this.chooseCell(1);
    let found2 = this.chooseCell(2);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    let exact2 = found2[Math.floor(Math.random() * found.length + 0.5)];

    if (exact) {
      this.energy += 5;
      let x = exact[0];
      let y = exact[1];
      for (var i = 0; i < grassArr.length; i++) {
        if (x == grassArr[i].x && y == grassArr[i].y) {
          grassArr.splice(i, 1);
        }
        matrix[y][x] = 3;
      }
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    } 
    if (exact2) {
      this.energy += 5;
      let x = exact2[0];
      let y = exact2[1];
      for (var i = 0; i < grEaterArr.length; i++) {
        if (x == grEaterArr[i].x && y == grEaterArr[i].y) {
          grEaterArr.splice(i, 1);
        }
        matrix[y][x] = 3;
      }

      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
    } else {
      this.move();
    }
  }
  move() {
    let found = this.chooseCell(0);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact) {
      this.energy -= 5;
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 3;
      matrix[this.y][this.x] = 0;
      this.y = y;
      this.x = x;
      if (this.energy < 0) {
        this.die();
      }
    } else {
      this.energy--;
    }
  }
  die() {
    for (var i = 0; i < huntArr.length; i++) {
      if (this.x == huntArr[i].x && this.y == huntArr[i].y) {
        huntArr.splice(i, 1);
      }
      matrix[this.y][this.x] = 0;
    }
  }
};
