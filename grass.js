var LivingCreature = require("./LivingCreature");
var pois = require("./app.js")
module.exports = class Grass extends LivingCreature{
    mul() {
        this.multiplay += 5;
        let found = super.chooseCell(0);
        let found2 = super.chooseCell(6);
        let exact = found[Math.floor(Math.random()* found.length + 0.5)]
        let exact2 = found2[Math.floor(Math.random()* found.length + 0.5)]

        if (exact && this.multiplay > 1) {
            let x = exact[0];
            let y = exact[1];
            let grass = new Grass(x, y)
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiplay = 0;
        }
        if (exact2) {
            let x = exact2[0];
            let y = exact2[1];
            let grass = new Grass(x, y);
            matrix[y][x] = 1;
            grassArr.push(grass);
            this.multiplay -= 50;

            for (var i = 0; i <= pois.length; ++i) {
                if (x == pois[i].x && y == pois[i].y) {
                    matrix[y][x] = 0;
                    pois.splice(i, 1);
                    
                }
            }

        }
    }
}