window.onload = function() {
    myCanvas = document.getElementById("GameCanvas");
    myContext = myCanvas.myContext("2d");

    CreateMainMenu();
}

function CreateMainMenu() {
    myCanvas.addEventListener("click", OnMouseClick);
}

function OnMouseClick() {

}