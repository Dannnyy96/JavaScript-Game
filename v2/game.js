$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let currentLevelNumber = 0;
  let currentLevel = LEVELS[currentLevelNumber];

  let keyStates = {};
  let moveTimer = 0;
  let enemyTimer = 0;
	
  // game loop
  function frame() {
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

    doesPlayerCollectItem(context, currentLevel, player, currentLevel.items);
    doesPlayerCollideWithEnemy(context, currentLevelNumber, player, currentLevel.enemies);

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

    if (playerTile === 0) {
     // context.fillText("NOTHING", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    } else if (playerTile === 1) {
     // context.fillText("SOLID!!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    } else if(playerTile === 6 || playerTile === 9) {
     // context.fillText("GOAL!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
      currentLevelNumber = currentLevelNumber + 1;
      currentLevel = LEVELS[currentLevelNumber];
      reset(currentLevelNumber);
    } else {
      context.fillText("???", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
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