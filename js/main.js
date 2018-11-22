let player,
	playerCurrentHealthDisplay = document.getElementById("player-current-health"),
	playerMaxHealthDisplay = document.getElementById("player-max-health"),
	playerDefenceDisplay = document.getElementById("player-defence"),
	playerAttackDisplay = document.getElementById("player-attack"),
	playerSpeedDisplay = document.getElementById("player-speed"),
	playerGoldDisplay = document.getElementById("player-gold"),
	playerLevelDisplay = document.getElementById("player-level"),
	playerXpDisplay = document.getElementById("player-xp"),
	playerXpGoalDisplay = document.getElementById("player-xp-goal"),
	playerQuestPointsDisplay = document.getElementById("player-quest-points"),
	playerCurrentStaminaDisplay = document.getElementById("player-current-stamina"),
	playerMaxStaminaDisplay = document.getElementById("player-max-stamina"),
	playerStaminaBarValue = document.getElementById("player-stamina-bar-value"),
	locationNameDisplay = document.getElementById("location-name"),
	locationDescDisplay = document.getElementById("location-description"),
	locationImgDisplay = document.getElementById("location-img"),
	enemyTypeDisplay = document.getElementById("enemy-type"),
	enemyLevelDisplay = document.getElementById("enemy-level"),
	enemyCurrentHealthDisplay = document.getElementById("enemy-current-health"),
	enemyMaxHealthDisplay = document.getElementById("enemy-max-health"),
	enemyAttackDisplay = document.getElementById("enemy-attack"),
	enemySpeedDisplay = document.getElementById("enemy-speed"),
	actionLogDisplay = document.getElementById("printed-actions");
let currentEnemy = null;
let currentEvent = null;
let currentItem = null;

$(document).ready(function(){
	$("#character-selection-ui").show();
	GameManager.setupTooltips();
});

//UTILITY
function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function printAction(actionToPrint){
	let para = document.createElement("p");
	let node = document.createTextNode(actionToPrint);
	para.appendChild(node);
	actionLogDisplay.insertBefore(para, actionLogDisplay.childNodes[0]);
	if(actionLogDisplay.childElementCount === 30){actionLogDisplay.removeChild(actionLogDisplay.childNodes[9]);}
}