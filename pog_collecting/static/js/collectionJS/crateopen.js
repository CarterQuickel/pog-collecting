// crate opening function
function openCrate(cost, index) {
    if (inventory.length >= Isize || money < cost) {
        return;
    }
    if (inventory.length >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }

    // variables
    let rand = Math.random();
    let cumulativeChance = 0;
    let color = "white";
    let income = 5;

    for (let item of crates[Object.keys(crates)[index]].rarities) {

        // check if random number is within the chance range
        cumulativeChance += item.chance;
        if (rand < cumulativeChance) {

            // find all pogs with that rarity
            const matchingRarities = pogList.filter(r => r.rarity === item.name);
            if (matchingRarities.length === 0) continue;

            // Pick one at random
            const rarity = matchingRarities[Math.floor(Math.random() * matchingRarities.length)];

            // find rarity color details
            const match = rarityColor.find(r => r.name === rarity.rarity);

            //id
            const id = Math.random() * 100000

            // rarity color
            color = match ? match.color : "white";

            // rarity income
            income = match ? match.income : 5;

            // add to pog amount if new pog
            let added = { name: rarity.name }
            const exists = inventory.find(i => i.name === added.name);
            if (!exists) {
                if (pogAmount < maxPogs) {
                    pogAmount++;
                }
            }

            // dragon pog stuff
            if (rarity.name === "Dragon Ball") {
                const inv = inventory.map(i => (i?.name).toLowerCase());
                const missing = [1, 2, 3, 4, 5, 6, 7].find(num => !inv.includes(`dragon ball ${num}`));
                if (missing) {
                    rarity.name = `Dragon Ball ${missing}`;
                }
            }

            // Add result to inventory
            if (rarity.name != "Dragon Ball") {
                inventory.push({ locked: false, pogid: rarity.id, name: rarity.name, pogcol: rarity.color, color: color, income: income, value: rarity.rarity, id: id, description: rarity.description, creator: rarity.creator });
            }

            // XP gain
            xp += Math.floor(income * (15 * level / 15)); // gain XP based on income and level
            levelup();

            // Deduct cost
            money -= cost;
            cratesOpened++;
            refreshInventory();
            break;
        }
    }

}

// crate open events
document.getElementById("crate1").addEventListener("click", () => openCrate(crates[Object.keys(crates)[0]].price, 0));
document.getElementById("crate2").addEventListener("click", () => openCrate(crates[Object.keys(crates)[1]].price, 1));
document.getElementById("crate3").addEventListener("click", () => openCrate(crates[Object.keys(crates)[2]].price, 2));
document.getElementById("crate4").addEventListener("click", () => openCrate(crates[Object.keys(crates)[3]].price, 3));
document.getElementById("crate5").addEventListener("click", () => openCrate(crates[Object.keys(crates)[4]].price, 4));

//crate open 5 events
document.getElementById("crate1_b5").addEventListener("click", () => {
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[0]].price * 5) {
        alert("Not enough money to open 5 crates!");
        return;
    }
    if (inventory.length + 5 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 5; i++) {
        openCrate(crates[Object.keys(crates)[0]].price, 0);
    }
});
document.getElementById("crate2_b5").addEventListener("click", () => {
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[1]].price * 5) {
        alert("Not enough money to open 5 crates!");
        return;
    }
    if (inventory.length + 5 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 5; i++) {
        openCrate(crates[Object.keys(crates)[1]].price, 1);
    }
});
document.getElementById("crate3_b5").addEventListener("click", () => {
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[2]].price * 5) {
        alert("Not enough money to open 5 crates!");
        return;
    }
    if (inventory.length + 5 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 5; i++) {
        openCrate(crates[Object.keys(crates)[2]].price, 2);
    }
});
document.getElementById("crate4_b5").addEventListener("click", () => {
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[3]].price * 5) {
        alert("Not enough money to open 5 crates!");
        return;
    }
    if (inventory.length + 5 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 5; i++) {
        openCrate(crates[Object.keys(crates)[3]].price, 3);
    }
});
document.getElementById("crate5_b5").addEventListener("click", () => {
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[4]].price * 5) {
        alert("Not enough money to open 5 crates!");
        return;
    }
    if (inventory.length + 5 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 5; i++) {
        openCrate(crates[Object.keys(crates)[4]].price, 4);
    }
});

//crate open 10 events
document.getElementById("crate1_b10").addEventListener("click", () => {
    if (inventory.length + 10 > Isize) {
        alert("Not enough inventory space to open 10 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[0]].price * 10) {
        alert("Not enough money to open 10 crates!");
        return;
    }
    if (inventory.length + 10 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        openCrate(crates[Object.keys(crates)[0]].price, 0);
    }
});
document.getElementById("crate2_b10").addEventListener("click", () => {
    if (inventory.length + 10 > Isize) {
        alert("Not enough inventory space to open 10 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[1]].price * 10) {
        alert("Not enough money to open 10 crates!");
        return;
    }
    if (inventory.length + 10 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        openCrate(crates[Object.keys(crates)[1]].price, 1);
    }
});
document.getElementById("crate3_b10").addEventListener("click", () => {
    if (inventory.length + 10 > Isize) {
        alert("Not enough inventory space to open 10 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[2]].price * 10) {
        alert("Not enough money to open 10 crates!");
        return;
    }
    if (inventory.length + 10 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        openCrate(crates[Object.keys(crates)[2]].price, 2);
    }
});
document.getElementById("crate4_b10").addEventListener("click", () => {
    if (inventory.length + 10 > Isize) {
        alert("Not enough inventory space to open 10 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[3]].price * 10) {
        alert("Not enough money to open 10 crates!");
        return;
    }
    if (inventory.length + 10 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        openCrate(crates[Object.keys(crates)[3]].price, 3);
    }
});
document.getElementById("crate5_b10").addEventListener("click", () => {
    if (inventory.length + 10 > Isize) {
        alert("Not enough inventory space to open 10 crates!");
        return;
    }
    if (money < crates[Object.keys(crates)[4]].price * 10) {
        alert("Not enough money to open 10 crates!");
        return;
    }
    if (inventory.length + 10 >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }
    for (let i = 0; i < 10; i++) {
        openCrate(crates[Object.keys(crates)[4]].price, 4);
    }
});

document.getElementById("openCratesBtn").addEventListener("click", () => {
    if (enabledCrate == false) {
        document.getElementById("cratesCont").style.display = "block";
        enabledCrate = true;
    } else {
        document.getElementById("cratesCont").style.display = "none";
        enabledCrate = false;
    }
});

async function openCrateWithAnimation(cost, index) {
    // Your existing validation checks...
    if (inventory.length >= Isize || money < cost) return;
    if (inventory.length >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }

    // Calculate the result first (your existing logic)
    const pulledPog = calculatePogResult(cost, index);
    
    // Check if it's mythic
    const isMythic = pulledPog.rarity === "Mythic";
    
    // Show shooting star animation
    await showShootingStars(isMythic);
    
    // If mythic, show click prompt and wait
    if (isMythic) {
        await showClickToContinue();
        // When clicked, trigger explosion
        await showGoldenExplosion();
    }
    
    // Reveal the pog and add to inventory
    revealAndAddPog(pulledPog);
}

function calculatePogResult(cost, index) {
    let rand = Math.random();
    let cumulativeChance = 0;
    
    for (let item of crates[Object.keys(crates)[index]].rarities) {
        cumulativeChance += item.chance;
        if (rand < cumulativeChance) {
            // Your existing logic to pick the pog
            // Return the pog data instead of immediately adding to inventory
            return {
                name: rarity.name,
                rarity: rarity.rarity,
                color: color,
                income: income,
                // ... other properties
            };
        }
    }
}

// New async version of openCrate
async function openCrateWithAnimation(cost, index, isMultiPull = false, currentPull = 1, totalPulls = 1) {
    // Your existing validation...
    if (inventory.length >= Isize || money < cost) return null;
    if (inventory.length >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return null;
    }

    // Calculate result using your existing logic
    const result = calculatePogResult(cost, index);
    if (!result) return null;

    // Show animation for this pull
    await showPullAnimation(result, currentPull, totalPulls);
    
    // Add to inventory after animation
    addPogToInventory(result);
    
    return result;
}

// Modified single crate events
document.getElementById("crate1").addEventListener("click", () => openCrateWithAnimation(crates[Object.keys(crates)[0]].price, 0, false, 1, 1));

// Modified multi-crate events (5x)
document.getElementById("crate1_b5").addEventListener("click", async () => {
    // Your existing validation checks...
    if (inventory.length + 5 > Isize) {
        alert("Not enough inventory space to open 5 crates!");
        return;
    }
    // ... other checks

    // Open 5 crates with one animation
    await openMultipleCrates(crates[Object.keys(crates)[0]].price, 0, 5);
});

function displayGachaResults(results, pullCount) {
    // Sort by rarity (highest to lowest)
    const rarityOrder = { 
        'Unique': 6, 
        'Mythic': 5, 
        'Rare': 4, 
        'Uncommon': 3, 
        'Common': 2, 
        'Trash': 1 
    };
    
    // Sort highest to lowest (Unique first, Trash last)
    results.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    
    // Update pull counter
    document.getElementById('pullCounter').textContent = `${pullCount} Pull${pullCount > 1 ? 's' : ''}`;
    
    // Clear previous results
    const container = document.getElementById('pogLineContainer');
    container.innerHTML = '';
    
    // Add each pog with staggered animation
    results.forEach((pog, index) => {
        setTimeout(() => {
            const pogElement = createPogResultElement(pog);
            container.appendChild(pogElement);
        }, index * 200); // 200ms delay between each pog
    });
    
    // Show results container
    document.getElementById('gachaResults').style.display = 'block';
}


function createPogResultElement(pog) {
    const pogDiv = document.createElement('div');
    pogDiv.className = `resultPog ${pog.rarity.toLowerCase()}`;
    
    pogDiv.innerHTML = `
        <div class="pogIcon" style="background-color: ${pog.pogcol};">
            ${pog.name}
        </div>
        <div class="pogName">${pog.name}</div>
        <div class="pogRarity">${pog.rarity}</div>
    `;
    
    return pogDiv;
}

async function openMultipleCrates(cost, index, count) {
    // Validation checks first
    if (inventory.length + count > Isize) {
        alert(`Not enough inventory space to open ${count} crates!`);
        return;
    }
    if (money < cost * count) {
        alert(`Not enough money to open ${count} crates!`);
        return;
    }
    if (inventory.length + count >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return;
    }

    // Calculate all results first (without adding to inventory)
    const results = [];
    for (let i = 0; i < count; i++) {
        const result = calculatePogResult(cost, index);
        if (result) {
            results.push(result);
        }
    }
    
    // Show animation for all pulls
    await showPullAnimation(results, 0, count);
    
    // Add to inventory after animation
    results.forEach(result => addPogToInventory(result));
    
    // Display results
    displayGachaResults(results, count);
}

async function showShootingStarsAnimation(pullResults = []) {
    // Determine animation type based on highest rarity pulled
    const hasUnique = pullResults.some(pog => pog.rarity === 'Unique');
    const hasMythic = pullResults.some(pog => pog.rarity === 'Mythic');
    
    let animationType, duration, starCount;
    
    if (hasUnique) {
        animationType = 'unique';
        duration = 8000; // 8 seconds
        starCount = 15; // More stars for unique
    } else if (hasMythic) {
        animationType = 'mythic';
        duration = 5000; // 5 seconds
        starCount = 10;
    } else {
        animationType = 'normal';
        duration = 3000; // 3 seconds for common pulls
        starCount = 8;
    }
    
    // Show the overlay
    document.getElementById('gachaOverlay').style.display = 'block';
    document.getElementById('skipAnimation').style.display = 'block';
    
    // Create shooting stars
    createShootingStars(animationType, starCount);
    
    // Special effects for unique
    if (hasUnique) {
        addUniqueScreenEffects();
    }
    
    // Wait for duration or skip
    await waitForAnimationOrSkip(duration);
    
    // Clean up
    document.getElementById('shootingStarsContainer').innerHTML = '';
    document.getElementById('skipAnimation').style.display = 'none';
}

function createShootingStars(type, count) {
    const container = document.getElementById('shootingStarsContainer');
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = `shootingStar ${type}`;
            
            // Random starting positions and paths
            const startY = Math.random() * window.innerHeight;
            const delay = Math.random() * 2000; // Stagger the stars
            
            star.style.cssText = `
                position: absolute;
                width: ${type === 'unique' ? '8px' : '6px'};
                height: ${type === 'unique' ? '60px' : '40px'};
                top: ${startY}px;
                left: -100px;
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                animation-delay: ${delay}ms;
            `;
            
            container.appendChild(star);
            
            // Remove star after animation
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, 4000 + delay);
            
        }, i * 200); // Stagger star creation
    }
}

function addUniqueScreenEffects() {
    // Rainbow border flash effect
    const border = document.createElement('div');
    border.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border: 8px solid;
        border-image: linear-gradient(45deg, 
            #ff0000, #ff7f00, #ffff00, #00ff00, 
            #0000ff, #4b0082, #9400d3, #ff0000) 1;
        pointer-events: none;
        z-index: 10000;
        animation: borderPulse 1s ease-in-out infinite;
    `;
    
    document.body.appendChild(border);
    
    // Remove after animation
    setTimeout(() => {
        if (border.parentNode) {
            border.parentNode.removeChild(border);
        }
    }, 8000);
}

async function showUniqueParticleExplosion() {
    const container = document.getElementById('shootingStarsContainer');
    
    // Create 20-30 rainbow particles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'rainbowParticle';
        
        const angle = (i / 25) * 2 * Math.PI;
        const distance = 200 + Math.random() * 100;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: linear-gradient(45deg, 
                #ff0000, #ff7f00, #ffff00, #00ff00, 
                #0000ff, #4b0082, #9400d3);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: explodeRainbow 1.5s ease-out forwards;
            animation-delay: ${i * 20}ms;
        `;
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        container.appendChild(particle);
    }
    
    // Wait for explosion to finish
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clean up particles
    container.innerHTML = '';
}

async function openMultipleCrates(cost, index, count) {async function showUniqueParticleExplosion() {
    const container = document.getElementById('shootingStarsContainer');
    
    // SUDDEN SCREENSHAKE - triggers immediately
    document.body.classList.add('screenshake');
    
    // Remove screenshake class after animation
    setTimeout(() => {
        document.body.classList.remove('screenshake');
    }, 800);
    
    // Create BIG rainbow particle explosion (30+ particles)
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.className = 'rainbowParticle';
        
        const angle = (i / 35) * 2 * Math.PI;
        const distance = 150 + Math.random() * 200; // Bigger spread
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        // Vary particle sizes for more impact
        const size = 8 + Math.random() * 12; // 8-20px particles
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: explodeRainbow 2.5s ease-out forwards;
            animation-delay: ${i * 15}ms;
            z-index: 10002;
        `;
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        container.appendChild(particle);
    }
    
    // Add screen flash effect at the moment of explosion
    addUniqueScreenFlash();
    
    // Wait for explosion to finish
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Clean up particles
    const particles = container.querySelectorAll('.rainbowParticle');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

function addUniqueScreenFlash() {
    // Bright rainbow flash that covers the whole screen briefly
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 215, 0, 0.6) 30%,
            rgba(255, 0, 255, 0.4) 60%,
            transparent 100%);
        pointer-events: none;
        z-index: 10001;
        animation: uniqueFlash 0.5s ease-out;
    `;
    
    document.body.appendChild(flash);
    
    // Remove flash after animation
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 500);
}


    // Show shooting stars animation (5 seconds, skippable)
    await showShootingStarsAnimation();
    
    // Show "click to continue"
    await showClickToContinue();
    
    // Display all results in Genshin style
    displayGachaResults(results, count);
    
    // Wait for user to close results
    await waitForResultsClose();
    
    // Add all pogs to inventory after viewing results
    results.forEach(result => addPogToInventory(result));
    
    // Deduct money and update displays
    money -= cost * count;
    cratesOpened += count;
    refreshInventory();
}
