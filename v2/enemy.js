function drawEnemy(context, level, enemy) {
	//context.fillStyle = "#A9A9A9";
	//context.fillRect(enemy.x * level.tsize, enemy.y * level.tsize, level.tsize , level.tsize);
	if(enemy.direction == "down"){
		 context.drawImage(playerImage, 144, 64, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "left"){
		 context.drawImage(playerImage, 144, 80, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "right"){
		 context.drawImage(playerImage, 144, 96, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "up"){
		 context.drawImage(playerImage, 144, 112, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	}
	}

function doesPlayerCollideWithEnemy(context, level, player, array){
	for(i=0; i<array.length; i++){
		if(player.x === array[i].x && player. y === array[i].y){
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
		}
	}
}

function moveEnemies(enemyList) {
  // Loop through each enemy that we need to move.
  for (var i = 0; i < enemyList.length; i++) {
    var enemy = enemyList[i];

    // Move the enemy 5 steps and then turn them clockwise.
    if (enemy.stepsTaken > 1) {
      if (enemy.direction === 'up') {
        enemy.direction = 'right';
      } else if (enemy.direction === 'right') {
        enemy.direction = 'down';
      } else if (enemy.direction === 'down') {
        enemy.direction = 'left';
      } else if (enemy.direction === 'left') {
        enemy.direction = 'up';
      } else {
        // If the enemy doesn't have a direction we just move them right.
        enemy.direction = 'right';
      }
	    
      enemy.stepsTaken = 0;
    }

    // Move the enemy depending on their direction.
    if (enemy.direction === 'up') {
      enemy.y -= 1;
    } else if (enemy.direction === 'right') {
      enemy.x += 1;
    } else if (enemy.direction === 'down') {
      enemy.y += 1;
    } else if (enemy.direction === 'left') {
      enemy.x -= 1;
    }

    // Move the enemy along by a step.
    enemy.stepsTaken = enemy.stepsTaken + 1;
  }
}