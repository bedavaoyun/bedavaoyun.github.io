var canvas;
var context;
var height = 500;
var width = 710;
var blocks = [];
var player = {
    color: "green",
    w: 150,
    h: 30,
    x: (width - 150) / 2,
    y: height - 30 - 5,
    draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    },
    move: function (keycode) {
        if (keycode == 37)
            this.x--;
        else if (keycode == 39)
            this.x++;
        this.fitIn();
    },
    fitIn: function () {
        if (this.x < 0)
            this.x = 0;
        else if (this.x > width - this.w)
            this.x = width - this.w;
    }
}

window.onload = function () {
    canvas = document.getElementById("GameCanvas");
    canvas.width = width;
    canvas.height = height;
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
function GameLoop() {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, width, height);
    context.fillStyle = "black";
    for (var i = 0; i < blocks.length; i++) {
        context.fillRect(blocks[i].x, blocks[i].y, blocks[i].w, blocks[i].h);
    }
    player.draw();
}
function OnKeyPush(event){
    player.move(event.keycode);
}