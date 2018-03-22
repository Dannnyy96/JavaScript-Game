$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  let currentLevelNumber = 0;
  let currentLevel = LEVELS[currentLevelNumber];

  let keyStates = {};
  let moveTimer = 0;
  let enemyTimer = 0;
  let count = 0;
  let isInvincible = false;
  
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

    if (playerTile === 0) {
     // context.fillText("NOTHING", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    } else if (playerTile === 1) {
     // context.fillText("SOLID!!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    } else if(playerTile === 6 ) {
     // context.fillText("GOAL!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
      document.getElementById("door").play();
	  currentLevelNumber = currentLevelNumber + 1;
      currentLevel = LEVELS[currentLevelNumber];
      reset(currentLevelNumber);
    }
	else if(playerTile === 9 ) {
     // context.fillText("GOAL!", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
      currentLevelNumber = currentLevelNumber + 1;
      currentLevel = LEVELS[currentLevelNumber];
      reset(currentLevelNumber);
    }	else {
      //context.fillText("???", player.x * currentLevel.tsize + currentLevel.tsize / 2, player.y * currentLevel.tsize + currentLevel.tsize / 2);
    }
	
	function doesPlayerCollideWithEnemy(context, level, player, array){
	for(i=0; i<array.length; i++){
		if(player.x === array[i].x && player. y === array[i].y){
			if(isInvincible == false){
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

function loading(){
					setTimeout(function(){ 
						isInvincible = false; 
						console.log("no longer invincible");
					}, 10000);
				}


function doesPlayerCollectInvincible(context, level, player, array){
	for(i=0; i<array.length; i++){
		if(player.x === array[i].x && player.y === array[i].y){	
				array.splice(i,1);
				document.getElementById("invincible").innerHTML = "Invincible collected, you are now invincible for 10seonds";
				setTimeout(function(){
					$("#invincible").hide();
						setTimeout(function(){
							document.getElementById("noinvincible").innerHTML = "No longer invincible";
								setTimeout(function(){
									$("#noinvincible").hide();
								},3000);	
						},1000);
				}, 9000);	
				console.log("Invincible collected, you are now invincible for 10 seconds");
				isInvincible = true;
				loading();					 	
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