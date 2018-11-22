let QuestSystem = {
	generateQuests: function(){
		let q = this.quests;
		$("#quest-log").html("");
		for(let key in q){
			let html = '';
			if(q[key].isComplete){
				html = '<div class="quest-info-div quest-complete"><h2>'+q[key].name+'</h2><p>'+q[key].task+'</p><p>Reward: '+q[key].reward+' Quest Points</p><div class="quest-hand-in-button-complete">Quest Completed</div></div>';
			}
			else{
				html = '<div class="quest-info-div"><h2>'+q[key].name+'</h2><p>'+q[key].task+'</p><p>Reward: '+q[key].reward+' Quest Points</p><div onclick="QuestSystem.quests.'+key+'.handIn()" class="quest-hand-in-button">Hand in Quest</div></div>';
			}
			$("#quest-log").append(html);
		}
	},
	completeQuest: function(reward, name){
		player.questPoints += reward;
		printAction("You completed the "+name+" Quest! (Gained "+reward+" Quest Points)");
		player.update();
	},
	incompleteQuest: function(){
		printAction("You have not met the quest requirements yet.");
	},
	quests: {
		q1: {
			questID: 1,
			name: "Bear Hunting",
			task: "Kill 3 Bears",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.kills.bear >= 3){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q2: {
			name: "Spider Hunting",
			task: "Kill 5 Spiders",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.kills.spider >= 5){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q3: {
			name: "Junior Miner",
			task: "Hand in 10 Copper Ore",
			reward: 1,
			isComplete: false,
			handIn: function(){
				let hasOre = false;
				for(let i = 0; i < player.inv.slots.length; i++){
					if(player.inv.slots[i].name === "Copper Ore" && player.inv.slots[i].count >= 10){
						hasOre = true;
						break;
					}
				}
				if(hasOre){
					player.inv.remove(Items.copper_ore, 10);
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q4: {
			name: "Junior Herbalist",
			task: "Hand in 10 Green Herbs",
			reward: 1,
			isComplete: false,
			handIn: function(){
				let hasHerbs = false;
				for(let i = 0; i < player.inv.slots.length; i++){
					if(player.inv.slots[i].name === "Green Herb" && player.inv.slots[i].count >= 10){
						hasHerbs = true;
						break;
					}
				}
				if(hasHerbs){
					player.inv.remove(Items.green_herb, 10);
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q4: {
			name: "Leather Crafter",
			task: "Craft 1 Leather Item",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.crafts.leather >= 1){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q5: {
			name: "Pro Leather Crafter",
			task: "Craft 3 Leather Items",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.crafts.leather >= 3){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q6: {
			name: "Humble Exploring",
			task: "Explore Lonely Hollow 20 times",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.explore.lonelyHollow >= 20){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q7: {
			name: "Draugr Slayer",
			task: "Kill 3 Draugr",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.kills.draugr >= 3){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q8: {
			name: "Bandit Slayer",
			task: "Kill 3 Bandits",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.stats.kills.bandit >= 3){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q9: {
			name: "Tin Miner",
			task: "Hand in 10 Tin Ore",
			reward: 1,
			isComplete: false,
			handIn: function(){
				let hasOre = false;
				for(let i = 0; i < player.inv.slots.length; i++){
					if(player.inv.slots[i].name === "Tin Ore" && player.inv.slots[i].count >= 10){
						hasOre = true;
						break;
					}
				}
				if(hasOre){
					player.inv.remove(Items.tin_ore, 10);
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		},
		q10: {
			name: "Hero",
			task: "Reach level 5",
			reward: 1,
			isComplete: false,
			handIn: function(){
				if(player.level >= 5){
					this.isComplete = true; 
					QuestSystem.completeQuest(this.reward, this.name); 
					QuestSystem.generateQuests();
				}
				else{QuestSystem.incompleteQuest();}
			}
		}
	}
}