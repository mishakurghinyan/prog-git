var socket = io();

var side = 50;

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
  createCanvas(10 * side + 1, 10 * side + 1);
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
          fill("#414738");
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
        fill("#111");
      } else if (matrix[y][x] == 5) {
        fill("#41e");
      }
      rect(x * side, y * side, side, side);
    }
  }
}

setInterval(() => {
  socket.on("send matrix", nkarel);
}, speed);
