let Locations = {
	town: {
		name: "Town",
		description: "The town is very busy with activity.",
		imgsrc: "img/locations/town.jpg",
		buttonsID: "#sidebar-town-buttons"
	},
	map: {
		name: "Map",
		description: "Where will you go this time.",
		imgsrc: "img/locations/map.jpg",
		buttonsID: "#sidebar-travel-buttons"
	},
	rest: {
		name: "Rest",
		description: "A warm hearth is all you need.",
		imgsrc: "img/locations/rest.jpg",
		buttonsID: "#sidebar-rest-buttons"
	},
	shop: {
		name: "Shop",
		description: "What can I get for you friend?",
		imgsrc: "img/locations/shop.jpg",
		buttonsID: "#sidebar-shop-buttons",
		sellItems: {
			name: "Selling Items",
			description: "What are you selling?",
			imgsrc: "img/locations/shop.jpg",
			buttonsID: "#sidebar-shop-sell-buttons"
		},
		buyItems: {
			name: "Buying Items",
			description: "What are you buying?",
			imgsrc: "img/locations/shop_buy.jpg",
			buttonsID: "#sidebar-shop-buy-buttons"
		}
	},
	craft: {
		name: "Crafting",
		description: "Here you can craft new weapons and armour.",
		imgsrc: "img/locations/craft.jpg",
		buttonsID: "#sidebar-craft-buttons",
		potions: {
			name: "Craft Potions",
			description: "Here you can use your herbs to make useful potions.",
			imgsrc: "img/locations/craft.jpg",
			buttonsID: "#sidebar-craft-potions-buttons"
		},
		weapons: {
			name: "Craft Weapons",
			description: "Here you can use your ores to make new weapons.",
			imgsrc: "img/locations/craft.jpg",
			buttonsID: "#sidebar-craft-weapons-buttons"
		},
		armour: {
			name: "Craft Armour",
			description: "Here you can use your items to craft better armour.",
			imgsrc: "img/locations/craft.jpg",
			buttonsID: "#sidebar-craft-armour-buttons"
		}
	},
	lonelyHollow: {
		name:"Lonely Hollow",
		description: "This dark cave feels cold and unwelcoming.",
		imgsrc: "img/locations/lonely_hollow/entrance.jpg",
		buttonsID: "#sidebar-lonelyHollow-buttons",
		dangerLevel: 4, //Chance out of 10 that you will encounter an enemy 
		foundOre: false,
		enemies: [{
			type: "spider",
			level: 1,
			maxHealth: 4,
			currentHealth: 4,
			attack: 4,
			speed: 4,
			imgsrc: "img/locations/lonely_hollow/enemies/spider.jpg",
			killxp: 4,
			loot: function(){
				player.inv.add(Items.leather, 1);
				printAction("You looted 1 Leather from the Spider.");
				player.stats.kills.spider += 1;
			}
		},
		{
			type: "bear",
			level: 2,
			maxHealth: 8,
			currentHealth: 8,
			attack: 6,
			speed: 2,
			imgsrc: "img/locations/lonely_hollow/enemies/bear.jpg",
			killxp: 6,
			loot: function(){
				player.inv.add(Items.leather, 2);
				printAction("You looted 2 Leather from the Bear.");
				player.stats.kills.bear += 1;
			}
		}],
		events: [{
			imgsrc: "img/locations/lonely_hollow/events/hard_terrain.jpg",
			printedAction: "You traverse some difficult terrain. (You lose 1 stamina)",
			effect: function(){player.currentStamina -= 1;}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/hard_terrain2.jpg",
			printedAction: "You traverse some very difficult terrain. (You lose 2 stamina)",
			effect: function(){player.currentStamina -= 2;}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/small_gold.jpg",
			printedAction: "You have found a lot of human remains, searching through it you find some things. (You gain 2 gold)",
			effect: function(){player.gold += 2;}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/medium_gold.jpg",
			printedAction: "You find the corpse of a theif, you steal his gold. (You gain 6 gold)",
			effect: function(){player.gold += 6;}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/large_gold.jpg",
			printedAction: "You find a left behind caravan from a dead trader. (You gain 10 gold)",
			effect: function(){player.gold += 10;}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/large_herbs.jpg",
			printedAction: "You find some a large patch of green herbs. (you gain 4 green herbs)",
			effect: function(){player.inv.add(Items.green_herb, 4);}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/small_herbs.jpg",
			printedAction: "You find some green herbs, these are handy. (You gain 2 green herbs)",
			effect: function(){player.inv.add(Items.green_herb, 2);}
		},
		{
			imgsrc: "img/locations/lonely_hollow/events/small_damage.jpg",
			printedAction: "You stumble across a spiders nest inhaling some poision fumes. (You take 1 damage)",
			effect: function(){player.currentHealth -= 1;}
		},
		{
			type: "ore",
			imgsrc: "img/locations/lonely_hollow/events/copper_ore.jpg",
			printedAction: "You find a copper ore vein. (You can now mine copper ore here)",
			effect: function(){player.currentLocation.foundOre = true;}
		}],
		explore: function(){
			if(player.currentStamina > 0){
				player.stats.explore.lonelyHollow += 1;
				player.currentStamina -= 1;
				player.update();
				let encounterEnemy = (getRandomInt(1, 10) <= this.dangerLevel) ? true : false;
				if(encounterEnemy){EventSystem.generateEnemy(this);}
				else {EventSystem.generateEvent(this);}
			}
			else{
				player.notEnoughStamina();
			}
		},
		mine: function(){
			if(player.currentStamina > 0){
				player.currentStamina -= 1;
				let oreGained = getRandomInt(1, 5);
				player.inv.add(Items.copper_ore, oreGained);
				printAction("You mined " + oreGained + " copper ore.");
				player.update();
			}
			else {
				player.notEnoughStamina();
			}
		}
	},
	bleakfallsBarrow: {
		name:"Bleakfalls Barrow",
		description: "You can hear undead wispers in the air.",
		imgsrc: "img/locations/bleakfalls_barrow/entrance.jpg",
		buttonsID: "#sidebar-bleakfallsBarrow-buttons",
		dangerLevel: 4, //Chance out of 10 that you will encounter an enemy
		foundOre: false,
		enemies: [{
			type: "bandit",
			level: 3,
			maxHealth: 10,
			currentHealth: 10,
			attack: 8,
			speed: 4,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/bandit.jpg",
			killxp: 6,
			loot: function(){
				player.inv.add(Items.leather, 6);
				printAction("You looted 6 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "skeever",
			level: 3,
			maxHealth: 8,
			currentHealth: 8,
			attack: 6,
			speed: 6,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/skeever.jpg",
			killxp: 5,
			loot: function(){
				player.inv.add(Items.leather, 4);
				printAction("You looted 4 Leather from the Skeever.");
				player.stats.kills.skeever += 1;
			}
		},
		{
			type: "spider",
			level: 4,
			maxHealth: 10,
			currentHealth: 10,
			attack: 4,
			speed: 8,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/giant_spider.jpg",
			killxp: 10,
			loot: function(){
				player.inv.add(Items.leather, 5);
				printAction("You looted 5 Leather from the Skeever.");
				player.stats.kills.spider += 1;
			}
		},
		{
			type: "draugr",
			level: 3,
			maxHealth: 10,
			currentHealth: 10,
			attack: 8,
			speed: 4,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/draugr_axe.jpg",
			killxp: 6,
			loot: function(){
				player.inv.add(Items.leather, 4);
				printAction("You looted 4 Leather from the Draugr.");
				player.stats.kills.draugr += 1;
			}
		},
		{
			type: "draugr",
			level: 4,
			maxHealth: 12,
			currentHealth: 12,
			attack: 10,
			speed: 4,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/draugr_greatsword.jpg",
			killxp: 8,
			loot: function(){
				player.inv.add(Items.leather, 4);
				printAction("You looted 4 Leather from the Draugr.");
				player.stats.kills.draugr += 1;
			}
		},
		{
			type: "draugr",
			level: 3,
			maxHealth: 8,
			currentHealth: 8,
			attack: 8,
			speed: 6,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/draugr_female.jpg",
			killxp: 6,
			loot: function(){
				player.inv.add(Items.leather, 4);
				printAction("You looted 4 Leather from the Draugr.");
				player.stats.kills.draugr += 1;
			}
		},
		{
			type: "draugr",
			level: 4,
			maxHealth: 12,
			currentHealth: 12,
			attack: 12,
			speed: 5,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/draugr_pair.jpg",
			killxp: 8,
			loot: function(){
				player.inv.add(Items.leather, 4);
				printAction("You looted 4 Leather from the Draugr.");
				player.stats.kills.draugr += 1;
			}
		},
		{
			type: "draugr",
			level: 4,
			maxHealth: 20,
			currentHealth: 20,
			attack: 15,
			speed: 8,
			imgsrc: "img/locations/bleakfalls_barrow/enemies/draugr_boss.jpg",
			killxp: 15,
			loot: function(){
				player.inv.add(Items.leather, 5);
				printAction("You looted 5 Leather from the Draugr.");
				player.stats.kills.draugr += 1;
			}
		}],
		events: [{
			imgsrc: "img/locations/bleakfalls_barrow/events/gold_1.jpg",
			printedAction: "You find some ancient pots. (You gain 2 gold)",
			effect: function(){player.gold += 2;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/gold_2.jpg",
			printedAction: "You find a chest of loot. (You gain 10 gold)",
			effect: function(){player.gold += 10;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/gold_3.jpg",
			printedAction: "You find a treasure room. (You gain 20 gold)",
			effect: function(){player.gold += 20;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/gold_4.jpg",
			printedAction: "You are able to loot a skeleton. (You gain 3 gold)",
			effect: function(){player.gold += 3;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/gold_5.jpg",
			printedAction: "You find a hidden chest at the bottom of a ravine. (You gain 15 gold)",
			effect: function(){player.gold += 15;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/hard_terrain_1.jpg",
			printedAction: "You have to push past some thick spider webs. (You lose 1 stamina)",
			effect: function(){player.currentStamina -= 1;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/hard_terrain_2.jpg",
			printedAction: "You navigate a collapsed section of the dungeon. (You lose 1 stamina)",
			effect: function(){player.currentStamina -= 1;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/hard_terrain_3.jpg",
			printedAction: "You climb through a flooded tunnel. (You lose 2 stamina)",
			effect: function(){player.currentStamina -= 2;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/hard_terrain_4.jpg",
			printedAction: "You ascend a large flight of stairs. (You lose 1 stamina)",
			effect: function(){player.currentStamina -= 1;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/mushrooms_1.jpg",
			printedAction: "You find a small patch of mushrooms. (You gain 2 mushrooms)",
			effect: function(){player.inv.add(Items.mushroom, 2);}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/mushrooms_2.jpg",
			printedAction: "You find a very small patch of mushrooms. (You gain 1 mushrooms)",
			effect: function(){player.inv.add(Items.mushroom, 1);}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/mushrooms_3.jpg",
			printedAction: "You find a growing wall of mushrooms. (You gain 6 mushrooms)",
			effect: function(){player.inv.add(Items.mushroom, 6);}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/mushrooms_4.jpg",
			printedAction: "You find a small patch of mushrooms and a chest of gold. (You gain 2 mushrooms & 6 gold)",
			effect: function(){player.inv.add(Items.mushroom, 2); player.gold += 6;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/trap_1.jpg",
			printedAction: "You stumble into a pressure plate spike trap. (You take 2 damage)",
			effect: function(){player.currentHealth -= 2;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/trap_2.jpg",
			printedAction: "You run though a swinging axe hallway. (You take 2 damage)",
			effect: function(){player.currentHealth -= 2;}
		},
		{
			imgsrc: "img/locations/bleakfalls_barrow/events/trap_3.jpg",
			printedAction: "You walk through a blazing oil trap. (You take 2 damage)",
			effect: function(){player.currentHealth -= 2;}
		},
		{
			type: "ore",
			imgsrc: "img/locations/bleakfalls_barrow/events/tin_ore.jpg",
			printedAction: "You find a Tin Ore vein. (You can now mine tin ore here)",
			effect: function(){player.currentLocation.foundOre = true;}
		},],
		explore: function(){
			if(player.currentStamina > 0){
				player.stats.explore.bleakfallsBarrow += 1;
				player.currentStamina -= 1;
				player.update();
				let encounterEnemy = (getRandomInt(1, 10) <= this.dangerLevel) ? true : false;
				if(encounterEnemy){EventSystem.generateEnemy(this);}
				else {EventSystem.generateEvent(this);}
			}
			else{
				player.notEnoughStamina();
			}
		},
		mine: function(){
			if(player.currentStamina > 0){
				player.currentStamina -= 1;
				let oreGained = getRandomInt(1, 5);
				player.inv.add(Items.tin_ore, oreGained);
				printAction("You mined " + oreGained + " tin ore.");
				player.update();
			}
			else {
				player.notEnoughStamina();
			}
		}
	},
	banditKeep: {
		name:"Bandit Keep",
		description: "You have been told this is a dangerous place.",
		imgsrc: "img/locations/bandit_keep/entrance.png",
		buttonsID: "#sidebar-banditKeep-buttons",
		dangerLevel: 6, //Chance out of 10 that you will encounter an enemy
		foundOre: false,
		enemies:[{
			type: "bandit",
			level: 5,
			maxHealth: 20,
			currentHealth: 20,
			attack: 10,
			speed: 8,
			imgsrc: "img/locations/bandit_keep/enemies/bandit_black.jpg",
			killxp: 15,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "bandit",
			level: 5,
			maxHealth: 30,
			currentHealth: 30,
			attack: 15,
			speed: 10,
			imgsrc: "img/locations/bandit_keep/enemies/bandit_boss.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "bandit",
			level: 5,
			maxHealth: 18,
			currentHealth: 18,
			attack: 9,
			speed: 11,
			imgsrc: "img/locations/bandit_keep/enemies/bandit_female.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "bandit",
			level: 5,
			maxHealth: 16,
			currentHealth: 16,
			attack: 12,
			speed: 5,
			imgsrc: "img/locations/bandit_keep/enemies/bandit_orc.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "bandit",
			level: 5,
			maxHealth: 25,
			currentHealth: 25,
			attack: 14,
			speed: 10,
			imgsrc: "img/locations/bandit_keep/enemies/bandit_pair.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "bandit",
			level: 5,
			maxHealth: 20,
			currentHealth: 20,
			attack: 16,
			speed: 10,
			imgsrc: "img/locations/bandit_keep/enemies/mage.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Bandit.");
				player.stats.kills.bandit += 1;
			}
		},
		{
			type: "skeleton",
			level: 5,
			maxHealth: 18,
			currentHealth: 18,
			attack: 16,
			speed: 10,
			imgsrc: "img/locations/bandit_keep/enemies/skeleton_sword.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Skeleton.");
				player.stats.kills.skeleton += 1;
			}
		},
		{
			type: "skeleton",
			level: 5,
			maxHealth: 14,
			currentHealth: 14,
			attack: 12,
			speed: 12,
			imgsrc: "img/locations/bandit_keep/enemies/skeleton_bow.jpg",
			killxp: 20,
			loot: function(){
				player.inv.add(Items.leather, 10);
				printAction("You looted 10 Leather from the Skeleton.");
				player.stats.kills.skeleton += 1;
			}
		},
		{
			type: "werewolf",
			level: 10,
			maxHealth: 50,
			currentHealth: 50,
			attack: 20,
			speed: 15,
			imgsrc: "img/locations/bandit_keep/enemies/werewolf.jpg",
			killxp: 40,
			loot: function(){
				player.inv.add(Items.leather, 20);
				printAction("You looted 20 Leather from the Werewolf.");
				player.stats.kills.werewolf += 1;
			}
		}],
		events: [{
			imgsrc: "img/locations/bandit_keep/events/chest.jpg",
			printedAction: "You find a loot filled chest. (You gain 20 gold)",
			effect: function(){player.gold += 20;}
		},
		{
			imgsrc: "img/locations/bandit_keep/events/health.jpg",
			printedAction: "You find a health potion. (You gain 1 health potion)",
			effect: function(){player.inv.add(Items.consumables.health_potion, 1);}
		},
		{
			imgsrc: "img/locations/bandit_keep/events/loot.jpg",
			printedAction: "You find some hidden loot. (You gain 15 gold)",
			effect: function(){player.gold += 15;}
		},
		{
			imgsrc: "img/locations/bandit_keep/events/red_herb.png",
			printedAction: "You find herbs. (You gain 5 red herbs)",
			effect: function(){player.inv.add(Items.red_herb, 5);}
		},
		{
			imgsrc: "img/locations/bandit_keep/events/trap.jpg",
			printedAction: "You fall prey to a trap. (You take 2 damage)",
			effect: function(){player.currentHealth -= 2;}
		},
		{
			type: "ore",
			imgsrc: "img/locations/bandit_keep/events/iron_ore.jpg",
			printedAction: "You find a Iron Ore vein. (You can now mine iron ore here)",
			effect: function(){player.currentLocation.foundOre = true;}
		}],
		explore: function(){
			if(player.currentStamina > 0){
				player.stats.explore.banditKeep += 1;
				player.currentStamina -= 1;
				player.update();
				let encounterEnemy = (getRandomInt(1, 10) <= this.dangerLevel) ? true : false;
				if(encounterEnemy){EventSystem.generateEnemy(this);}
				else {EventSystem.generateEvent(this);}
			}
			else{
				player.notEnoughStamina();
			}
		},
		mine: function(){
			if(player.currentStamina > 0){
				player.currentStamina -= 1;
				let oreGained = getRandomInt(1, 5);
				player.inv.add(Items.iron_ore, oreGained);
				printAction("You mined " + oreGained + " iron ore.");
				player.update();
			}
			else {
				player.notEnoughStamina();
			}
		}
	},
	travelTo: function(location){
		let previousLocation = player.currentLocation;
		player.currentLocation = location;
		this.changeButtons(previousLocation.buttonsID, location.buttonsID);
		this.loadCurrentLocation();
	},
	loadCurrentLocation: function(){
		$(locationNameDisplay).fadeOut(300, function(){$(this).text(player.currentLocation.name).fadeIn(300);});
		$(locationDescDisplay).fadeOut(300, function(){$(this).text(player.currentLocation.description).fadeIn(300);});
		$(locationImgDisplay).fadeOut(300, function(){$(this).attr("src", player.currentLocation.imgsrc).fadeIn(300);});
	},
	changeButtons: function(idToHide, idToShow){
		$(idToHide).slideUp();
		$(idToShow).slideDown();
		if(player.currentLocation.foundOre === false){
			$(".ore-button").hide();
		}
		else{
			$(".ore-button").show();	
		}
	}
}