var canvas;
var context;

window.onload = function () {
    canvas = document.getElementById("GameCanvas");
    canvas.width = 710;
    canvas.height = 500;
    context = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
}
function Start() {
    setInterval(GameLoop, 1000 / 60);
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 5; j++) {
            blocks.push({ x: i * 60 + 10 * (i + 1), y: j * 20 + 10 * (j + 1), w: 60, h: 20 });
        }
    }
}
blocks = [];
function GameLoop() {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    for (var i = 0; i < 10 * 5; i++) {
        context.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
    }
}