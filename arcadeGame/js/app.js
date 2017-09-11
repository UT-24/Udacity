
"use strict";

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //enemies start at the leftmost corner of the canvas
    this.x = 0;

    //enemies can be in second or third row from top of grid (tiled portion)
    this.y = (Math.floor(Math.random() * 2) + 1) * 83;

    //enemies can have a speed in multiple of 5
    this.speed = Math.floor(Math.random() * 5) + 1;

    //store enemy object's width and height, used later for checking collisions
    this.width = Resources.get(this.sprite).width;
    this.height = Resources.get(this.sprite).height;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers

    //if the x value is greater than end of canvas, reset it
    if (this.x > ctx.canvas.width) {
        this.x = 0;
    }
    //otherwise, move the enemy in x direction
    else {
        this.x += this.speed * 50 * dt; 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //set the x value to leftmost corner of screen
    this.x = 0;

    //set the y value to 6th row from the top (start position in y direction) 
    this.y = 400;

    this.sprite = 'images/char-boy.png';

    //maintain score for game
    this.score = 0;

    //store player object's width and height, used later for checking collisions
    this.width = Resources.get(this.sprite).width;
    this.height = Resources.get(this.sprite).height;

}

//checks input and player position and changes the coordinates of the player appropriately
Player.prototype.handleInput = function(keyCode) {
    var playerChange = 0;

    if (keyCode === 'left') {
       //every left or right movement, moves the player by 101 px
       playerChange = this.x - 101; 

        if (playerChange > -20) {
            this.x = playerChange;
        }
    }
    else if (keyCode === 'right') {
        playerChange = this.x + 101;
    
        if (playerChange < 505) {
            this.x = playerChange;
        }
    }
    else if (keyCode === 'up') {
         //every up or down movement, moves the player by 83 px
        playerChange = this.y - 83;

         if (playerChange > -20) {

            //if player's Y is beyond 68 pixel, player has reached the water safely, increment score and reset the player
            if (playerChange < 68) {
                this.score++;
                this.y = 400;
            }
            else {
                this.y = playerChange;
            }
        }
    }
     else if (keyCode === 'down') {
       playerChange = this.y + 83;

         if (playerChange < 478) {
            this.y = playerChange;
        }
    }
}

Player.prototype.update = function() {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// There are 3 resusable enemy objects and 1 reusable player object
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
var allEnemies = [bug1, bug2, bug3];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
