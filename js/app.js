
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/longhorn.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // make the enemis loop from left to right
    if (this.x >= 515) {
      this.x = -70;
    }

    checkCollision(this);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x , y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.sprite = 'images/ousooners.png';

};

Player.prototype.update = function() {

}

// Draw player on canvas

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function(keyPress) {
  if (keyPress == 'left') {
    this.x -= this.speed;
  }
  if (keyPress =='up') {
    this.y -= this.speed - 25;
  }
  if (keyPress == 'right') {
    this.x += this.speed;
  }
  if (keyPress == 'down') {
    this.y += this.speed - 25;
  }

  console.log('keyPress is: ' + keyPress);
};

//check if player has won game by reaching top

Player.prototype.checkWin = function(checkWin) {

if(this.y + -45 <= 0) {
 this.x = 170;
 this.y = 390;
 window.alert('Good work!');

}
// keep player on the canvas
// OU overhangs on top and dispares on right

  if(this.y > 405 ) { // bottom
 this.y = 405;
}
if (this.y < 2.5) { // top
 this.y = 2.5;
}
if (this.x > 331) { // right side
 this.x = 331;
}
if (this.x < 2.5) { // left side
 this.x = 2.5;
  }

};

var checkCollision = function(anEnemy) {
  // Collision check for eney on player
  if (
    player.y + 126 >= anEnemy.y + 85
    && player.x + 35 <= anEnemy.x + 92
    && player.y + 70 <= anEnemy.y + 124
    && player.x + 79 >= anEnemy.x + 9) {
      console.log('collided');
      player.x = 182;
      player.y = 450;
    }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(170, 390, 50);
var enemy = new Enemy(0, Math.random() * 197 + 65, Math.random() * 256);

allEnemies.push(enemy);

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
    player.checkWin();
});
