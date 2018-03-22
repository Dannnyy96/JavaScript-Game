$(document).ready(function(){
	
	// game loop
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	let currentLevelNumber = 0;
	let currentLevel = LEVELS[currentLevelNumber];
	
	let keyStates = {};
	let moveTimer = 0;
	let enemyTimer = 0;
	
function frame() {
  context.clearRect(0, 0, canvas.width, canvas.height);
 //keep player x/y in the canvas
  player.x = Math.max(0, Math.min(currentLevel.cols - 1, player.x));
  player.y = Math.max(0, Math.min(currentLevel.rows - 1, player.y));
   //keep items x/y in the canvas
  items1.x = Math.max(0, Math.min(currentLevel.cols - 1, items1.x));
  items1.y = Math.max(0, Math.min(currentLevel.rows - 1, items1.y));
   //keep items x/y in the canvas
  items2.x = Math.max(0, Math.min(currentLevel.cols - 1, items2.x));
  items2.y = Math.max(0, Math.min(currentLevel.rows - 1, items2.y));
   //keep items x/y in the canvas
  items3.x = Math.max(0, Math.min(currentLevel.cols - 1, items3.x));
  items3.y = Math.max(0, Math.min(currentLevel.rows - 1, items3.y));
  //keep enemies in the map
  enemy3.x = Math.max(0, Math.min(currentLevel.cols - 1, enemy3.x));
  enemy3.y = Math.max(0, Math.min(currentLevel.rows - 1, enemy3.y));
  
  drawLevel(context, currentLevel);
  drawPlayer(context, currentLevel, player);

  //draw for level 1
  if(currentLevelNumber === 0){
	  for(i=0; i<items1.length; i++){
			drawItem(context, currentLevel, items1[i].x, items1[i].y);
	  }
	doesPlayerCollectItem(context, currentLevel, player, items1);
	
  }
  //draw for level 2
  else if(currentLevelNumber === 1){
	for(i=0; i<items2.length; i++){
		drawItem(context, currentLevel, items2[i].x, items2[i].y);
	}
	doesPlayerCollectItem(context, currentLevel, player, items2);
	
  } 
  //draw for level 3
  else if (currentLevelNumber === 2) {
	  for(i=0; i<enemy3.length; i++){
	  //draw enemies
	  drawEnemy(context, currentLevel, enemy3[i].x, enemy3[i].y);
	  }
	  
	  for(i=0; i<items3.length; i++){
		  //draw items
		  drawItem(context, currentLevel, items3[i].x, items3[i].y);
	  }
	  //check if player collects an item
	 doesPlayerCollectItem(context, currentLevel, player, items3);
	//check for collisions
	doesPlayerCollideWithEnemy(context, currentLevelNumber, player, enemy3);
	//enemy movement
	moveEnemies(enemy3);
	 
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
  
  if (playerTile === 0) {
  	context.fillText("NOTHING", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    
  } else if (playerTile === 1) {
    context.fillText("SOLID!!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
  }else if(playerTile === 2){
	 context.fillText("GOAL!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
		if(currentLevelNumber === 0){
			player.x = 0;
			player.y = 27;
		}
		else if(currentLevelNumber === 1){
			player.x = 0;
			player.y = 25;
		}
	currentLevelNumber = currentLevelNumber +1;
	currentLevel = LEVELS[currentLevelNumber];

  } 
  
  else {
    context.fillText("???", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
  }
  
     //movement
    if (moveTimer-- <= 0) {
    if (keyStates['ArrowUp'] && tileAbove === 0 || tileAbove === 2) {
      player.y--;
      moveTimer = 5;
	}else if(keyStates['ArrowUp'] && tileAbove === 1){
		player.y++;
	}
	
    if (keyStates['ArrowLeft'] && tileToLeft === 0 || tileToLeft === 2) {
      player.x--;
      moveTimer = 5;	 
    }else if(keyStates['ArrowLeft'] && tileToLeft === 1) {
		player.x++;
	}
	
    if (keyStates['ArrowDown'] && tileBelow === 0 || tileBelow === 2) {
      player.y++;
      moveTimer = 5;
    }else if(keyStates['ArrowDown'] && tileBelow === 1) {
		player.y--;
	}

    if (keyStates['ArrowRight'] && tileToRight === 0 || tileToRight === 2) {
      player.x++;
      moveTimer = 5;
    }else if (keyStates['ArrowRight'] && tileToRight === 1) {
		player.x--;
	}
  }
 
  
  function moveEnemies(enemyList) {
	   if (enemyTimer-- <= 0) {
  // Loop through each enemy that we need to move.
  for (var i = 0; i < enemyList.length; i++) {
    var enemy = enemyList[i];

    // Move the enemy 2 steps and then turn them clockwise.
    if (enemy.stepsTaken > 2) {
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
    }

    // Move the enemy depending on their direction.
    if (enemy.direction === 'up') {
      enemy.y -= 1;
	  enemyTimer = 5;
    } else if (enemy.direction === 'right') {
      enemy.x += 1;
	  enemyTimer = 5
    } else if (enemy.direction === 'down') {
      enemy.y += 1;
	  enemyTimer = 5
    } else if (enemy.direction === 'left') {
      enemy.x -= 1;
	  enemyTimer = 5
    }

    // Move the enemy along by a step.
    enemy.stepsTaken = enemy.stepsTaken + 1;
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