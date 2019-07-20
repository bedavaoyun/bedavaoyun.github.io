window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", OnKeyPush);
    canvas.width = 1000;
    canvas.height = 800;
}
var canvas;
var ctx;
var motorOn = false;
var frenOn = true;
var cekmeOn = false;
var kolOn = false;
var tel = {
    x: 100,
    yo: 0,
    y: 100,
    vx: 0,
    vy: 0
}

function OnKeyPush(event) {
    if (event.keyCode == 84) {
        if (motorOn)
            motorOn = false;
        else
            motorOn = true;
    } else {
        frenOn = event.keyCode == 32;
        kolOn = event.keyCode == 40;
        cekmeOn = event.keyCode == 39;
    }
}

function Start() {
    setInterval(teleferik, 1000.0 / 100.0);
}

function teleferik() {
    ctx.fillStyle = "lightgray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(100, 100);
    ctx.lineTo(900, 600);
    ctx.stroke();

    ctx.fillStyle = "blue";
    ctx.fillRect(tel.x - 50, tel.y + 30, 100, 60);
    update();
    frenOn = false;
    kolOn = false;
    cekmeOn = false;
}

function update() {
    if (!frenOn && !kolOn && !cekmeOn) {
        console.log("hey1");
        tel.vx = 0.8;
        tel.vy = 0.5;
    } else if (frenOn) {
        console.log("hey2");
        tel.vx = 0;
        tel.vy = 0;
    } else if (cekmeOn) {
        console.log("hey3");
        tel.vx = 0;
        tel.vy = 0.5;
    } else if (!frenOn && !cekmeOn && motorOn) {
        console.log("hey4");
        tel.vx = -0.8;
        tel.vy = -0.5;
    }

    tel.x += tel.vx;
    tel.y += tel.vy;
}