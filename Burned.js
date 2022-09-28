var LivingCreature = require("./LivingCreature");
module.exports = class Burn extends LivingCreature{
    bloom() {
        this.multiplay --;
        if(this.multiplay <= 0) {
            this.die();
        }
    }
    die() {
        for(var i = 0; i < burnedArr.length; i++) {
            if(this.x == burnedArr[i].x && this.y == burnedArr[i].y) {
                burnedArr.splice(i, 1)
            }
            matrix[this.y][this.x] = 0
        }
    }
}