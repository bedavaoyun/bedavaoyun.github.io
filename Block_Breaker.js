var canvas;
var context;
var height = 500;
var width = 710;
var blocks = [];
var ball = {
    isMoving: false,
    relativeX: 75,
    x: 0,
    y: height - 30 - 5 - 50,
    v: {
        x: 0,
        y: 0
    },
    r: 50,
    startMoving: function () {
        this.isMoving = true;
        this.x = player.x + this.relativeX;
        this.v = {
            x:2,
            y:-2
        };
    },
    onEvent: function (event) {
        if (event.keyCode == 32)
            this.startMoving();
    },
    move: function () {
        if (this.isMoving) {
            this.x += this.v.x;
            this.y += this.v.y;
        }
    },
    bounce: function () {
        if (this.isMoving) {
            if (this.x < 0 || this.x > width - this.r)
                this.v.x *= -1;
            if (this.y < 0 || (this.x > player.x && this.x < player.x + player.w && this.y > height - player.h - this.r))
                this.v.y *= -1;
        }
    },
    draw: function () {
        fillStyle = "red";
        if(this.isMoving)
        drawEllipse(this.x, this.y, this.r, this.r);
        else
        drawEllipse(this.relativeX + player.x, this.y, this.r, this.r);
    },
    update: function() {
        this.move();
        this.bounce();
        this.draw();
    }
}

function drawEllipse(x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    context.beginPath();
    context.moveTo(x, ym);
    context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    context.closePath(); // not used correctly, see comments (use to close off open path)
    context.fill();
}
var player = {
    color: "green",
    w: 150,
    h: 30,
    speed: 25,
    x: (width - 150) / 2,
    y: height - 30 - 5,
    draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    },
    move: function (evt) {
        switch (evt.keyCode) {
            case 37: this.x -= this.speed; break;
            case 39: this.x += this.speed; break;
        }
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
    setInterval(GameLoop, 1000 / 120);
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
    ball.update();
}
function OnKeyPush(event) {
    player.move(event);
    ball.onEvent(event);
}