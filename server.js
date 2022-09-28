var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
  res.redirect("m.html");
});

server.listen(3000, () => {
  console.log("connected");
});

//
matrix = [];
var n = 20;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
  matrix[i] = [];
  for (let j = 0; j < n; j++) {
    matrix[i][j] = Math.floor(rand(0, 7));
  }
}
let speed =
  new Date().getMonth >= 2 && new Date().getMonth() <= 4
    ? 50
    : new Date().getMonth >= 5 && new Date().getMonth() <= 7
    ? 10
    : new Date().getMonth >= 8 && new Date().getMonth() <= 10
    ? 1000
    : 500;

io.sockets.emit("send matrix", matrix);

fireArr = [];
grassArr = [];
grEaterArr = [];
huntArr = [];
magArr = [];
burnedArr = [];

Grass = require("./grass");
GrassEater = require("./GrassEater");
Fire = require("./Fire");
Hunter = require("./Hunter");
Mag = require("./Mag");
Burn = require("./Burned");
function createObject() {
  for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);
        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var greater = new GrassEater(x, y);
        grEaterArr.push(greater);
      } else if (matrix[y][x] == 3) {
        var hunter = new Hunter(x, y);
        huntArr.push(hunter);
      } else if (matrix[y][x] == 4) {
        var fire = new Fire(x, y);
        fireArr.push(fire);
      } else if (matrix[y][x] == 5) {
        var mag = new Mag(x, y);
        magArr.push(mag);
      } else if (matrix[y][x] == 7) {
        var burn = new Burn(x, y);
        burnedArr.push(burn);
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function game() {
  for (var i in grassArr) {
    grassArr[i].mul();
  }
  for (var i in grEaterArr) {
    grEaterArr[i].eat();
  }
  for (var i in huntArr) {
    huntArr[i].eat();
  }
  for (var i in fireArr) {
    fireArr[i].burn();
  }
  for (var i in magArr) {
    magArr[i].move();
  }
  for (var i in burnedArr) {
    burnedArr[i].move();
  }

  io.sockets.emit("send matrix", matrix);
}

setInterval(game, speed);

io.on("connection", function () {
  createObject(matrix);
});
