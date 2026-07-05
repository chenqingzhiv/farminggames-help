---
title: Stardew Valley Interactive Map
description: Explore the valley with our interactive collection map. Click on any area to see all collectibles, forage items, and points of interest.
date: 2026-06-27
---

# Stardew Valley Interactive Map

Explore the valley with our interactive collection map. Click on any area to see all collectibles, forage items, and points of interest.

<div class="map-container">
  <svg id="sv-map" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:900px;background:#2d3a2a;border-radius:12px;">
    <!-- Background -->
    <rect width="900" height="600" fill="#3d4e35" rx="12"/>
    
    <!-- Town -->
    <rect x="320" y="80" width="260" height="200" rx="10" fill="#5a7245" class="map-region" data-region="town" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('town')"/>
    <text x="450" y="180" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Town</text>
    <text x="450" y="200" text-anchor="middle" fill="#9b9a95" font-size="11">Shops · NPCs · Community Center</text>
    
    <!-- Farm -->
    <rect x="60" y="100" width="220" height="150" rx="10" fill="#4a6b35" class="map-region" data-region="farm" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('farm')"/>
    <text x="170" y="175" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Farm</text>
    <text x="170" y="195" text-anchor="middle" fill="#9b9a95" font-size="11">Crops · Animals · Buildings</text>
    
    <!-- Beach -->
    <rect x="660" y="300" width="220" height="160" rx="10" fill="#3a5a6b" class="map-region" data-region="beach" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('beach')"/>
    <text x="770" y="380" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Beach</text>
    <text x="770" y="400" text-anchor="middle" fill="#9b9a95" font-size="11">Fishing · Foraging · Willie</text>
    
    <!-- Forest -->
    <rect x="60" y="300" width="220" height="160" rx="10" fill="#3d5a3d" class="map-region" data-region="forest" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('forest')"/>
    <text x="170" y="380" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Cindersap Forest</text>
    <text x="170" y="400" text-anchor="middle" fill="#9b9a95" font-size="11">Forage · Marnie · Wizard</text>
    
    <!-- Mountain -->
    <rect x="660" y="60" width="220" height="160" rx="10" fill="#4a4a3d" class="map-region" data-region="mountain" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('mountain')"/>
    <text x="770" y="140" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Mountains</text>
    <text x="770" y="160" text-anchor="middle" fill="#9b9a95" font-size="11">Mining · Fishing · Linus</text>
    
    <!-- Desert -->
    <rect x="320" y="320" width="260" height="120" rx="10" fill="#5a5a3a" class="map-region" data-region="desert" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('desert')"/>
    <text x="450" y="370" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Desert / Calico</text>
    <text x="450" y="390" text-anchor="middle" fill="#9b9a95" font-size="11">Skull Cavern · Sandy · Casino</text>
    
    <!-- Ginger Island -->
    <rect x="320" y="470" width="260" height="100" rx="10" fill="#3a5a4a" class="map-region" data-region="ginger" style="cursor:pointer;stroke:#c9a96e;stroke-width:2;opacity:0.7;transition:opacity 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='0.7'" onclick="showRegion('ginger')"/>
    <text x="450" y="520" text-anchor="middle" fill="#e8e6e1" font-size="18" font-weight="bold">Ginger Island</text>
    <text x="450" y="540" text-anchor="middle" fill="#9b9a95" font-size="11">Volcano · Farm · Resort</text>
    
    <!-- Road connections -->
    <line x1="280" y1="175" x2="320" y2="180" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
    <line x1="580" y1="180" x2="660" y2="140" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
    <line x1="450" y1="280" x2="450" y2="320" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
    <line x1="320" y1="380" x2="280" y2="380" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
    <line x1="580" y1="380" x2="660" y2="380" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
    <line x1="580" y1="280" x2="660" y2="280" stroke="#6b8a5a" stroke-width="2" stroke-dasharray="5,3"/>
  </svg>
</div>

<div id="region-info" class="region-info">
  <h3>Click on a region above to see details</h3>
</div>

<div id="region-details" style="display:none;">
  <h3 id="region-title"></h3>
  
  <div id="spring-forage" class="forage-section">
    <h4>🌿 Spring Forage</h4>
    <p id="spring-forage-list"></p>
  </div>
  
  <div id="summer-forage" class="forage-section">
    <h4>☀️ Summer Forage</h4>
    <p id="summer-forage-list"></p>
  </div>
  
  <div id="fall-forage" class="forage-section">
    <h4>🍂 Fall Forage</h4>
    <p id="fall-forage-list"></p>
  </div>
  
  <div id="winter-forage-section" class="forage-section">
    <h4>❄️ Winter Forage</h4>
    <p id="winter-forage-list"></p>
  </div>
  
  <div id="fishing-section" class="forage-section">
    <h4>🎣 Fish Available</h4>
    <p id="fishing-list"></p>
  </div>

  <div id="mine-section" class="forage-section" style="display:none;">
    <h4>⛏️ Mines</h4>
    <p id="mine-floors"></p>
    <p id="mine-ore"></p>
    <p id="mine-special"></p>
  </div>

  <div id="shops-section" class="forage-section" style="display:none;">
    <h4>🏪 Shops & Services</h4>
    <p id="shops-list"></p>
  </div>

  <div id="tips-section" class="forage-section" style="display:none;">
    <h4>💡 Pro Tips</h4>
    <p id="tips-text"></p>
  </div>
  
  <div id="npcs-section" class="forage-section">
    <h4>👥 NPCs</h4>
    <p id="npcs-list"></p>
  </div>
</div>

<script>
const regionData = {
  town: {
    name: 'Town (Pelican Town)',
    icon: '🏘️',
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Spring Onion'],
    summer: ['Spice Berry', 'Summer Spangle', 'Sweet Pea'],
    fall: ['Blackberry', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    winter: ['Crocus', 'Crystal Fruit', 'Snow Yam', 'Winter Root'],
    fishing: [{name:'Bullhead',season:'All'}, {name:'Bream',season:'All'}, {name:'Carp',season:'All'}, {name:'Sunfish',season:'Spring/Summer'}, {name:'Chub',season:'All'}, {name:'Perch',season:'Winter'}, {name:'Pike',season:'Winter'}],
    npcs: ['Abigail', 'Alex', 'Caroline', 'Emily', 'Evelyn', 'George', 'Gus', 'Harvey', 'Jas', 'Jodi', 'Kent', 'Lewis', 'Marnie', 'Pam', 'Penny', 'Pierre', 'Robin', 'Sam', 'Shane', 'Vincent', 'Willy'],
    shops: ["Pierre's (9-5)", "Stardrop Saloon (12-midnight)", "Marnie's Ranch (9-4)"]
  },
  farm: {
    name: 'Your Farm',
    icon: '🚜',
    spring: ['Wild Horseradish', 'Daffodil', 'Leek', 'Dandelion'],
    summer: ['Spice Berry', 'Sweet Pea'],
    fall: ['Common Mushroom', 'Hazelnut', 'Blackberry'],
    winter: ['Snake Milk (1.6)', 'Moss'],
    fishing: [{name:'Carp',season:'All'}, {name:'Bullhead',season:'All'}, {name:'Sunfish',season:'Spring/Summer'}],
    npcs: ['None — it\'s your private farm!'],
    tips: 'Build at least 1 silo before cutting grass to save hay for winter!'
  },
  beach: {
    name: 'The Beach',
    icon: '🏖️',
    spring: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    summer: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    fall: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    winter: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    fishing: [{name:'Anchovy',season:'Spring/Fall'}, {name:'Red Mullet',season:'Summer/Winter'}, {name:'Sardine',season:'Spring/Fall/Winter'}, {name:'Squid',season:'Winter'}, {name:'Tuna',season:'Summer/Winter'}, {name:'Halibut',season:'Spring/Summer'}, {name:'Pufferfish',season:'Summer 12pm-4pm'}, {name:'Super Cucumber',season:'Summer/Night'}, {name:'Octopus',season:'Summer 6am-1pm'}, {name:'Lobster (Crab Pot)'}, {name:'Shrimp (Crab Pot)'}, {name:'Crab (Crab Pot)'}],
    npcs: ['Willy', 'Elliott'],
    shops: ["Willy's Fish Shop (9-5)"]
  },
  forest: {
    name: 'Cindersap Forest',
    icon: '🌲',
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Morel', 'Salmonberry 🍓 (15-18)'],
    summer: ['Fiddlehead Fern', 'Spice Berry', 'Sweet Pea', 'Red Mushroom'],
    fall: ['Blackberry', 'Chanterelle', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    winter: ['Crystal Fruit', 'Holly', 'Winter Root'],
    fishing: [{name:'Bullhead',season:'All'}, {name:'Bream',season:'All'}, {name:'Carp',season:'All'}, {name:'Chub',season:'All'}, {name:'Walleye',season:'Fall/Rain'}, {name:'Pike',season:'Winter'}, {name:'Green Algae'}, {name:'Sunfish',season:'Spring/Summer'}],
    npcs: ['Marnie', 'Sebastian', 'Wizard', 'Leah', 'Marlon', 'Gil'],
    shops: ["Marnie's Ranch (9-4)", "Wizard's Tower"],
    secrets: 'Secret Woods accessible with Steel Axe — contains hardwood stumps and a minecart!'
  },
  mountain: {
    name: 'Mountains',
    icon: '⛰️',
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Morel'],
    summer: ['Fiddlehead Fern', 'Spice Berry', 'Sweet Pea'],
    fall: ['Blackberry', 'Chanterelle', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    winter: ['Crocus', 'Crystal Fruit', 'Snow Yam', 'Winter Root'],
    fishing: [{name:'Bullhead',season:'All'}, {name:'Bream',season:'All'}, {name:'Carp',season:'All'}, {name:'Chub',season:'All'}, {name:'Largemouth Bass',season:'All'}, {name:'Sturgeon',season:'Summer/Winter'}, {name:'Walleye',season:'Fall/Rain'}, {name:'Pike',season:'Winter'}, {name:'Perch',season:'Winter'}, {name:'Green Algae'}],
    npcs: ['Demetrius', 'Linus', 'Maru', 'Robin', 'Clint', 'Pam'],
    mine: {floors:'1-120',mainOre:'Copper→Iron→Gold→Iridium',special:'Elevator every 5 floors, elevator permanent'},
    shops: ["Robin's Carpenter (9-5)", "Clint's Blacksmith (9-4)", "Mine entrance (unlocked Day 5)"]
  },
  desert: {
    name: 'Calico Desert',
    icon: '🏜️',
    spring: ['Cactus Fruit', 'Coconut'],
    summer: ['Cactus Fruit', 'Coconut'],
    fall: ['Cactus Fruit', 'Coconut'],
    winter: ['Cactus Fruit', 'Coconut'],
    fishing: [{name:'Sandfish',season:'All (desert pond)'}, {name:'Scorpion Carp',season:'All (desert pond)'}],
    npcs: ['Sandy', 'Skull Cavern', 'Casino', 'Traveling Merchant (Fri/Sun)'],
    shops: ["Oasis (9-11pm)", "Casino (9am-1am)", "Desert Trader (6am-2am)", "Skull Cavern (unlocked after Bus repaired)"],
    mine: {floors:'Skull Cavern (infinite)',mainOre:'Iridium',special:'Unlocked via Bus Repair (42,500g/CC Bundle)'}
  },
  ginger: {
    name: 'Ginger Island',
    icon: '🏝️',
    spring: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    summer: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    fall: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    winter: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    fishing: [{name:'Blue Discus',season:'All'}, {name:'Flounder',season:'All'}, {name:'Lionfish',season:'All'}, {name:'Stingray',season:'All'}, {name:'Tuna',season:'All'}, {name:'Pufferfish',season:'All'}],
    npcs: ['Leo', 'Birdie', 'Professor Snail', 'Qi'],
    shops: ["Qi's Walnut Room", "Volcano Dungeon (10 levels)", "Island Field Office"],
    mine: {floors:'Volcano Dungeon (10 levels)',mainOre:'Cinder Shard → Galaxy Souls',special:'Each of 10 levels has gem nodes + chest at the end'}
  }
};

function showRegion(region) {
  const data = regionData[region];
  if (!data) return;
  
  document.getElementById('region-info').innerHTML = `<h3>${data.icon} ${data.name}</h3>`;
  document.getElementById('region-details').style.display = 'block';
  document.getElementById('region-title').textContent = `${data.icon} ${data.name}`;
  
  document.getElementById('spring-forage-list').textContent = data.spring.join(' · ');
  document.getElementById('summer-forage-list').textContent = data.summer.join(' · ');
  document.getElementById('fall-forage-list').textContent = data.fall.join(' · ');
  document.getElementById('winter-forage-list').textContent = (data.winter || ['None']).join(' · ');
  
  // Fish — format with seasons
  const fishText = data.fishing.map(f => typeof f === 'string' ? f : `${f.name} (${f.season})`).join(' · ');
  document.getElementById('fishing-list').textContent = fishText;
  
  // NPCs
  document.getElementById('npcs-list').textContent = data.npcs.join(' · ');
  
  // Mine info (mountain, desert, ginger)
  const mineSection = document.getElementById('mine-section');
  if (data.mine) {
    mineSection.style.display = 'block';
    document.getElementById('mine-floors').textContent = `🏗️ Floors: ${data.mine.floors}`;
    document.getElementById('mine-ore').textContent = `⛏️ Main Ore: ${data.mine.mainOre}`;
    document.getElementById('mine-special').textContent = `✨ ${data.mine.special}`;
  } else {
    mineSection.style.display = 'none';
  }
  
  // Shops
  const shopsSection = document.getElementById('shops-section');
  if (data.shops) {
    shopsSection.style.display = 'block';
    document.getElementById('shops-list').textContent = data.shops.join(' · ');
  } else {
    shopsSection.style.display = 'none';
  }
  
  // Tips
  const tipsSection = document.getElementById('tips-section');
  if (data.tips || data.secrets) {
    tipsSection.style.display = 'block';
    document.getElementById('tips-text').textContent = data.secrets || data.tips || '';
  } else {
    tipsSection.style.display = 'none';
  }
  
  // Scroll to details
  document.getElementById('region-details').scrollIntoView({behavior: 'smooth'});
}
</script>

<style>
.map-container {
  margin: 20px 0;
  padding: 10px;
  background: var(--el, #2c2c35);
  border-radius: 12px;
  border: 1px solid var(--bd, #35353e);
}
.map-region {
  transition: all 0.3s;
}
.map-region:hover {
  filter: brightness(1.2);
}
.region-info {
  background: var(--card, #24242b);
  border: 1px solid var(--ac, #c9a96e);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 16px 0;
}
.region-info h3 {
  margin: 0;
  color: var(--ac, #c9a96e);
}
.forage-section {
  background: var(--card, #24242b);
  border: 1px solid var(--bd, #35353e);
  border-radius: 8px;
  padding: 12px 16px;
  margin: 10px 0;
}
.forage-section h4 {
  margin: 0 0 6px 0;
  color: var(--t1, #e8e6e1);
}
.forage-section p {
  margin: 0;
  color: var(--t2, #9b9a95);
  line-height: 1.8;
}
</style>

---

> 🛒 [**Buy Stardew Valley on Steam**](https://store.steampowered.com/app/413150/) — Support the developer!
