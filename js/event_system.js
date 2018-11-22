let EventSystem = {
	generateEvent: function(location){
		let index = getRandomInt(0, location.events.length - 1);
		locationImgDisplay.src = location.events[index].imgsrc;
		printAction(location.events[index].printedAction);
		location.events[index].effect();
		player.update();
		Locations.changeButtons(location.buttonsID, "#sidebar-event-buttons");
		if(location.events[index].type === "ore" && location.foundOre === true){
			location.events.pop();
		}
	},
	generateEnemy: function(location){
		let index = getRandomInt(0, location.enemies.length - 1);
		currentEnemy = location.enemies[index];
		currentEnemy.currentHealth = currentEnemy.maxHealth;
		Enemies.displayEnemy();
		Locations.changeButtons(location.buttonsID, "#sidebar-combat-buttons");
		printAction("You encounter a " + currentEnemy.type + "!");
	}
}