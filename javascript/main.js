import Player from './modules/player.js'
import Sounds from './modules/sounds.js'
import Enemy from './modules/enemy.js'
import Songs from './modules/songs.js'
import Base from './modules/base.js'

//Getting Access To Canvas
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

//Set Canvas Width And Height To The Window's Inner Width And Height
c.width = window.innerWidth;
c.height = window.innerHeight;

//Getting Images
var baseImg = document.getElementById("base");
var playerImg = document.getElementById("player");
var enemyImg = document.getElementById("enemy");

//Getting Music
var songs = [
    document.getElementById("song1"),
    document.getElementById("song2"),
    document.getElementById("song3")
];

//Getting Sounds
var sounds = [
    document.getElementById("sound1"),
    document.getElementById("sound2")
];

//Lower Volume Of Music/Sounds
songs.forEach((song) => {
    song.volume = 0.5;
});
sounds.forEach((sound) => {
    sound.volume = 0.5;
});

//Score Set Up / Difficulty Set Up
ctx.font = "30px Arial";
ctx.fillStyle = "cyan";
var score = 0;
var difficulty = 3000; //3 Seconds Default Spawn Time For Enemies

//Earth (Base)
var earth = new Base(10, baseImg, c, ctx);

function BaseActivate() 
{
    earth.DrawBase();
}

// Moon (Player)
var moon = new Player(8, playerImg, c, ctx);

//Getting Canvas Offset Positions
var cOffsetX = c.offsetLeft;
var cOffsetY = c.offsetTop;
var isDraggable = false;

//Declaring Starting Player Positions
var playerX, playerY;

//Mouse Handle Events
function PlayerMouseEvents()
{
    c.onmousedown = function(e)
    {
        var mouseX = e.pageX - cOffsetX;
        var mouseY = e.pageY - cOffsetY;
    
        if (mouseX >= (playerX - moon.Width) &&
            mouseX <= (playerX + moon.Width) &&
            mouseY >= (playerY - moon.Height) &&
            mouseY <= (playerY + moon.Height)) {
          isDraggable = true;
        }
    };
    c.onmouseup = function(e)
    {
        isDraggable = false;
    };
    c.onmouseout = function(e)
    {
        isDraggable = false;
    };
    c.onmousemove = function(e)
    {
        if (isDraggable) {
            playerX = e.pageX - cOffsetX;
            playerY = e.pageY - cOffsetY;
        }
    };
}

function PlayerActivate() 
{
    //DrawPlayer Sets Starting Position And Ofc Draws Him At Thats Position
    moon.DrawPlayer();

    //Getting Current Position (Starting Player Position)
    playerX = moon.x;
    playerY = moon.y;

    //Activate Event Handlers
    PlayerMouseEvents();
}

// Meteor (Enemy)
var enemies = []; 
var intervalID;
function StartEnemyInterval(diff) 
{
    //Adds An Enemy Every Second
    intervalID = setInterval(() => {
        var randEnemySize = Math.floor((Math.random() * 10) + 5);
        var cloneImg = enemyImg.cloneNode(true); //Clones The enemyImg So Every Enemy Has Its Own Image To Reference

        //Randomizing X and Y (Random Starting Position)
        var x, y;
        if (Math.random() < 0.5)
        {
            x = Math.floor(Math.random() < 0.5 ? 0 - randEnemySize : c.width + randEnemySize);
            y = Math.floor(Math.random() * c.height);
        } 
        else 
        {
            x = Math.floor(Math.random() * c.width);
            y = Math.floor(Math.random() < 0.5 ? 0 - randEnemySize : c.height + randEnemySize);
        }

        //Calculating The Angle And Setting Velocity
        var angle = Math.atan2(
            c.height / 2 - y,
            c.width / 2- x
        )
        var velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        //Creating New Enemy
        enemies.push(new Enemy(x, y, randEnemySize, cloneImg, c, ctx, velocity));
    }, diff)
}

function StopEnemyInterval() 
{
    clearInterval(intervalID);
}

// Play  One Of 3 Songs
var music = new Songs(songs);

function PlaySong() 
{
    music.PlayRandSong();
}

// Play  One Of 2 Sounds
var sound = new Sounds(sounds);

function PlaySound() 
{
    sound.PlayRandSound();
}

//On Load
window.onload = function() 
{
    BaseActivate();
    PlayerActivate();
    StartEnemyInterval(difficulty);
    PlaySong();

    //Time Interval To Spawn Enemies And Check For Player Movement
    setInterval(function() {

        //Reset Canvas And Redraw
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillText("Score: " + score, 10, 40);
        enemies.forEach((enemy, index) => {
            enemy.RedrawEnemy();

            //Calculate Distance Between Player And Enemy, If Hit Remove Enemy
            var distMoon = Math.hypot(moon.PlayerX - enemy.EnemyX, moon.PlayerY - enemy.EnemyY);
            if (distMoon - enemy.ResizePercent - moon.ResizePercent < 10)
            {
                PlaySound();
                enemies.splice(index, 1);
                score++;
                //With Every Score, Increase Difficulty (If Statement Stops It From Going To Negative Values)
                if (difficulty > 100) 
                {
                    difficulty = difficulty - 100; //Removes 100 MillSeconds (Decreases Time For Enemies To Spawn)
                }
                //Restart Enemy Spawn Interval
                StopEnemyInterval();
                StartEnemyInterval(difficulty);
            }

            //Calculate Distance Between Base And Enemy, If Hit End Game
            var distEarth = Math.hypot(earth.BaseX - enemy.EnemyX, earth.BaseY - enemy.EnemyY);
            if (distEarth - enemy.ResizePercent - earth.ResizePercent < 80)
            {
                window.location.href = "index.html";
                alert("Earth was hit! Game Over!")
            }

        }); 
        earth.RedrawBase();
        moon.RedrawPlayer(playerX, playerY); 

    }, 100/30);
}