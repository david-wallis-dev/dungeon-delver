let Enemies = {
	displayEnemy: function(){
		enemyTypeDisplay.innerHTML = currentEnemy.type;
		enemyLevelDisplay.innerHTML = currentEnemy.level;
		enemyCurrentHealthDisplay.innerHTML = currentEnemy.currentHealth;
		enemyMaxHealthDisplay.innerHTML = currentEnemy.maxHealth;
		enemyAttackDisplay.innerHTML = currentEnemy.attack;
		enemySpeedDisplay.innerHTML = currentEnemy.speed;
		locationImgDisplay.src = currentEnemy.imgsrc;
		locationNameDisplay.innerHTML = "In Combat";
		locationDescDisplay.innerHTML = "Slay the enemy!";
	},
	attackEnemy: function(){
		player.update();
		//DETERMINE TURN ORDER
		let playersTurnFirst;
		let actions = "";
		if(player.speed > currentEnemy.speed){playersTurnFirst = true;}
		else if(player.speed === currentEnemy.speed){
			if(getRandomInt(0,1) === 1){playersTurnFirst = true;}
			else{playersTurnFirst = false;}
		}
		else{playersTurnFirst = false;}
		//ATTACKS START
		if(playersTurnFirst){
			actions += "You are faster. You go first. You attack for " + player.attack + " damage!";
			currentEnemy.currentHealth -= player.attack;
			enemyCurrentHealthDisplay.innerHTML = currentEnemy.currentHealth;
			if(currentEnemy.currentHealth > 0){
				//CHECK DEFENCE
				actions += " They attack!";
				if(player.defence >= currentEnemy.attack){actions += " You blocked!";}
				else{
					actions += " You got hit for " + (currentEnemy.attack - player.defence) + " damage!";
					player.currentHealth -= (currentEnemy.attack - player.defence);
					if(player.currentHealth < 0){player.currentHealth = 0}
					playerCurrentHealthDisplay.innerHTML = player.currentHealth;
				}
			}
		}
		else{
			actions += "You are slower. You go second!";
			//CHECK DEFENCE
			if(player.defence >= currentEnemy.attack){actions += " You blocked!";}
			else{
				actions += " You got hit for " + (currentEnemy.attack - player.defence) + " damage!";
				player.currentHealth -= (currentEnemy.attack - player.defence);
				if(player.currentHealth < 0){player.currentHealth = 0}
				playerCurrentHealthDisplay.innerHTML = player.currentHealth;
			}
			actions += " You attack dealing " + player.attack + " damage!";
			currentEnemy.currentHealth -= player.attack;
			enemyCurrentHealthDisplay.innerHTML = currentEnemy.currentHealth;
		}
		if(currentEnemy.currentHealth <= 0){
			currentEnemy.currentHealth = 0;
			enemyCurrentHealthDisplay.innerHTML = currentEnemy.currentHealth;
			actions += " The enemy is dead. You gained " + currentEnemy.killxp + " XP!";
			player.xp += currentEnemy.killxp;
			Locations.changeButtons("#sidebar-combat-buttons", player.currentLocation.buttonsID);
			locationImgDisplay.src = player.currentLocation.imgsrc;
			currentEnemy.loot();
			currentEnemy = null;
		}
		printAction(actions);
		player.update();
	}
}