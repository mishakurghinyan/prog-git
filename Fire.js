var LivingCreature = require("./LivingCreature");
module.exports = class Fire extends LivingCreature {
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
    this.energy += 5;
    let found = this.chooseCell(1);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];
    if (exact && this.energy >= 12) {
      let x = exact[0];
      let y = exact[1];
      matrix[y][x] = 4;
      let fire = new Fire(x, y);
      fireArr.push(fire);
      this.energy = 20;
    }
  }

  born() {
    let found = this.chooseCell(1);
    let exact = found[Math.floor(Math.random() * found.length + 0.5)];

    if (exact) {
      this.energy += 5;
      let x = exact[0];
      let y = exact[1];
      for (var i = 0; i < grassArr.length; i++) {
        if (x == grassArr[i].x && y == grassArr[i].y) {
          let fire = new Fire(x, y);
          fireArr.push(fire);
          grassArr.splice(i, 1);
        }
      }
      matrix[y][x] = 4;
    } else if (this.energy < 0) {
      this.die();
    } else {
      this.energy -= 5;
    }
  }

  die() {
    for (var i = 0; i < fireArr.length; i++) {
      if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
        fireArr.splice(i, 1);
      }
      matrix[this.y][this.x] = 7;
    }
  }
};
