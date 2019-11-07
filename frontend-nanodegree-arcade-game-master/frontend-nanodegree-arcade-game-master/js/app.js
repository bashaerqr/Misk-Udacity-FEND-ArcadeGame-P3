let gemCounter = 0;
score = document.querySelector('.score > span');

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    move = this.speed * dt;
    this.x += move;

    if (this.x > 500) {
        this.x = -100;
    }

    // Check the collisions between player & enemies on axises
    if (player.x < this.x + 80 && player.x + 80 > this.x &&
        player.y < this.y + 60 && 60 + player.y > this.y) {
        console.log('och');
        player.x = 202;
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*----------------------------------player class-----------------------------------------------*/
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    //to avoid the player go out the game ground
    maxlength = 400;
    
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 100;

    } else if (keyPress == 'right' && this.x < maxlength) {
        this.x += 100;

    } else if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;

    } else if (keyPress == 'down' && this.y < maxlength) {
        this.y += 83;
    }
};

/*----------------------------------Gem class-----------------------------------------*/
var Gem = function (x, y, gemImg) {
   this.gemImg = gemImg;
   this.randomX=[0, 100, 200, 300, 400];
   this.x = this.randomX[Math.floor(Math.random() * this.randomX.length)];
   this.y = y;
};

Gem.prototype.update = function (dt) {
    //the player will collect the gem from the game to win
    if (player.x < gem.x + 80 && player.x + 80 > gem.x &&
        player.y < gem.y + 60 && 60 + player.y > gem.y) {
        gem.x = -100;
        gemCounter++;
        console.log('yaaas');
    }

    if (player.x < gem2.x + 80 && player.x + 80 > gem2.x &&
        player.y < gem2.y + 60 && 60 + player.y > gem2.y) {
        gem2.x = -100;
        gemCounter++;
        console.log('yaaas');
    }

    if (player.x < gem3.x + 80 && player.x + 80 > gem3.x &&
        player.y < gem3.y + 60 && 60 + player.y > gem3.y) {

        gem3.x = -100;
        gemCounter++;
        console.log('yaaas');
    }

    //End the game (you win)
    let show = document.querySelector('.show');
    score.innerText = gemCounter;
    if (gemCounter == 3) {
        show.style.display = "block";
    }
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
/*----------------------------------enemy obj-----------------------------------------------*/
var allEnemies = [];

// Location enemies on the y axis 
var enemyLocation = [68, 150, 225];

// For each enemy located on the y axis with x axis from 0 and randomly speed 
enemyLocation.forEach(function (y) {
    this.speed = 100 + Math.floor(Math.random() * 500);
    enemy = new Enemy(0, y, this.speed);
    allEnemies.push(enemy);
});

/*---------------------------------player obj------------------------------------------------*/
var player = new Player(200, 400);

/*---------------------------------Gem obj------------------------------------------------*/
var gem = new Gem(this.x,70,'images/Gem Orange.png');
var gem2 = new Gem(this.x,-3,'images/Gem Blue.png');
var gem3 = new Gem(this.x,250,'images/Gem Green.png');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
