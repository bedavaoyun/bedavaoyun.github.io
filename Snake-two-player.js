var canvas;
var context;
var width = 800;
var height = 800;
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
    Color: "green",
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
    },
    Update: function() {
        this.Move();
        this.Eat();
        this.Draw();
        this.UpdateTail();
        this.DidDie();

        this.Tail[0] = { X: this.Pos.X, Y: this.Pos.Y };
    }
};

var player2 = {
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
    Color: "blue",
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
    },
    Update: function() {
        this.Move();
        this.Eat();
        this.Draw();
        this.UpdateTail();
        this.DidDie();

        this.Tail[0] = { X: this.Pos.X, Y: this.Pos.Y };
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
    if (Mode == 2)
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
            case 100:
                player2.ToLeft();
                break;
            case 104:
                player2.ToUp();
                break;
            case 102:
                player2.ToRight();
                break;
            case 98:
                player2.ToDown();
                break;
        }
}

function OnePlayer() {
    Mode = 1;
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
    Mode = 2;
    SetCanvas();
    setInterval(GameTwoPlayer, 1000 / FPS);
    newApplePos();
    player1.Pos = { X: width / 4, Y: height / 2 };
    player1.NewTail();
    player2.Pos = { X: (width * 3) / 4, Y: height / 2 };
    player2.NewTail();
}

function GameOnePlayer() {

    context.fillStyle = "lightgray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player1.Update();

    apple.Draw();
}

function GameTwoPlayer() {

    context.fillStyle = "lightgray";
    context.fillRect(0, 0, canvas.width, canvas.height);

    player1.Update();
    player2.Update();

    apple.Draw();
}

function SetCanvas() {
    canvas.width = width;
    canvas.height = height;
}