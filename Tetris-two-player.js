var canvas;
var context;
var width = 800;
var height = 800;
var GameMap = {
    width: 300,
    height: 700,
    tileL: 50,
    offset: {
        x: 150,
        y: 50,
    },
    color: {
        border: "black",
        inside: "white"
    }
}
var FPS = 10;
var Mode = 1;

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
}

function SetCanvas() {
    canvas.width = width;
    canvas.height = height;
}

function OnKeyPush(evt) {}

function OnePlayer() {
    Mode = 1;
    SetCanvas();
    setInterval(GameOnePlayer, 1000 / FPS);
}

function TwoPlayer() {
    alert("Henüz eklenmedi. Daha sonra tekrar deneyiniz!");
    return;
    Mode = 2;
    SetCanvas();
    setInterval(GameTwoPlayer, 1000 / FPS);
    SetMap2();
}

function SetMap1() {
    context.fillStyle = "lightgray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (var x = GameMap.offset.x; x < GameMap.offset.x + GameMap.width; x += GameMap.tileL) {
        for (var y = GameMap.offset.y; y < GameMap.offset.y + GameMap.height; y += GameMap.tileL) {
            context.fillStyle = GameMap.color.border;
            context.fillRect(x, y, GameMap.tileL, GameMap.tileL);

            context.fillStyle = GameMap.color.inside;
            context.fillRect(x + 1, y + 1, GameMap.tileL - 2, GameMap.tileL - 2);
        }
    }

}

function GameOnePlayer() {
    SetMap1();
}