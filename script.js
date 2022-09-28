var socket = io();

var side = 50;

side = 30

function setup() {
    createCanvas(7 * side, 13 * side);
    background("#acacac");
}

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
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

      fill("white");
      rect(x * side, y * side, side, side);
    }
  }
}

setInterval(
  function () {
  socket.on('send matrix', nkarel)
  },1000
)
