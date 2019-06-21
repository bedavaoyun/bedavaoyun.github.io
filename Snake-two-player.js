var canvas;
var context;
var width = 500;
var height = 500;
var FPS = 10;
var Mode = 1;

var player1 = {
    Pos: {
        X: 0,
        Y: 0
    },
    Velocity: {
        X: 0,
        Y: 0,
    },
    Width: 20,
    Height: 20,
    Tail: [],
    Length: 3,
    Color: "white",
    Move: function() {
        this.Pos.X += this.Velocity.X * this.Width;
        if (this.Pos.X >= width)
            this.Pos.X = 0;
        if (this.Pos.X < 0)
            this.Pos.X = width - this.Width;

        this.Pos.Y += this.Velocity.Y * this.Height;
        if (this.Pos.Y >= width)
            this.Pos.Y = 0;
        if (this.Pos.Y < 0)
            this.Pos.Y = height - this.Height;
    },
    Eat: function() {
        if (this.Pos.X == apple.X && this.Pos.Y == apple.Y) {
            this.Length++;
            this.Tail.push({ X: this.Pos.X, Y: this.Pos.Y });
            newApplePos();
        }
    },
    Draw: function() {
        context.fillStyle = this.Color;
        for (var i = 0; i < this.Length; i++) {
            context.fillRect(this.Tail[i].X, this.Tail[i].Y, this.Width, this.Height);
        }
    },
    NewTail: function() {
        this.Tail = [];
        for (var i = 0; i < this.Length; i++) {
            this.Tail.push({ X: this.Pos.X, Y: this.Pos.Y });
        }
    },
    UpdateTail: function() {
        for (var i = this.Length - 2; i >= 0; i--) {
            this.Tail[i + 1] = this.Tail[i];
        }
    },
    DidDie: function() {
        for (var i = 1; i < this.Length; i++) {
            if (this.Tail[i].X == this.Pos.X && this.Tail[i].Y == this.Pos.Y) {
                this.Length = 3;
                this.NewTail();
                break;
            }
        }
    },
    ToLeft: function() {
        this.Velocity.X = -1;
        this.Velocity.Y = 0;
    },
    ToUp: function() {
        this.Velocity.X = 0;
        this.Velocity.Y = -1;
    },
    ToRight: function() {
        this.Velocity.X = 1;
        this.Velocity.Y = 0;
    },
    ToDown: function() {
        this.Velocity.X = 0;
        this.Velocity.Y = 1;
    }
};

var apple = {
    X: 0,
    Y: 0,
    Width: 20,
    Height: 20,
    Color: "red",
    Draw: function() {
        context.fillStyle = this.Color;
        context.fillRect(this.X, this.Y, this.Width, this.Height);
    }
};

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    context = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
}

function OnKeyPush(evt) {
    if (Mode == 1)
        switch (evt.keyCode) {
            case 65:
                player1.ToLeft();
                break;
            case 87:
                player1.ToUp();
                break;
            case 68:
                player1.ToRight();
                break;
            case 83:
                player1.ToDown();
                break;
        }
    else {

    }
}

function OnePlayer() {
    SetCanvas();
    setInterval(GameOnePlayer, 1000 / FPS);
    newApplePos();
    player1.NewTail();
}

function newApplePos() {
    apple.X = Math.floor(Math.random() * (width / apple.Width)) * apple.Width;
    apple.Y = Math.floor(Math.random() * (height / apple.Height)) * apple.Height;
}

function TwoPlayer() {
    alert("Daha eklenmedi. Daha sonra tekrar deneyiniz.");
    //SetCanvas();
    //setInterval(GameTwoPlayer, 1000 / FPS);
}

function GameOnePlayer() {

    player1.Move();
    player1.Eat();

    context.fillStyle = "gray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player1.Draw();
    player1.UpdateTail();
    player1.DidDie();

    player1.Tail[0] = { X: player1.Pos.X, Y: player1.Pos.Y };

    apple.Draw();
}

function GameTwoPlayer() {}

function SetCanvas() {
    canvas.width = width;
    canvas.height = height;
}