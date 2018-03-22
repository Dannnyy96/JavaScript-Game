let player = { x: 0, y: 20, score: 0, lives: 5, direction: "right"};

let playerImage = new Image();
playerImage.src = "sprites/characters_1.png";

let itemImage = new Image();
itemImage.src = "sprites/basictiles.png";

function drawPlayer(context, level, player) {
	//context.fillStyle = "#F00";
	//context.fillRect(player.x * level.tsize, player.y * level.tsize, level.tsize, level.tsize);
	if(player.direction == "down"){
		 context.drawImage(playerImage, 64, 0, 16, 16, player.x*level.tsize, player.y*level.tsize, level.tsize, level.tsize);
	}  
		
	if(player.direction == "left"){
		 context.drawImage(playerImage, 64, 16, 16, 16, player.x*level.tsize, player.y*level.tsize, level.tsize, level.tsize);
	}
	if(player.direction == "right"){
		 context.drawImage(playerImage, 64, 32, 16, 16, player.x*level.tsize, player.y*level.tsize, level.tsize, level.tsize);
	} 
	if(player.direction == "up"){
		 context.drawImage(playerImage, 64, 48, 16, 16, player.x*level.tsize, player.y*level.tsize, level.tsize, level.tsize);
	} 
}

function drawItem(context, level, item) {
	context.fillStyle = "#FFFF00";
	context.drawImage(itemImage, 64, 128, 16, 16, item.x*level.tsize, item.y*level.tsize, level.tsize, level.tsize);
}

var reset = function (currentLevelNumber) {
	player.x = LEVELS[currentLevelNumber].startPosition.x;
	player.y = LEVELS[currentLevelNumber].startPosition.y;
};

