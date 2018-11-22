let GameManager = {
	inShopSellScreen: false,
	selling: function(state){
		this.inShopSellScreen = state;
	},
	characterSelected: function(character){
		if(character === "warrior"){player = new Player("warrior", 10, 6, 4, 2);}
		else if(character === "mage"){player = new Player("mage", 10, 2, 6, 4);}
		else if(character === "theif"){player = new Player("theif", 10, 2, 4, 6);}
		this.setupGameUI();
	},
	setupGameUI: function(){
		$("#character-selection-ui").slideUp();
		$("#ui-container").delay(500).slideDown(500);
		$("#player-img").attr("src", "img/" + player.char + ".png");
		playerMaxHealthDisplay.innerHTML = player.maxHealth;
		playerCurrentHealthDisplay.innerHTML = player.currentHealth;
		playerDefenceDisplay.innerHTML = player.defence;
		playerAttackDisplay.innerHTML = player.attack;
		playerSpeedDisplay.innerHTML = player.speed;
		playerGoldDisplay.innerHTML = player.gold;
		playerLevelDisplay.innerHTML = player.level;
		playerXpDisplay.innerHTML = player.xp;
		playerXpGoalDisplay.innerHTML = player.targetXP;
		playerCurrentStaminaDisplay.innerHTML = player.currentStamina;
		playerMaxStaminaDisplay.innerHTML = player.maxStamina;
		playerStaminaBarValue.style.width = ((player.currentStamina / player.maxStamina) * 100) + "%";
		playerQuestPointsDisplay.innerHTML = player.questPoints;
		Locations.loadCurrentLocation();
		QuestSystem.generateQuests();
	},
	setupTooltips: function(){
		//add inventory slots functionality
		let invSlots = Array.from(document.querySelectorAll('.inv-slot'));
		invSlots.forEach((elem) => {
			elem.addEventListener('mouseenter', (e) => {
				let index = this.getSlotIndex(elem.id);
				this.showTooltip(true, index, e, "inv");
			});
		});
		invSlots.forEach((elem) => {
			elem.addEventListener('mouseleave', (e) => {
				this.showTooltip(false);
			});
		});
		invSlots.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				let index = this.getSlotIndex(elem.id);
				if(player.inv.slots[index] != "empty"){
					if(this.inShopSellScreen){
						this.sellItem(index, e);
					}
					else if(this.inShopSellScreen === false && player.inv.slots[index].type === "consumable"){
						this.useItem(index);
					}
					else if(this.inShopSellScreen === false && player.inv.slots[index].type === "equip"){
						this.equipItem(index);
					}
				}
			});
		});
		//add equip slots functionality
		let equipSlots = Array.from(document.querySelectorAll('.equip-slot'));
		equipSlots.forEach((elem) => {
			elem.addEventListener("mouseenter", (e) => {
				let index = this.getSlotIndex(elem.id);
				this.showTooltip(true, index, e, "equip");
			});
		});
		equipSlots.forEach((elem) => {
			elem.addEventListener('mouseleave', (e) => {
				this.showTooltip(false);
			});
		});
		equipSlots.forEach((elem) => {
			elem.addEventListener('click', (e) => {
				let index = this.getSlotIndex(elem.id);
				if(player.equipSlots[index] != "empty"){
					this.unequipItem(index);
				}
			});
		});
		//add craft button tooltip functions
		let craftButtons = Array.from(document.querySelectorAll('.craft-button'));
		craftButtons.forEach((elem) => {
			elem.addEventListener("mouseenter", (e) => {
				this.showTooltip(true, null, e, "craft");
			});
		});
		craftButtons.forEach((elem) => {
			elem.addEventListener('mouseleave', (e) => {
				this.showTooltip(false);
			});
		});
	},
	showTooltip: function(state, index, e, type){
		if(state === true){
			if(player.inv.slots[index] != "empty" && type === "inv"){
				$('.div-tooltip').css('top', (e.pageY - 350)+'px').css('left', e.pageX+'px').html(player.inv.slots[index].tooltip).show();
			}
			else if(player.equipSlots[index] != "empty" && type === "equip"){
				$('.div-tooltip').css('top', (e.pageY - 100)+'px').css('left', e.pageX+'px').html(player.equipSlots[index].tooltip).show();
			}
			else if(type === "craft"){
				let html = "Items." + e.target.dataset.tooltip + ".craftTooltip";
				$('.div-tooltip').css('top', (e.pageY - 100)+'px').css('left', e.pageX+'px').html("<h2>Craft</h2>" + eval(html)).show();
			}
		}
		else {
			$('.div-tooltip').hide();
		}
	},
	getSlotIndex: function(elemID){
		let index = elemID.match(/\d/g);
		index = index.join("");
		return index;
	},
	sellItem: function(index, e){
		player.gold += player.inv.slots[index].goldValue;
		player.inv.remove(player.inv.slots[index], 1);
		player.update();
	},
	buyItem: function(item, cost){
		if(player.gold >= cost){
			player.gold -= cost;
			printAction("You bought 1 " + item.name + ".");
			player.inv.add(item, 1);
			player.update();
		}
		else{
			printAction("You cannot afford that item.");
		}
	},
	useItem: function(index){
		if(player.inv.slots[index].name === "Health Potion" || player.inv.slots[index].name === "Stamina Potion"){
			player.drinkPotion(player.inv.slots[index].name);
		}
	},
	equipItem: function(index){
		let item = player.inv.slots[index];
		if(item.slot === "head"){
			if(player.equipSlots[0] === "empty"){
				player.equipSlots[0] = item;
				player.defence += item.defence;
				player.inv.remove(item, 1);
			}
			else {
				printAction("You must unequip that slot first to equip this item.")
			}
		}
		else if(item.slot === "chest"){
			if(player.equipSlots[1] === "empty"){
				player.equipSlots[1] = item;
				player.defence += item.defence;
				player.inv.remove(item, 1);
			}
			else {
				printAction("You must unequip that slot first to equip this item.")
			}
		}
		else if(item.slot === "feet"){
			if(player.equipSlots[2] === "empty"){
				player.equipSlots[2] = item;
				player.speed += item.speed;
				player.inv.remove(item, 1);
			}
			else {
				printAction("You must unequip that slot first to equip this item.")
			}
		}
		else if(item.slot === "weapon"){
			if(player.equipSlots[3] === "empty"){
				player.equipSlots[3] = item;
				player.attack += item.attack;
				player.inv.remove(item, 1);
			}
			else {
				printAction("You must unequip that slot first to equip this item.")
			}
		}

		player.inv.displayInv();
		player.update();
	},
	unequipItem: function(index){
		let hasFreeSpace = false;
		for(let i = 0; i < player.inv.slots.length; i++){
			if(player.inv.slots[i] === "empty"){
				hasFreeSpace = true;
				break;
			}
		}
		if(hasFreeSpace){
			player.inv.add(player.equipSlots[index], 1);
			if(	player.equipSlots[index].slot === "head" ||
			   	player.equipSlots[index].slot === "chest"){
				player.defence -= player.equipSlots[index].defence;
			}
			else if(player.equipSlots[index].slot === "feet"){
				player.speed -= player.equipSlots[index].speed;
			}
			else if(player.equipSlots[index].slot === "weapon"){
				player.attack -= player.equipSlots[index].attack;
			}
			player.equipSlots[index] = "empty";
			player.inv.displayInv();
			player.update();
		}
		else{
			printAction("Your inventory is full. Cannot unequip.")
		}
	},
	rest: function(choice){
		if(choice === "inn" && player.gold >= 10){
			$("#ui-container").fadeOut(2000, function(){
				player.currentStamina = player.maxStamina; 
				player.gold -= 10; 
				player.update(); 
				$(this).fadeIn(2000, function(){
					player.update();
				});});
		}
		else if(choice === "street"){
			$("#ui-container").fadeOut(2000, function(){
				player.currentStamina = player.maxStamina;
				player.currentHealth -= 1;
				player.update(); 
				$(this).fadeIn(2000, function(){
					player.update();
				});});
		}
		else{printAction("Not enough gold."); player.update();}
	}
}