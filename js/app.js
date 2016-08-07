
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
  displayScoreLevel(score, gameLevel);

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

// Player score count function
  var displayScoreLevel = function(aScore, aLevel) {
  var canvas = document.getElementsByTagName('canvas');
  var firstCanvasTag = canvas[0];

  // Update player score by adding it to div element
  scoreLevelDiv.innerHTML = 'Score: ' + aScore + ' / ' + 'Level: ' + aLevel;
  document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
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

    // check if player has won game by reaching top
    // Add 1 point if player wins, increase difficulty if with every pass score

    if(player.y + -45 <= 0) {
      player.x = 170;
      player.y = 390;
      window.alert('Good work!');

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 505, 171);

      score += 1;
      gameLevel += 1;
      console.log('current score: ' + score + ', current level: ' + gameLevel);
      increaseDifficulty(score);


    }
    // keep player on the canvas
    // OU overhangs on top and dispares on right

    if(player.y > 405 ) { // bottom
      player.y = 405;
    }
    if (player.y < 2.5) { // top
      player.y = 2.5;
    }
    if (player.x > 331) { // right side
      player.x = 331;
    }
    if (player.x < 2.5) { // left side
      player.x = 2.5;
    }

};


// Add number of enemies as player score increases

var increaseDifficulty = function(numEnemies) {
// clear all enemies from last canvas

  allEnemies.length = 0;

// create/load  new group of enimies
  for (var i = 0; i <= numEnemies; i++) {
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

    allEnemies.push(enemy);
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// create score, gameLevel and enemy var

var allEnemies = [];
var player = new Player(170, 390, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
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
});
