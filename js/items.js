let Items = {
	rarity: {
		white: "rgba(0,0,0,0.6)",
		green: "rgba(76, 255, 51, 0.4)",
		blue:  "rgba(40, 144, 255, 0.4)"
	},
	copper_ore: {
		name: "Copper Ore",
		isStackable: true,
		count: 1,
		goldValue: 1,
		tooltip: "Gold: 1 per item<br>Crafts: Copper/Bronze Gear",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/copper_ore.png"
	},
	tin_ore: {
		name: "Tin Ore",
		isStackable: true,
		count: 1,
		goldValue: 2,
		tooltip: "Gold: 2 per item<br>Crafts: Bronze Gear",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/tin_ore.png"
	},
	iron_ore: {
		name: "Iron Ore",
		isStackable: true,
		count: 1,
		goldValue: 3,
		tooltip: "Gold: 3 per item<br>Crafts: Iron Gear",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/iron_ore.png"
	},
	green_herb: {
		name: "Green Herb",
		isStackable: true,
		count: 1,
		goldValue: 1,
		tooltip: "Gold: 1<br>Crafts: Stamina Potions",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/green_herb.png"
	},
	red_herb: {
		name: "Red Herb",
		isStackable: true,
		count: 1,
		goldValue: 1,
		tooltip: "Gold: 1<br>Crafts: Health Potions",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/red_herb.png"
	},
	mushroom: {
		name: "Mushroom",
		isStackable: true,
		count: 1,
		goldValue: 1,
		tooltip: "Gold: 1<br>Crafts: Health Potions",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/mushroom.png"
	},
	leather: {
		name: "Leather",
		isStackable: true,
		count: 1,
		goldValue: 2,
		tooltip: "Gold: 2 per item<br>Crafts: Leather Gear",
		rarity: "rgba(0,0,0,0.6)",
		imgsrc: "img/icons/items/leather.png"
	},
	armour: {
		leather_helm: {
			name: "Leather Helm",
			type: "equip",
			slot: "head",
			isStackable: false,
			count: 1,
			goldValue: 4,
			defence: 1,
			craftingReq: [{name: "Leather", amount: 4, object: "Items.leather"}],
			tooltip: "Gold: 4<br>Defence: 1",
			craftTooltip: "Leather: 4",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/helm_equipment.png"
		},
		leather_chest: {
			name: "Leather Chest",
			type: "equip",
			slot: "chest",
			isStackable: false,
			count: 1,
			goldValue: 4,
			defence: 2,
			craftingReq: [{name: "Leather", amount: 6, object: "Items.leather"}],
			tooltip: "Gold: 4<br>Defence: 2",
			craftTooltip: "Leather: 6",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/chest_equipment.png"
		},
		leather_boots: {
			name: "Leather Boots",
			type: "equip",
			slot: "feet",
			isStackable: false,
			count: 1,
			goldValue: 4,
			speed: 1,
			craftingReq: [{name: "Leather", amount: 4, object: "Items.leather"}],
			tooltip: "Gold: 4<br>Speed: 1",
			craftTooltip: "Leather: 4",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/boots_equipment.png"
		},
		bronze_helm: {
			name: "Bronze Helm",
			type: "equip",
			slot: "head",
			isStackable: false,
			count: 1,
			goldValue: 6,
			defence: 2,
			craftingReq: [{name: "Copper Ore", amount: 5, object: "Items.copper_ore"}, {name: "Tin Ore", amount: 5, object: "Items.tin_ore"}],
			tooltip: "Gold: 6<br>Defence: 2",
			craftTooltip: "Copper Ore: 5<br>Tin Ore: 5",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/helm_equipment.png"
		},
		bronze_chest: {
			name: "Bronze Chest",
			type: "equip",
			slot: "chest",
			isStackable: false,
			count: 1,
			goldValue: 8,
			defence: 4,
			craftingReq: [{name: "Copper Ore", amount: 10, object: "Items.copper_ore"}, {name: "Tin Ore", amount: 10, object: "Items.tin_ore"}],
			tooltip: "Gold: 8<br>Defence: 4",
			craftTooltip: "Copper Ore: 10<br>Tin Ore: 10",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/chest_equipment.png"
		},
		bronze_boots: {
			name: "Bronze Boots",
			type: "equip",
			slot: "feet",
			isStackable: false,
			count: 1,
			goldValue: 6,
			speed: 2,
			craftingReq: [{name: "Copper Ore", amount: 5, object: "Items.copper_ore"}, {name: "Tin Ore", amount: 5, object: "Items.tin_ore"}],
			tooltip: "Gold: 6<br>Speed: 2",
			craftTooltip: "Copper Ore: 5<br>Tin Ore: 5",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/boots_equipment.png"
		},
		iron_helm: {
			name: "Iron Helm",
			type: "equip",
			slot: "head",
			isStackable: false,
			count: 1,
			goldValue: 8,
			defence: 4,
			craftingReq: [{name: "Iron Ore", amount: 10, object: "Items.iron_ore"}],
			tooltip: "Gold: 8<br>Defence: 4",
			craftTooltip: "Iron Ore: 10",
			rarity: "rgba(40, 144, 255, 0.4)",
			imgsrc: "img/icons/items/helm_equipment.png"
		},
		iron_chest: {
			name: "Iron Chest",
			type: "equip",
			slot: "chest",
			isStackable: false,
			count: 1,
			goldValue: 10,
			defence: 6,
			craftingReq: [{name: "Iron Ore", amount: 15, object: "Items.iron_ore"}],
			tooltip: "Gold: 10<br>Defence: 6",
			craftTooltip: "Iron Ore: 15",
			rarity: "rgba(40, 144, 255, 0.4)",
			imgsrc: "img/icons/items/chest_equipment.png"
		},
		iron_boots: {
			name: "Iron Boots",
			type: "equip",
			slot: "feet",
			isStackable: false,
			count: 1,
			goldValue: 8,
			speed: 4,
			craftingReq: [{name: "Iron Ore", amount: 10, object: "Items.iron_ore"}],
			tooltip: "Gold: 8<br>Speed: 4",
			craftTooltip: "Iron Ore: 10",
			rarity: "rgba(40, 144, 255, 0.4)",
			imgsrc: "img/icons/items/boots_equipment.png"
		}
	},
	weapons: {
		copper_sword: {
			name: "Copper Sword",
			type: "equip",
			slot: "weapon",
			isStackable: false,
			count: 1,
			goldValue: 4,
			attack: 1,
			craftingReq: [{name: "Copper Ore", amount: 10, object: "Items.copper_ore"}],
			tooltip: "Gold: 4<br>Attack: 1",
			craftTooltip: "Copper Ore: 10",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/sword.png"
		},
		bronze_sword: {
			name: "Bronze Sword",
			type: "equip",
			slot: "weapon",
			isStackable: false,
			count: 1,
			goldValue: 6,
			attack: 2,
			craftingReq: [{name: "Copper Ore", amount: 10, object: "Items.copper_ore"}, {name: "Tin Ore", amount: 10, object: "Items.tin_ore"}],
			tooltip: "Gold: 6<br>Attack: 2",
			craftTooltip: "Copper Ore: 10<br>Tin Ore: 10",
			rarity: "rgba(76, 255, 51, 0.4)",
			imgsrc: "img/icons/items/sword.png"
		},
		iron_sword: {
			name: "Iron Sword",
			type: "equip",
			slot: "weapon",
			isStackable: false,
			count: 1,
			goldValue: 8,
			attack: 4,
			craftingReq: [{name: "Iron Ore", amount: 15, object: "Items.iron_ore"}],
			tooltip: "Gold: 8<br>Attack: 4",
			craftTooltip: "Iron Ore: 15",
			rarity: "rgba(40, 144, 255, 0.4)",
			imgsrc: "img/icons/items/sword.png"
		}
	},
	consumables: {
		health_potion: {
			name: "Health Potion",
			type: "consumable",
			isStackable: true,
			count: 1,
			goldValue: 5,
			craftingReq: [{name: "Mushroom", amount: 5, object: "Items.mushroom"}],
			tooltip: "Gold: 5 per item<br>Use: Gain 5 Health",
			craftTooltip: "Mushrooms: 5",
			rarity: "rgba(0,0,0,0.6)",
			imgsrc: "img/icons/items/health_potion.png"
		},
		stamina_potion: {
			name: "Stamina Potion",
			type: "consumable",
			isStackable: true,
			count: 1,
			goldValue: 5,
			craftingReq: [{name: "Green Herb", amount: 5, object: "Items.green_herb"}],
			tooltip: "Gold: 5 per item<br>Use: Gain 5 Stamina",
			craftTooltip: "Green Herbs: 5",
			rarity: "rgba(0,0,0,0.6)",
			imgsrc: "img/icons/items/stamina_potion.png"
		}
	}
}