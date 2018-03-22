$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let currentLevelNumber = 0;
  let currentLevel = LEVELS[currentLevelNumber];
  let buttonPress = false;
  let keyStates = {};
  let moveTimer = 0;
  let moveTimerBoss = 0;
  let enemyTimer = 0;
  let invincibleTimer = 0;
  let invincibleTextTimeout = null;
  let count = 0;
  let time = "00:00:00";
  let milliseconds = 00;
  let seconds = 00;
  let minutes = 00;
  let hours = 00;
  let t;

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
	drawEnemyBoss(context, currentLevel, enemyBoss);

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
	doesPlayerCollideWithEnemyBoss(context, currentLevelNumber, player, enemyBoss);
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
	
	    //get the enemy tile, and the ones around the enemy
    const enemyTile = getTile(currentLevel, enemyBoss.x , enemyBoss.y);
    const tileAboveBoss = getTileAbove(currentLevel, enemyBoss.x, enemyBoss.y);
    const tileBelowBoss = getTileBelow(currentLevel, enemyBoss.x, enemyBoss.y);
    const tileToLeftBoss = getTileToLeft(currentLevel, enemyBoss.x, enemyBoss.y);
    const tileToRightBoss = getTileToRight(currentLevel, enemyBoss.x, enemyBoss.y);	

    context.textBaseline = "middle";
    context.textAlign = "center";

    context.fillStyle = "#FFF";

	function add() {
				milliseconds++;
			if (milliseconds >= 60) {
				milliseconds = 0;
				seconds++;
			if (seconds >= 60) {
				seconds = 0;
				minutes++;
			}	
			if (minutes >= 60) {
				minutes = 0;
				hours++;
			}
		}
		time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
		document.getElementById('timer').textContent = "Timer: " + time;
		
  }
		
		function timer() {
		t = setTimeout(add, 1000);
	}
      
    if(playerTile === 6 ) {
			if(currentLevel.items.length == 0){
    		  document.getElementById("door").play();
			  currentLevelNumber = currentLevelNumber + 1;
			  currentLevel = LEVELS[currentLevelNumber];
			  resetPlayer(currentLevelNumber);
			  resetBoss(currentLevelNumber);
			}
			else if(currentLevel.items.length > 0){
				$("#collectall").fadeIn(500, function() {
				  setTimeout(function() {
					$("#collectall").fadeOut();
				  }, 5000);
				});
			}
			if(currentLevelNumber == 5){
				alert("Congratulations! You completed all levels in a time of " + time);
			}
    }
	else if(playerTile === 9 ) {
     if(currentLevel.items.length == 0){
   			  document.getElementById("door").play();
			  currentLevelNumber = currentLevelNumber + 1;
			  currentLevel = LEVELS[currentLevelNumber];
			  resetPlayer(currentLevelNumber);
			  resetBoss(currentLevelNumber);
			}
			else if(currentLevel.items.length > 0){
				$("#collectall").fadeIn(500, function() {
				  setTimeout(function() {
					$("#collectall").fadeOut();
				  }, 5000);
				});
			}
			if(currentLevelNumber == 5){
				alert("Congratulations! You completed all levels in a time of " + time + " with " + lives + " left");
			}
    }
	else {
      
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
					resetPlayer(level);
					resetBoss(level);
					console.log("reloaded level, lives left: " + player.lives);
				}
			}else{
					array.splice(i,1);
			}
		}
	}
}

function doesPlayerCollideWithEnemyBoss(context, level, player, enemy){
		if(player.x === enemy.x && player. y === enemy.y){
			if(invincibleTimer <= 0){
				player.lives = player.lives - 1;
				document.getElementById('lives').textContent = "Lives: " + player.lives;
				if(player.lives == 0){
					alert("Game over! You collected " + player.score + " coins in a time of " + time);
					location.reload();
				}
				else {
					resetPlayer(level);
					resetBoss(level);
					console.log("reloaded level, lives left: " + player.lives);
				}
			}else{
					
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

	if(buttonPress == true) {
		timer();
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
		buttonPress = true;
      }

      if (keyStates['ArrowLeft'] && !isWall(tileToLeft)) {
        player.x--;
        moveTimer = 5;
		buttonPress = true;
      }

      if (keyStates['ArrowDown'] && !isWall(tileBelow)) {
        player.y++;
        moveTimer = 5;
		buttonPress = true;
      }

      if (keyStates['ArrowRight'] && !isWall(tileToRight)) {
        player.x++;
        moveTimer = 5;
		buttonPress = true;
      }
	  if(keyStates['Escape']){
		  location.reload();
	  }
    }
  
	if(buttonPress == true){
	 if (moveTimerBoss-- <= 0) {
	 //above right and can move down
	if(enemyBoss.x > player.x && enemyBoss.y < player.y && !isWall(tileBelowBoss)){
		enemyBoss.direction = "down";
		enemyBoss.y += 1;
		moveTimerBoss = 30;
	}
	//above right and cant move down
	else if(enemyBoss.x > player.x && enemyBoss.y < player.y && !isWall(tileToLeftBoss)){
		enemyBoss.x -= 1;
		enemyBoss.direction = "left";
		moveTimerBoss = 30;
	}
	//above left and can move down
    else if(enemyBoss.x < player.x && enemyBoss.y < player.y && !isWall(tileBelowBoss)){
		enemyBoss.y += 1;
		enemyBoss.direction = "down";
		moveTimerBoss = 30;
	}
	//above left and cannot move down(so move right)
    else if(enemyBoss.x < player.x && enemyBoss.y < player.y && !isWall(tileToRightBoss)){
		enemyBoss.x += 1;
		enemyBoss.direction = "right";
		moveTimerBoss = 30;
	}
	//below right and can move up
    if(enemyBoss.x > player.x && enemyBoss.y > player.y && !isWall(tileAboveBoss)){
		enemyBoss.y -= 1;
		enemyBoss.direction = "up";
		moveTimerBoss = 30;
	}
	//below right and cannot move up(so move left)
    else if(enemyBoss.x > player.x && enemyBoss.y > player.y && !isWall(tileToLeftBoss)){
		enemyBoss.x -= 1;
		enemyBoss.direction = "left";
		moveTimerBoss = 30;
	}
	//below left and can move up
    else if(enemyBoss.x < player.x && enemyBoss.y > player.y && !isWall(tileAboveBoss)){
		enemyBoss.y -= 1;
		enemyBoss.direction = "up";
		moveTimerBoss = 30;
	}
	//below left and cannot move up(so move right)
    else if(enemyBoss.x < player.x && enemyBoss.y > player.y&& !isWall(tileToRightBoss)){
		enemyBoss.x += 1;
		enemyBoss.direction = "right";
		moveTimerBoss = 30;
	}
	//level and can move right
    else if(enemyBoss.x < player.x && enemyBoss.y == player.y && !isWall(tileToRightBoss)){
		enemyBoss.x += 1;
		enemyBoss.direction = "right";
		moveTimerBoss = 30;
	}
	//level and can move left
    else if(enemyBoss.x > player.x && enemyBoss.y == player.y && !isWall(tileToLeftBoss)){
		enemyBoss.x -= 1;
		enemyBoss.direction = "left";
		moveTimerBoss = 30;
	}
	//level and can move up
    else if(enemyBoss.x == player.x && enemyBoss.y > player.y && !isWall(tileAboveBoss)){
		enemyBoss.y -= 1;
		enemyBoss.direction = "up";
		moveTimerBoss = 30;
	}
	//level and can move down
    else if(enemyBoss.x == player.x && enemyBoss.y < player.y && !isWall(tileBelowBoss)){
		enemyBoss.y += 1;
		enemyBoss.direction = "down";
		moveTimerBoss = 30;
	}
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
