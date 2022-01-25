//TO DO
//Getting Button And Sound By ID
var button = document.getElementById("ngButton");
var sound = document.getElementById("ngSound");

//On Window Load, Set Button To Play Sound On Click
window.onload = function() {
    button.onclick = function() {
        sound.play();
        sound.addEventListener("ended", function(){ 
            button.click;
        });
    }
}