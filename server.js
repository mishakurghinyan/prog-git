var express = require('express')
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('m.html');
});

server.listen(3000);


//


function gener(n, m, q) {
    var matrix = []
    for (var i = 0; i <= n; ++i) {
        matrix.push([]);
        for (var j = 0; j <= m; ++j) {
            matrix[i].push(Math.floor(Math.random() * q));
        }
    }
    return matrix;

}
matrix = gener(10, 10, 7);

io.sockest.emit("send matrix", matrix)

fireArr = [];
grassArr = [];
grEaterArr = [];
huntArr = [];
poisonArr = [];
magArr = [];


Grass = require("./grass.js");
GrassEater = require("./GrassEater.js");
Fire = require("./Fire.js");
Hunter = require("./Hunter.js");
Mag = require("./Mag.js");
function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var greater = new GrassEater(x, y);
                grEaterArr.push(greater)
            } else if (matrix[y][x] == 3) {
                var hunter = new Hunter(x, y);
                huntArr.push(hunter);
            } else if (matrix[y][x] == 4) {
                var fire = new Fire(x, y);
                fireArr.push(fire);
            } else if (matrix[y][x] == 6) {
                var poison = new Poison(x, y);
                poisonArr.push(poison);
            } else if (matrix[y][x] == 5) {
                var mag = new Mag(x, y);
                magArr.push(mag);
            }

        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game(){
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i2 in grEaterArr) {
        grEaterArr[i2].eat();
    }
    for (var i3 in huntArr) {
        huntArr[i3].eat()
    }
    for (var i4 in fireArr) {
        fireArr[i4].born();
    }
    for (var i5 in magArr) {
        magArr[i5].move();
    }
    io.sockest.emit("send matrix", matrix)
}

setInterval(game, 100)

io.on('connection', function () {
    createObject(matrix)
})