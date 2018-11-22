function Player(char, health, defence, attack, speed){
	this.char = char;
	this.maxHealth = health;
	this.currentHealth = this.maxHealth;
	this.defence = defence;
	this.attack = attack;
	this.speed = speed;
	this.maxStamina = 10;
	this.currentStamina = this.maxStamina;
	this.gold = 0;
	this.xp = 0;
	this.targetXP = 20;
	this.level = 1;
	this.questPoints = 0;
	this.stats = {
		kills: {
			spider: 0,
			bear: 0,
			bandit: 0,
			draugr: 0,
			skeever: 0,
			skeleton: 0,
			werewolf: 0
		},
		crafts: {
			leather: 0,
			bronze: 0,
			iron: 0
		},
		explore: {
			lonelyHollow: 0,
			bleakfallsBarrow: 0,
			banditKeep: 0
		}
	}
	this.currentLocation = Locations.town;
	this.equipSlots = ["empty", "empty", "empty", "empty"];
	this.notEnoughStamina = function(){
		printAction("Not enough Stamina. You need to rest.");
	}
	this.update = function(){
		if(this.xp >= this.targetXP){this.levelUp();}
		if(this.currentStamina < 0){this.currentStamina = 0;}
		playerCurrentHealthDisplay.innerHTML = this.currentHealth;
		playerMaxHealthDisplay.innerHTML = this.maxHealth;
		playerDefenceDisplay.innerHTML = this.defence;
		playerAttackDisplay.innerHTML = this.attack;
		playerSpeedDisplay.innerHTML = this.speed;
		playerGoldDisplay.innerHTML = this.gold;
		playerLevelDisplay.innerHTML = this.level;
		playerXpDisplay.innerHTML = this.xp;
		playerXpGoalDisplay.innerHTML = this.targetXP;
		playerCurrentStaminaDisplay.innerHTML = this.currentStamina;
		playerMaxStaminaDisplay.innerHTML = this.maxStamina;
		playerStaminaBarValue.style.width = ((this.currentStamina / this.maxStamina) * 100) + "%";
		playerQuestPointsDisplay.innerHTML = this.questPoints;
		if(this.currentHealth <= 0){
			$("#ui-container").hide();
			$("#game-ui-gameover").fadeIn(3000);
		}
	},
	this.drinkPotion = function(pot){
		if(pot === "Health Potion"){
			this.currentHealth += 5;
			player.inv.remove(Items.consumables.health_potion, 1);
			if(this.currentHealth > this.maxHealth){this.currentHealth = this.maxHealth;}
		}
		else{
			this.currentStamina += 5;
			player.inv.remove(Items.consumables.stamina_potion, 1);
			if(this.currentStamina > this.maxStamina){this.currentStamina = this.maxStamina;}
		}
		this.update();
	}
	this.levelUp = function(){
		this.level++;
		this.xp = 0;
		this.targetXP += 20;
		//upgrade all stats
		this.maxHealth++;
		this.currentHealth = this.maxHealth;
		this.maxStamina++;
		this.currentStamina = this.maxStamina;
		printAction("You are now level " + this.level + "! (Health and Stamina +1)");
		player.update();
	},
	this.openEquipment = function(){
		$("#player-equip").toggle();		
	}
	this.openQuestLog = function(){
		$("#quest-log").toggle();
	}
	this.giveItems = function(){
		player.inv.add(Items.green_herb, 500);
		player.inv.add(Items.red_herb, 500);
		player.inv.add(Items.leather, 500);
		player.inv.add(Items.copper_ore, 500);
		player.inv.add(Items.tin_ore, 500);
		player.inv.add(Items.iron_ore, 500);
	}
	this.craftItem = function(itemToCraft){
		let hasFreeSpace = false;
		for(let i = 0; i < player.inv.slots.length; i++){
			if(player.inv.slots[i] === "empty"){
				hasFreeSpace = true;
				break;
			}
		}

		if(hasFreeSpace){
			//update player crafting stats
			if(itemToCraft.name.match(/Leather/g)){player.stats.crafts.leather += 1;}
			else if(itemToCraft.name.match(/Bronze/g)){player.stats.crafts.bronze += 1;}
			else if(itemToCraft.name.match(/Iron/g)){player.stats.crafts.iron += 1;}

			let uniqueItems = [];
			for(let i = 0; i < itemToCraft.craftingReq.length; i++){
				for(let j = 0; j < player.inv.slots.length; j++){
					if(player.inv.slots[j].name === itemToCraft.craftingReq[i].name && player.inv.slots[j].count >= itemToCraft.craftingReq[i].amount){
						uniqueItems.push(itemToCraft.craftingReq[i]);
						break;
					}
				}
			}
			if(uniqueItems.length === itemToCraft.craftingReq.length){
				for(let i = 0; i < uniqueItems.length; i++){
					player.inv.remove(eval(uniqueItems[i].object), uniqueItems[i].amount);
				}
				player.inv.add(itemToCraft, 1);
				printAction("You crafted: " + itemToCraft.name);
			}
			else {
				printAction("You do not have all the required items.");
			}
		}
		else {
			printAction("Unable to craft, Your inventory is full.");
		}
	}
	this.inv = {
		slots: ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty",
				"empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
		add: function(item, amount){
			for(let i = 0; i < amount; i++){
				currentItem = item;
				let itemAdded = false;
				if(currentItem.isStackable){
					for(let i = 0; i < this.slots.length; i++){
						if(this.slots[i] != "empty" && this.slots[i].isStackable && this.slots[i].name === currentItem.name){
							this.slots[i].count++;
							itemAdded = true;
							this.displayInv();
							break;
						}
						else{continue;}
					}
					if(itemAdded === false){
						for(let i = 0; i < this.slots.length; i++){
							if(this.slots[i] === "empty"){
								this.slots[i] = currentItem;
								itemAdded = true;
								this.displayInv();
								break;
							}
							else{continue;}
						}
					}
				}
				else {
					for(let i = 0; i < this.slots.length; i++){
						if(this.slots[i] === "empty"){
							this.slots[i] = currentItem;
							itemAdded = true;
							this.displayInv();
							break;
						}
						else{continue;}
					}
				}
				if(itemAdded === false){
					printAction("Cannot add item, inventory is full! (" + currentItem.name + " is dropped)");
				}
				currentItem = null;
			}
		},
		remove: function(item, amount){
			for(let i = 0; i < amount; i++){
				currentItem = item;
				let itemRemoved = false;
				if(currentItem.isStackable){
					for(let i = 0; i < this.slots.length; i++){
						if(this.slots[i] != "empty" && this.slots[i].isStackable && this.slots[i].name === currentItem.name){
							if(this.slots[i].count === 1){
								this.slots[i] = "empty";
							}
							else{
								this.slots[i].count--;
							}
							itemRemoved = true;
							this.displayInv();
							break;
						}
						else{continue;}
					}
				}
				else {
					for(let i = 0; i < this.slots.length; i++){
						if(this.slots[i] != "empty" && this.slots[i].name === currentItem.name){
							this.slots[i] = "empty";
							itemRemoved = true;
							this.displayInv();
							break;
						}
						else{continue;}
					}
				}
				if(itemRemoved === false){
					printAction("Cannot remove item as its not in your inventory!");
				}
				currentItem = null;
			}
		},
		displayInv: function(){
			for(let i = 0; i < this.slots.length; i++){
				if(this.slots[i] === "empty"){
					$("#inv-slot-"+i+" .inv-slot-name").text("");
					$("#inv-slot-"+i+" .inv-slot-count").text("");
					$("#inv-slot-"+i+" img").attr("src", "");
					$("#inv-slot-"+i).css('background-color', 'rgba(0,0,0,0.6)');
				}
				else{
					$("#inv-slot-"+i+" .inv-slot-name").text(this.slots[i].name);
					if(this.slots[i].count === 1){
						$("#inv-slot-"+i+" .inv-slot-count").text("");
					}
					else{
						$("#inv-slot-"+i+" .inv-slot-count").text(this.slots[i].count);
					}
					$("#inv-slot-"+i+" img").attr("src", this.slots[i].imgsrc);
					$("#inv-slot-"+i).css('background-color', this.slots[i].rarity);
				}
			}
			for(let i = 0; i < player.equipSlots.length; i++){
				if(player.equipSlots[i] === "empty"){
					$("#equip-slot-"+i+" .inv-slot-name").text("");
					$("#equip-slot-"+i+" .inv-slot-count").text("");
					$("#equip-slot-"+i+" img").attr("src", "");
					$("#equip-slot-"+i).css('background-color', 'rgba(0,0,0,0.6)');
				}
				else{
					$("#equip-slot-"+i+" .inv-slot-name").text(player.equipSlots[i].name);
					$("#equip-slot-"+i+" .inv-slot-count").text(player.equipSlots[i].count);
					$("#equip-slot-"+i+" img").attr("src", player.equipSlots[i].imgsrc);
					$("#equip-slot-"+i).css('background-color', player.equipSlots[i].rarity);
				}
			}
		}
	}
}