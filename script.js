
var socket = io();

var side = 50;
let stat = document.getElementById("statistic")


let weather =
  (new Date().getMonth >= 2 && new Date().getMonth() <= 4)
    ? "spring"
    : (new Date().getMonth >= 5 && new Date().getMonth() <= 7)
    ? "summer"
    : (new Date().getMonth >= 8 && new Date().getMonth() <= 10)
    ? "winter"
    : "autumn";

let speed =
    (new Date().getMonth >= 2 && new Date().getMonth() <= 4)
    ? 50
    : (new Date().getMonth >= 5 && new Date().getMonth() <= 7)
    ? 10
    : (new Date().getMonth >= 8 && new Date().getMonth() <= 10)
    ? 1000
    : 500;
function setup() {
  createCanvas(10 * side + 1, 10 * side + 1); /* ete uzum eq or sax matrican cuyc ta gnaceq server.js-i
   mej gteq matr function expression-y u nayeq te inch n-ov e ayn kanchvac im depqum 10
   heto areq aystex u createCanvas-i mej greq n = 10 * side + 1, n = 10 * side + 1. + 1 vor tesnenq nranc cayreri gcery
   */
  background("#acacac");
}

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        if (weather === "spring") {
          fill("#437047");
        } else if (weather === "summer") {
          fill("#6cff5c");
        } else if (weather === "winter") {
          fill("#bff3ff");
        } else {
          fill("#474238");
        }
      } else if (matrix[y][x] == 0) {
        fill("#acacac");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("#f61");
      } else if (matrix[y][x] == 7) {
        fill("#000");
      } else if (matrix[y][x] == 5) {
        fill("#41e");
      }
      rect(x * side, y * side, side, side);
    }
  }
}

let jsonInterval = setInterval(() => {
  socket.on("send matrix", nkarel);
  fetch('./statistics.json')
  .then((response) => response.json())
  .then((json) => statistic.innerHTML = 
  `Grass: ${json.Grass} <br />
  Grass-Eaters: ${json.GrassEater} <br />
  Hunters: ${json.Hunter} <br />
  Fire: ${json.Fire} <br />
  Mags: ${json.Mag} <br />
  Burned: ${json.Burned}`)
}, speed);

let stopId = document.getElementById("Stop")

function clean() {
  socket.emit("clean")
}
function addGrass() {
  socket.emit("add grass")
}
function addGrassEater() {
  socket.emit("add grassEater")
}
function addHunter() {
  socket.emit("add Hunter")
}
function addMag() {
  socket.emit("add Mag")
}
function addFire() {
  socket.emit("add Fire")
}
function stop() {
  stopId.innerHTML = "Continue";
  stopId.className = "addButton Cont";
  stopId.onclick = () => cont()
  clearInterval(jsonInterval);
  socket.emit("Stop");
}
function cont() {
  stopId.innerHTML = "Stop";
  stopId.className = "addButton Stop";
  stopId.onclick = () => stop()
  jsonInterval = setInterval(() => {
    socket.on("send matrix", nkarel);
    fetch('./statistics.json')
    .then((response) => response.json())
    .then((json) => statistic.innerHTML = 
    `Grass: ${json.Grass} <br />
    Grass-Eaters: ${json.GrassEater} <br />
    Hunters: ${json.Hunter} <br />
    Fire: ${json.Fire} <br />
    Mags: ${json.Mag} <br />
    Burned: ${json.Burned}`)
  }, speed);
  socket.emit("Continue");
}