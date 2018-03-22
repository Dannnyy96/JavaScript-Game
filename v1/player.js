
let player = { x: 0, y: 20 };
let items1 = [];
let items2 = [];
let items3 = [];
let enemy3 = [
  { x: 9,  y: 2,  direction: 'left', stepsTaken: 0 },
  { x: 24, y: 2,  direction: 'left',  stepsTaken: 0 },
  { x: 29, y: 10, direction: 'left',  stepsTaken: 0 }
];

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

function drawPlayer(context, level, player) {
	context.fillStyle = "#F00";
	context.fillRect(player.x * level.tsize, player.y * level.tsize, level.tsize, level.tsize);
}

function drawItem(context, level, x, y) {
	context.fillStyle = "#FFFF00";
	context.fillRect(x * level.tsize, y * level.tsize, level.tsize, level.tsize);
}
function drawEnemy(context, level, x, y) {
	context.fillStyle = "#A9A9A9";
	context.fillRect(x * level.tsize, y * level.tsize, level.tsize , level.tsize);
	
}

/*function storeEnemyPos(xVal, yVal, array){
	array.push({x: xVal, y: yVal});
}
//level 3
  storeEnemyPos(9, 2, enemy3);
  storeEnemyPos(24, 2, enemy3);
  storeEnemyPos(27, 10, enemy3);
*/
function storeItemPos(xVal, yVal, array){
	array.push({x: xVal, y: yVal});
}
//level 1
  storeItemPos(25, 3, items1);
  //level 2
  storeItemPos(2, 18, items2);
  storeItemPos(3, 12, items2);
  storeItemPos(26, 20, items2);  
  //level 3
  storeItemPos(9, 10, items3); 
  storeItemPos(27, 15, items3); 

var reset = function (currentLevelNumber) {
	if(currentLevelNumber === 0){
			player.x = 0;
			player.y = 20;
		}
		else if(currentLevelNumber === 1){
			player.x = 0;
			player.y = 27;
		}
		else if(currentLevelNumber === 2){
			player.x = 0;
			player.y = 27;
		}
};


