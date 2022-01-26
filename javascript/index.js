//Getting Button And Sound By ID
var button = document.getElementById("button");
var sound = document.getElementById("ngSound");

//Sound Set Up
sound.volume = 0.5;

//On Window Load, Set Button To Play Sound On Click
window.onload = function() {
    button.onclick = function() {
        sound.play();
        sound.addEventListener("ended", function() {
            window.location.href = "main.html";
        });
    }
}