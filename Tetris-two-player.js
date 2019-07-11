var canvas;
var context;
var width = 800;
var height = 800;
var FPS = 5;
var Mode = 1;
var blocks = {
    T: {
        rots: [{
            data: [
                [0, 1, 0],
                [1, 1, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [0, 1],
                [1, 1],
                [0, 1]
            ],
            size: [3, 2]
        }, {
            data: [
                [1, 1, 1],
                [0, 1, 0]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 0],
                [1, 1],
                [1, 0]
            ],
            size: [3, 2]
        }],
        color: 1
    },
    Z: {
        rots: [{
            data: [
                [1, 1, 0],
                [0, 1, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [0, 1],
                [1, 1],
                [1, 0]
            ],
            size: [3, 2]
        }, {
            data: [
                [1, 1, 0],
                [0, 1, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [0, 1],
                [1, 1],
                [1, 0]
            ],
            size: [3, 2]
        }],
        color: 2
    },
    S: {
        rots: [{
            data: [
                [0, 1, 1],
                [1, 1, 0]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 0],
                [1, 1],
                [0, 1]
            ],
            size: [3, 2]
        }, {
            data: [
                [0, 1, 1],
                [1, 1, 0]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 0],
                [1, 1],
                [0, 1]
            ],
            size: [3, 2]
        }],
        color: 3
    },
    O: {
        rots: [{
            data: [
                [1, 1],
                [1, 1]
            ],
            size: [2, 2]
        }, {
            data: [
                [1, 1],
                [1, 1]
            ],
            size: [2, 2]
        }, {
            data: [
                [1, 1],
                [1, 1]
            ],
            size: [2, 2]
        }, {
            data: [
                [1, 1],
                [1, 1]
            ],
            size: [2, 2]
        }],
        color: 4
    },
    I: {
        rots: [{
            data: [
                [1, 1, 1, 1]
            ],
            size: [1, 4]
        }, {
            data: [
                [1],
                [1],
                [1],
                [1]
            ],
            size: [4, 1]
        }, {
            data: [
                [1, 1, 1, 1]
            ],
            size: [1, 4]
        }, {
            data: [
                [1],
                [1],
                [1],
                [1]
            ],
            size: [4, 1]
        }],
        color: 5
    },
    L: {
        rots: [{
            data: [
                [1, 1, 1],
                [1, 0, 0]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 0],
                [1, 0],
                [1, 1]
            ],
            size: [3, 2]
        }, {
            data: [
                [0, 0, 1],
                [1, 1, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 1],
                [0, 1],
                [0, 1]
            ],
            size: [3, 2]
        }],
        color: 6
    },
    J: {
        rots: [{
            data: [
                [1, 0, 0],
                [1, 1, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [0, 1],
                [0, 1],
                [1, 1]
            ],
            size: [3, 2]
        }, {
            data: [
                [1, 1, 1],
                [0, 0, 1]
            ],
            size: [2, 3]
        }, {
            data: [
                [1, 1],
                [1, 0],
                [1, 0]
            ],
            size: [3, 2]
        }],
        color: 7
    }
};

var currBlock = blocks.T;

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
    CreateMapArray: function () {
        for (var i = 0; i < width / this.tileL; i++) {
            this.Map[i] = [];
            for (var j = 0; j < height / this.tileL; j++) {
                this.Map[i][j] = 0;
            }
        }
    },
    Draw: function () {
        for (var x = 0; x < this.width / this.tileL; x++) {
            for (var y = 0; y < this.height / this.tileL; y++) {
                context.fillStyle = this.color.border;
                context.fillRect(this.offset.x + x * this.tileL, this.offset.y + y * this.tileL, this.tileL, this.tileL);

                context.fillStyle = this.color.insides[this.Map[x][y]];
                context.fillRect(this.offset.x + x * this.tileL + 1, this.offset.y + y * this.tileL + 1, this.tileL - 2, this.tileL - 2);
            }
        }
    }
};

window.onload = function () {
    canvas = document.getElementById("GameCanvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
}

function SetCanvas() {
    canvas.width = width;
    canvas.height = height;
}

function DidGameOver() {
    for (var i = 0; i < GameMap.width / GameMap.tileL; i++) {
        if (GameMap.Map[i][0] != 0) {
            clearInterval(GameLoop);
            return;
        }
    }
}

function OnKeyPush(evt) {
    switch (evt.keyCode) {
        case 32:
            currr++;
            if (currr == 4)
                currr = 0;
            if (currx + currBlock.rots[currr].size[1] > GameMap.width / GameMap.tileL)
                currx = GameMap.width / GameMap.tileL - currBlock.rots[currr].size[1];
            break;
        case 37:
            currx--;
            if (currx < 0)
                currx = 0;
            break;
        case 39:
            currx++;
            if (currx + currBlock.rots[currr].size[1] > GameMap.width / GameMap.tileL)
                currx = GameMap.width / GameMap.tileL - currBlock.rots[currr].size[1];
            break;
        case 40:
            do { curry++; }
            while (!DidCollide());
            Collide();
            break;
    }
}
var GameLoop;
function OnePlayer() {
    Mode = 1;
    SetCanvas();
    GameLoop = setInterval(GameOnePlayer, 1000 / FPS);
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
var curry = 0;
var currr = 0;
var frame = 1;
var next = blocks.I;

function GameOnePlayer() {
    SetMap1();
    Draw();
    frame++;
    if (frame == 6) {
        frame = 0;
        curry++;
        if (DidCollide()) {
            Collide();
        }
        DidGameOver();
    }
}

function Draw() {
    context.fillStyle = GameMap.color.insides[currBlock.color];
    for (var i = 0; i < currBlock.rots[currr].size[0]; i++)
        for (var j = 0; j < currBlock.rots[currr].size[1]; j++)
            if (currBlock.rots[currr].data[i][j] != 0)
                context.fillRect(
                    GameMap.offset.x + (currx + j) * GameMap.tileL + 1,
                    GameMap.offset.y + (i + curry) * GameMap.tileL + 1,
                    GameMap.tileL - 2,
                    GameMap.tileL - 2
                );

    context.fillStyle = GameMap.color.insides[next.color];
    for (var i = 0; i < next.rots[0].size[0]; i++)
        for (var j = 0; j < next.rots[0].size[1]; j++)
            if (next.rots[0].data[i][j] != 0)
                context.fillRect(GameMap.offset.x + GameMap.width + (next.rots[0].size[0] - 1 - i + 1) * GameMap.tileL + 1, GameMap.offset.y + (j + 0) * GameMap.tileL + 1, GameMap.tileL - 2, GameMap.tileL - 2);
}

function DidCollide() {
    for (var i = 0; i < currBlock.rots[currr].size[0]; i++) {
        for (var j = 0; j < currBlock.rots[currr].size[1]; j++)
            if (currBlock.rots[currr].data[i][j] != 0 && (GameMap.Map[currx + j][curry + i] != 0 || GameMap.height <= (curry + i) * GameMap.tileL))
                return true;
    }
    return false;
}

function Collide() {
    for (var i = 0; i < currBlock.rots[currr].size[0]; i++) {
        for (var j = 0; j < currBlock.rots[currr].size[1]; j++)
            if (currBlock.rots[currr].data[i][j] != 0)
                GameMap.Map[j + currx][i - 1 + curry] = currBlock.color;
    }
    currx = 1;
    curry = 0;
    currr = 0;
    currBlock = next;
    NewNext();
    CheckRows();
}

function CheckRows() {
    for (var i = 0; i < GameMap.height / GameMap.tileL; i++) {
        var filled = true;
        for (var j = 0; j < GameMap.width / GameMap.tileL; j++) {
            if (GameMap.Map[j][i] == 0) {
                filled = false;
                break;
            }
        }
        if (filled) {
            for (var j = i; j > 0; j--) {
                for (var k = 0; k < GameMap.width / GameMap.tileL; k++)
                    GameMap.Map[k][j] = GameMap.Map[k][j - 1];
            }
            for (var k = 0; k < GameMap.width / GameMap.tileL; k++)
                GameMap.Map[k][0] = 0;
        }
    }
}

function NewNext() {
    var i = Math.floor(Math.random() * 7 + 1);
    switch (i) {
        case 1:
            next = blocks.I;
            break;
        case 2:
            next = blocks.J;
            break;
        case 3:
            next = blocks.L;
            break;
        case 4:
            next = blocks.O;
            break;
        case 5:
            next = blocks.S;
            break;
        case 6:
            next = blocks.T;
            break;
        case 7:
            next = blocks.Z;
            break;
    }
}