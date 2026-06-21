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
  
  <div id="fishing-section" class="forage-section">
    <h4>🎣 Fish Available</h4>
    <p id="fishing-list"></p>
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
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Spring Onion'],
    summer: ['Spice Berry', 'Summer Spangle', 'Sweet Pea'],
    fall: ['Blackberry', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    fishing: ['Bullhead', 'Bream', 'Carp', 'Sunfish', 'Chub', 'Perch (Winter)', 'Pike (Winter)'],
    npcs: ['Abigail', 'Alex', 'Caroline', 'Emily', 'Evelyn', 'George', 'Gus', 'Harvey', 'Jas', 'Jodi', 'Kent', 'Lewis', 'Marnie', 'Pam', 'Penny', 'Pierre', 'Robin', 'Sam', 'Shane', 'Vincent', 'Willy']
  },
  farm: {
    name: 'Your Farm',
    spring: ['Wild Horseradish', 'Daffodil', 'Leek', 'Dandelion'],
    summer: ['Spice Berry', 'Sweet Pea'],
    fall: ['Common Mushroom', 'Hazelnut', 'Blackberry'],
    fishing: ['Carp', 'Bullhead', 'Sunfish'],
    npcs: ['None — it\'s your private farm!']
  },
  beach: {
    name: 'The Beach',
    spring: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    summer: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    fall: ['Coral', 'Clam', 'Mussel', 'Nautilus Shell', 'Oyster', 'Rainbow Shell'],
    fishing: ['Anchovy', 'Red Mullet', 'Sardine', 'Squid (Winter)', 'Tuna', 'Halibut (Spring/Summer)', 'Pufferfish (Summer)', 'Super Cucumber (Summer/Night)', 'Lobster (Crab Pot)', 'Shrimp (Crab Pot)'],
    npcs: ['Willy', 'Elliott']
  },
  forest: {
    name: 'Cindersap Forest',
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Morel', 'Salmonberry (15-18)'],
    summer: ['Fiddlehead Fern', 'Spice Berry', 'Sweet Pea', 'Red Mushroom'],
    fall: ['Blackberry', 'Chanterelle', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    fishing: ['Bullhead', 'Bream', 'Carp', 'Chub', 'Walleye (Fall/Rain)', 'Pike (Winter)'],
    npcs: ['Marnie', 'Sebastian', 'Wizard', 'Leah', 'Marlon', 'Gil']
  },
  mountain: {
    name: 'Mountains',
    spring: ['Daffodil', 'Dandelion', 'Leek', 'Morel'],
    summer: ['Fiddlehead Fern', 'Spice Berry', 'Sweet Pea'],
    fall: ['Blackberry', 'Chanterelle', 'Common Mushroom', 'Hazelnut', 'Wild Plum'],
    fishing: ['Bullhead', 'Bream', 'Carp', 'Chub', 'Largemouth Bass', 'Sturgeon', 'Walleye (Fall/Rain)', 'Pike (Winter)', 'Perch (Winter)'],
    npcs: ['Demetrius', 'Linus', 'Maru', 'Robin', 'Clint', 'Pam']
  },
  desert: {
    name: 'Calico Desert',
    spring: ['Cactus Fruit', 'Coconut'],
    summer: ['Cactus Fruit', 'Coconut'],
    fall: ['Cactus Fruit', 'Coconut'],
    fishing: ['Sandfish', 'Scorpion Carp'],
    npcs: ['Sandy', 'Skull Cavern', 'Casino', 'Traveling Merchant (Fri/Sun)']
  },
  ginger: {
    name: 'Ginger Island',
    spring: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    summer: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    fall: ['Ginger', 'Magma Cap', 'Taro Root', 'Cinder Shard'],
    fishing: ['Blue Discus', 'Flounder', 'Lionfish', 'Stingray', 'Tuna', 'Pufferfish'],
    npcs: ['Leo', 'Birdie', 'Professor Snail', 'Qi']
  }
};

function showRegion(region) {
  const data = regionData[region];
  if (!data) return;
  
  document.getElementById('region-info').innerHTML = `<h3>📍 ${data.name}</h3>`;
  document.getElementById('region-details').style.display = 'block';
  document.getElementById('region-title').textContent = data.name;
  
  document.getElementById('spring-forage-list').textContent = data.spring.join(' · ');
  document.getElementById('summer-forage-list').textContent = data.summer.join(' · ');
  document.getElementById('fall-forage-list').textContent = data.fall.join(' · ');
  document.getElementById('fishing-list').textContent = data.fishing.join(' · ');
  document.getElementById('npcs-list').textContent = data.npcs.join(' · ');
  
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
