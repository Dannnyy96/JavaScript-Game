$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let currentLevelNumber = 0;
  let currentLevel = LEVELS[currentLevelNumber];

  let keyStates = {};
  let moveTimer = 0;
  let enemyTimer = 0;
  let invincibleTimer = 0;
  let invincibleTextTimeout = null;
  let count = 0;

  // game loop
  function frame() {
    if (invincibleTimer === 1) {
      $("#invincible").fadeOut(500, function() {
        $("#noinvincible").fadeIn(500, function() {
          setTimeout(function() {
            $("#noinvincible").fadeOut();
          }, 5000);
        });
      });
    }

    if (invincibleTimer > 0) {
      invincibleTimer--;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
   //keep player x/y in the canvas
    player.x = Math.max(0, Math.min(currentLevel.cols - 1, player.x));
    player.y = Math.max(0, Math.min(currentLevel.rows - 1, player.y));

    drawLevel(context, currentLevel);
    drawPlayer(context, currentLevel, player);

	document.getElementById('score').textContent = "Coins collected: " + player.score;
	document.getElementById('lives').textContent = "Lives: " + player.lives;

    for(i = 0; i < currentLevel.items.length; i++){
      drawItem(context, currentLevel, currentLevel.items[i]);
    }

    for(i = 0; i < currentLevel.enemies.length; i++){
      drawEnemy(context, currentLevel, currentLevel.enemies[i]);
    }

	for(i = 0; i < currentLevel.invincible.length; i++){
      drawInvincible(context, currentLevel, currentLevel.invincible[i]);
    }

    doesPlayerCollectItem(context, currentLevel, player, currentLevel.items);
    doesPlayerCollideWithEnemy(context, currentLevelNumber, player, currentLevel.enemies);
	doesPlayerCollectInvincible(context, currentLevel, player, currentLevel.invincible);

    if (enemyTimer++ > 5) {
      moveEnemies(currentLevel.enemies);
      enemyTimer = 0;
    }

    //get the player tile, and the ones around the player
    const playerTile = getTile(currentLevel, player.x , player.y);
    const tileAbove = getTileAbove(currentLevel, player.x, player.y);
    const tileBelow = getTileBelow(currentLevel, player.x, player.y);
    const tileToLeft = getTileToLeft(currentLevel, player.x, player.y);
    const tileToRight = getTileToRight(currentLevel, player.x, player.y);

    context.textBaseline = "middle";
    context.textAlign = "center";

    context.fillStyle = "#FFF";

      
    if(playerTile === 6 ) {
			if(currentLevel.items.length == 0){
    		  document.getElementById("door").play();
			  currentLevelNumber = currentLevelNumber + 1;
			  currentLevel = LEVELS[currentLevelNumber];
			  reset(currentLevelNumber);
			}
			else if(currentLevel.items.length > 0){
				$("#collectall").fadeIn(500, function() {
				  setTimeout(function() {
					$("#collectall").fadeOut();
				  }, 5000);
				});
			}
    }
	else if(playerTile === 9 ) {
     if(currentLevel.items.length == 0){
   			  document.getElementById("door").play();
			  currentLevelNumber = currentLevelNumber + 1;
			  currentLevel = LEVELS[currentLevelNumber];
			  reset(currentLevelNumber);
			}
			else if(currentLevel.items.length > 0){
				$("#collectall").fadeIn(500, function() {
				  setTimeout(function() {
					$("#collectall").fadeOut();
				  }, 5000);
				});
			}
    }	else {
      
    }

	function doesPlayerCollideWithEnemy(context, level, player, array){
	for(i=0; i<array.length; i++){
		if(player.x === array[i].x && player. y === array[i].y){
			if(invincibleTimer <= 0){
				player.lives = player.lives - 1;
				document.getElementById('lives').textContent = "Lives: " + player.lives;
				if(player.lives == 0){
					alert("Game over! You collected " + player.score + " coins!");
					location.reload();
				}
				else {
					reset(level);
					console.log("reloaded level, lives left: " + player.lives);
				}
			}else{
					array.splice(i,1);
			}
		}
	}
}

function doesPlayerCollectInvincible(context, level, player, array){
	for(i=0; i<array.length; i++){
		if(player.x === array[i].x && player.y === array[i].y){
      array.splice(i,1);
      invincibleTimer += 300;

      $("#noinvincible").fadeOut(500, function() {
        $("#invincible").fadeIn(500);
      });
		}
	}
}


    if (moveTimer-- <= 0) {

      if (keyStates['ArrowUp']) {
        player.direction = 'up';
      }

      if (keyStates['ArrowLeft']) {
        player.direction = 'left';
      }

      if (keyStates['ArrowDown']) {
        player.direction = 'down';
      }

      if (keyStates['ArrowRight']) {
        player.direction = 'right';
      }

      if (keyStates['ArrowUp'] && !isWall(tileAbove)) {
        player.y--;
        moveTimer = 5;
      }

      if (keyStates['ArrowLeft'] && !isWall(tileToLeft)) {
        player.x--;
        moveTimer = 5;
      }

      if (keyStates['ArrowDown'] && !isWall(tileBelow)) {
        player.y++;
        moveTimer = 5;
      }

      if (keyStates['ArrowRight'] && !isWall(tileToRight)) {
        player.x++;
        moveTimer = 5;
      }
    }

    requestAnimationFrame(frame);
  }

  document.addEventListener("keydown", function(event) {
    keyStates[event.key] = true;
  });

  document.addEventListener("keyup", function(event){
    delete keyStates[event.key];
  });

  frame();
});
