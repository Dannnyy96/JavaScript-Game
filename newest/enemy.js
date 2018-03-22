let enemyImage = new Image();
enemyImage.src = "sprites/characters_1.png";


function drawEnemy(context, level, enemy) {
	//context.fillStyle = "#A9A9A9";
	//context.fillRect(enemy.x * level.tsize, enemy.y * level.tsize, level.tsize , level.tsize);
	if(enemy.direction == "down"){
		 context.drawImage(enemyImage, 144, 64, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "left"){
		 context.drawImage(enemyImage, 144, 80, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "right"){
		 context.drawImage(enemyImage, 144, 96, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	if(enemy.direction == "up"){
		 context.drawImage(enemyImage, 144, 112, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	}
}
let enemyBoss = { x: 25, y: 27, direction: "up"};
let enemyBoss2 = { x: 20, y: 3, direction: "up"};

	function drawEnemyBoss(context, level, enemy) {
	//context.fillStyle = "#A9A9A9";
	//context.fillRect(enemy.x * level.tsize, enemy.y * level.tsize, level.tsize , level.tsize);
	if(enemy.direction == "down"){
		 context.drawImage(enemyImage, 112, 64, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	else if(enemy.direction == "left"){
		 context.drawImage(enemyImage, 112, 80, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	else if(enemy.direction == "right"){
		 context.drawImage(enemyImage, 112, 96, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
	} 
	else if(enemy.direction == "up"){
		 context.drawImage(enemyImage, 112, 112, 16, 16, enemy.x*level.tsize, enemy.y*level.tsize, level.tsize, level.tsize);
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
  	var resetBoss = function (currentLevelNumber) {
		if (currentLevelNumber == 6) {
		
	} else{
	enemyBoss.x = LEVELS[currentLevelNumber].startPositionBoss.x;
	enemyBoss.y = LEVELS[currentLevelNumber].startPositionBoss.y;
	}
};
	
