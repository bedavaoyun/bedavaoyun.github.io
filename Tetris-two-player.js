var canvas;
var context;
var width = 800;
var height = 800;
var FPS = 5;
var Mode = 1;
var blocks = {
    T: {
        data: [
            [0, 1, 0],
            [1, 1, 1]
        ],
        size: [2, 3]
    },
    Z: {
        data: [
            [2, 2, 0],
            [0, 2, 2]
        ],
        size: [2, 3]
    },
    S: {
        data: [
            [0, 3, 3],
            [3, 3, 0]
        ],
        size: [2, 3]
    },
    O: {
        data: [
            [4, 4],
            [4, 4]
        ],
        size: [2, 2]
    },
    I: {
        data: [
            [5, 5, 5, 5]
        ],
        size: [1, 4]
    },
    L: {
        data: [
            [6, 6, 6],
            [6, 0, 0]
        ],
        size: [2, 3]
    },
    J: {
        data: [
            [7, 0, 0],
            [7, 7, 7]
        ],
        size: [2, 3]
    }
};

var currBlock = blocks.L;
var currColor = 6;

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
        insides: ["white", "red", "blue", "green", "orange", "lightblue", "purple", "pink"]
    },
    Map: [],
    CreateMapArray: function() {
        for (var i = 0; i < width / this.tileL; i++) {
            this.Map[i] = [];
            for (var j = 0; j < height / this.tileL; j++) {
                this.Map[i][j] = 0;
            }
        }
    },
    Draw: function() {
        for (var x = this.offset.x; x < this.offset.x + this.width; x += this.tileL) {
            for (var y = this.offset.y; y < this.offset.y + this.height; y += this.tileL) {
                context.fillStyle = this.color.border;
                context.fillRect(x, y, this.tileL, this.tileL);

                context.fillStyle = this.color.insides[this.Map[x / 50][y / 50]];
                context.fillRect(x + 1, y + 1, this.tileL - 2, this.tileL - 2);
            }
        }
    }
};

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
}

function SetCanvas() {
    canvas.width = width;
    canvas.height = height;
}

function OnKeyPush(evt) {
    switch (evt.keyCode) {
        case 32:
            currr++;
            if (currr == 4)
                currr = 0;
            break;
    }
}

function OnePlayer() {
    Mode = 1;
    SetCanvas();
    setInterval(GameOnePlayer, 1000 / FPS);
    GameMap.CreateMapArray();
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
    GameMap.Draw();

}

var currx = 1;
var curry = 3;
var currr = 0;
var frame = 1;

function GameOnePlayer() {
    SetMap1();
    Draw(currBlock, currx, curry, currr);
    frame++;
    if (frame == 6) {
        frame = 0;
        curry++;
    }
}

function Draw(b, x, y, r) {
    context.fillStyle = GameMap.color.insides[currColor];
    if (r == 0) {
        for (var i = 0; i < b.size[0]; i++)
            for (var j = 0; j < b.size[1]; j++)
                if (b.data[i][j] != 0)
                    context.fillRect(GameMap.offset.x + (b.size[0] - 1 - i + x) * GameMap.tileL + 1, GameMap.offset.y + (j + y) * GameMap.tileL + 1, GameMap.tileL - 2, GameMap.tileL - 2);
    } else if (r == 1) {
        for (var i = 0; i < b.size[0]; i++)
            for (var j = 0; j < b.size[1]; j++)
                if (b.data[i][j] != 0)
                    context.fillRect(GameMap.offset.x + (j + x) * GameMap.tileL + 1, GameMap.offset.y + (i + y) * GameMap.tileL + 1, GameMap.tileL - 2, GameMap.tileL - 2);
    } else if (r == 2) {
        for (var i = 0; i < b.size[0]; i++)
            for (var j = 0; j < b.size[1]; j++)
                if (b.data[i][j] != 0)
                    context.fillRect(GameMap.offset.x + (i + x) * GameMap.tileL + 1, GameMap.offset.y + (b.size[1] - 1 - j + y) * GameMap.tileL + 1, GameMap.tileL - 2, GameMap.tileL - 2);
    } else if (r == 3) {
        for (var i = 0; i < b.size[0]; i++)
            for (var j = 0; j < b.size[1]; j++)
                if (b.data[i][j] != 0)
                    context.fillRect(GameMap.offset.x + (b.size[1] - 1 - j + x) * GameMap.tileL + 1, GameMap.offset.y + (b.size[0] - 1 - i + y) * GameMap.tileL + 1, GameMap.tileL - 2, GameMap.tileL - 2);
    }
}