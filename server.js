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

weather =  (new Date().getMonth() >= 2 && new Date().getMonth() <= 4)
    ? "spring"
    : (new Date().getMonth() >= 5 && new Date().getMonth() <= 7)
    ? "summer"
    : (new Date().getMonth() >= 8 && new Date().getMonth() <= 10)
    ? "autumn"
    : "winter";
setInterval(() => io.sockets.emit('weather', weather),1000)



matrix = [];
let matr = (function (n) {
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = Math.floor(rand(0, 7));
    }
  }
})(10);
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
        grassArr.push(new Grass(x, y));
      } else if (matrix[y][x] == 2) {
        grEaterArr.push(new GrassEater(x, y));
      } else if (matrix[y][x] == 3) {
        huntArr.push(new Hunter(x, y));
      } else if (matrix[y][x] == 4) {
        if(weather != "winter") fireArr.push(new Fire(x, y));
      } else if (matrix[y][x] == 5) {
        if(weather != "winter") magArr.push(new Mag(x, y));
      } else if (matrix[y][x] == 7) {
        burnedArr.push(new Burn(x, y));
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
    if(weather != "winter") fireArr[i].burn();
  }
  for (var i in magArr) {
    if(weather != "winter") magArr[i].move();
  }
  for (var i in burnedArr) {
    burnedArr[i].bloom();
  }

  io.sockets.emit("send matrix", matrix);
}

let stopInterval = setInterval(game, speed);

function clean() {
  huntArr = [];
  magArr = [];
  burnedArr = [];
  grassArr = [];
  grEaterArr = [];
  fireArr = [];

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      matrix[y][x] = 0;
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addGrass() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 1;
      grassArr.push(new Grass(x, y));
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 2;
      grEaterArr.push(new GrassEater(x, y));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addHunter() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 3;
      huntArr.push(new Hunter(x, y));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addMag() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 5;
      magArr.push(new Mag(x, y));
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function addFire() {
  for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length);
    var y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
      matrix[y][x] = 4;
      fireArr.push(new Fire(x, y));
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function rain() {
  for(let y of matrix) {
    if(weather == "winter") return;
    for(let x of y) {
      grassArr.forEach(i => i.multiplay += 10);
      fireArr.forEach(i => i.die());
      if(x == 4) {
        x = 7
      }
    }
  }
}

io.on("connection", function (socket) {
  createObject(matrix);
  socket.on("clean", clean);
  socket.on("add grass", addGrass);
  socket.on("add grassEater", addGrassEater);
  socket.on("add Hunter", addHunter);
  socket.on("add Mag", addMag);
  socket.on("add Fire", addFire);
  socket.on("Rain", rain);
  socket.on("fill Grass", fillGrass);
  socket.on("fill GrassEater", fillGrassEater);
  socket.on("fill Hunter", fillHunter);
  socket.on("fill Mag", fillMag);
  socket.on("fill Fire", fillFire);
  socket.on("Stop", stop);
  socket.on("Continue", cont);
});

var statistics = {};
let statusInterval = setInterval(function () {
  statistics.Grass = grassArr.length;
  statistics.GrassEater = grEaterArr.length;
  statistics.Fire = fireArr.length;
  statistics.Hunter = huntArr.length;
  statistics.Mag = magArr.length;
  statistics.Burned = burnedArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), () => {});
}, 1000);

function stop() {
  clearInterval(stopInterval);
  clearInterval(statusInterval);

}
function cont() {
  stopInterval = setInterval(game, speed);
  statusInterval = setInterval(function () {
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grEaterArr.length;
    statistics.Fire = fireArr.length;
    statistics.Hunter = huntArr.length;
    statistics.Mag = magArr.length;
    statistics.Burned = burnedArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), () => {});
  }, 1000);
}

function fillGrass() {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        matrix[y][x] = 1;
        grassArr.push(new Grass(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}

function fillGrassEater() {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        matrix[y][x] = 2;
        grEaterArr.push(new GrassEater(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function fillHunter() {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        matrix[y][x] = 3;
        huntArr.push(new Hunter(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function fillMag() {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        matrix[y][x] = 5;
        magArr.push(new Mag(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}
function fillFire() {
  for (let y = 0; y < matrix.length; y++) {
    for(let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 0) {
        matrix[y][x] = 4;
        fireArr.push(new Fire(x, y));
      }
    }
  }
  io.sockets.emit("send matrix", matrix);
}