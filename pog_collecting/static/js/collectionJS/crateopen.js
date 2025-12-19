// ===== HELPER FUNCTIONS =====

function validateCrateOpening(cost, count = 1) {
    if (inventory.length + count > Isize) {
        alert(`Not enough inventory space to open ${count} crate${count > 1 ? 's' : ''}!`);
        return false;
    }
    if (money < cost * count) {
        alert(`Not enough money to open ${count} crate${count > 1 ? 's' : ''}!`);
        return false;
    }
    if (inventory.length + count >= 999) {
        alert("Inventory full! Sell some pogs to make space.");
        return false;
    }
    return true;
}

function calculatePogResult(cost, index) {
    let rand = Math.random();
    let cumulativeChance = 0;
    let color = "white";
    let income = 5;

    for (let item of crates[Object.keys(crates)[index]].rarities) {
        cumulativeChance += item.chance;
        if (rand < cumulativeChance) {
            // find all pogs with that rarity
            const matchingRarities = pogList.filter(r => r.rarity === item.name);
            if (matchingRarities.length === 0) continue;

            // Pick one at random
            const rarity = matchingRarities[Math.floor(Math.random() * matchingRarities.length)];

            // find rarity color details
            const match = rarityColor.find(r => r.name === rarity.rarity);
            const id = Math.random() * 100000;

            // rarity color and income
            color = match ? match.color : "white";
            income = match ? match.income : 5;

            // dragon pog stuff
            let pogName = rarity.name;
            if (rarity.name === "Dragon Ball") {
                const inv = inventory.map(i => (i?.name).toLowerCase());
                const missing = [1, 2, 3, 4, 5, 6, 7].find(num => !inv.includes(`dragon ball ${num}`));
                if (missing) {
                    pogName = `Dragon Ball ${missing}`;
                }
            }

            // Add result to inventory
            if (rarity.name != "Dragon Ball") {
                inventory.push({ locked: false, pogid: rarity.id, name: rarity.name, pogcol: rarity.color, color: color, income: income, value: rarity.rarity, id: id, description: rarity.description, creator: rarity.creator });
            }

            // XP gain
            xp += Math.floor(income * (2 * 1 / level)); // gain XP based on income and level
            levelup();

            // Deduct cost
            money -= cost;
            cratesOpened++;
            refreshInventory();
            break;
        }
    }
    return null;
}

function addPogToInventory(pogResult) {
    if (!pogResult) return;
    
    // add to pog amount if new pog
    const exists = inventory.find(i => i.name === pogResult.name);
    if (!exists && pogAmount < maxPogs) {
        pogAmount++;
    }

    // Add result to inventory (skip Dragon Ball check since it's handled in calculation)
    if (pogResult.name !== "Dragon Ball") {
        inventory.push(pogResult);
    }

    // XP gain
    xp += Math.floor(pogResult.income * (15 * level / 15));
    levelup();
}

// ===== MAIN CRATE OPENING FUNCTIONS =====

function openCrate(cost, index) {
    if (!validateCrateOpening(cost, 1)) return;

    const result = calculatePogResult(cost, index);
    if (!result) return;

    addPogToInventory(result);

    // Deduct cost and update
    money -= cost;
    cratesOpened++;
    refreshInventory();
}

function openMultipleCrates(cost, index, count) {
    if (!validateCrateOpening(cost, count)) return;

    // Calculate all results
    const results = [];
    for (let i = 0; i < count; i++) {
        const result = calculatePogResult(cost, index);
        if (result) results.push(result);
    }

    // Add all to inventory
    results.forEach(result => addPogToInventory(result));

    // Deduct money and update
    money -= cost * count;
    cratesOpened += count;
    refreshInventory();
}

// ===== ANIMATION FUNCTIONS (for future integration) =====

// ===== UPDATED SINGLE CRATE WITH BETTER CLEANUP =====

async function openCrateWithAnimation(cost, index) {
    if (!validateCrateOpening(cost, 1)) return;

    const result = calculatePogResult(cost, index);
    if (!result) return;

    // Show animation based on rarity
    await showAnimationForRarity(result.rarity, result);

    // Add to inventory AFTER animation completes
    addPogToInventory(result);
    money -= cost;
    cratesOpened++;
    
    // Make sure inventory refreshes and is visible
    refreshInventory();
    
    // Ensure the overlay is fully hidden
    setTimeout(() => {
        const overlay = document.getElementById('gachaOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }, 100);
}


async function openMultipleCratesWithAnimation(cost, index, count) {
    if (!validateCrateOpening(cost, count)) return;

    // Calculate all results
    const results = [];
    for (let i = 0; i < count; i++) {
        const result = calculatePogResult(cost, index);
        if (result) results.push(result);
    }

    // TODO: Add multi-pull animation
    // await showMultiPullAnimation(results, count);

    // Add all to inventory
    results.forEach(result => addPogToInventory(result));
    money -= cost * count;
    cratesOpened += count;
    refreshInventory();
}

// ===== EVENT LISTENERS =====

const crateButtons = [
    { single: "crate1", multi5: "crate1_b5", multi10: "crate1_b10", index: 0 },
    { single: "crate2", multi5: "crate2_b5", multi10: "crate2_b10", index: 1 },
    { single: "crate3", multi5: "crate3_b5", multi10: "crate3_b10", index: 2 },
    { single: "crate4", multi5: "crate4_b5", multi10: "crate4_b10", index: 3 },
    { single: "crate5", multi5: "crate5_b5", multi10: "crate5_b10", index: 4 }
];

// ===== ANIMATION INTEGRATION =====

async function showAnimationForRarity(rarity, pogResult) {
    document.getElementById('gachaOverlay').style.display = 'block';
    
    let animationType, starCount, duration;
    
    switch(rarity) {
        case 'Unique':
            animationType = 'unique';
            starCount = 15;
            duration = 4000;
            addUniqueScreenEffects();
            break;
        case 'Mythic':
            animationType = 'mythic';
            starCount = 12;
            duration = 3500;
            break;
        default:
            animationType = 'normal';
            starCount = 8;
            duration = 2500;
            break;
    }
    
    createStarShapedShootingStars(animationType, starCount);
    await new Promise(resolve => setTimeout(resolve, duration));
    
    const isSpecial = rarity === 'Unique' || rarity === 'Mythic';
    await showClickToContinue(isSpecial);
    
    if (rarity === 'Unique') {
        await createMiniExplosion();
        await revealUniquePogInCenter(pogResult);
        await showUniqueParticleExplosion();
    }
    
    // IMMEDIATE cleanup for common pogs
    const cleanupDelay = (rarity === 'Common' || rarity === 'Trash') ? 100 : 1000;
    
    setTimeout(() => {
        document.getElementById('gachaOverlay').style.display = 'none';
        document.getElementById('shootingStarsContainer').innerHTML = '';
        const centerReveal = document.getElementById('centerPogReveal');
        if (centerReveal) {
            centerReveal.style.display = 'none';
            centerReveal.innerHTML = '';
        }
    }, cleanupDelay);
}

// Updated main functions with animation
async function openCrateWithAnimation(cost, index) {
    if (!validateCrateOpening(cost, 1)) return;

    const result = calculatePogResult(cost, index);
    if (!result) return;

    console.log("Opening crate with result:", result.name, result.rarity); // DEBUG

    // Show animation based on rarity
    await showAnimationForRarity(result.rarity, result);

    // Add to inventory AFTER animation completes
    addPogToInventory(result);
    money -= cost;
    cratesOpened++;
    
    console.log("About to refresh inventory..."); // DEBUG
    
    // Wait a bit longer before refreshing for common pogs
    setTimeout(() => {
        refreshInventory();
        console.log("Inventory refreshed!"); // DEBUG
    }, 500);
}


// ===== UPDATED EVENT LISTENERS =====

// Set up all event listeners with animation
// ===== UPDATED EVENT LISTENERS WITH MULTI-PULL ANIMATIONS =====

crateButtons.forEach(crate => {
    const price = crates[Object.keys(crates)[crate.index]].price;
    
    // Single crate WITH animation
    document.getElementById(crate.single).addEventListener("click", () => 
        openCrateWithAnimation(price, crate.index)
    );
    
    // Multi-crates WITH animation
    document.getElementById(crate.multi5).addEventListener("click", () => 
        openMultipleCratesWithAnimation(price, crate.index, 5)
    );
    
    document.getElementById(crate.multi10).addEventListener("click", () => 
        openMultipleCratesWithAnimation(price, crate.index, 10)
    );
});


// Crates container toggle - ADD THIS!
document.getElementById("openCratesBtn").addEventListener("click", () => {
    const cratesContainer = document.getElementById("cratesCont");
    const isVisible = cratesContainer.style.display === "block";
    cratesContainer.style.display = isVisible ? "none" : "block";
    enabledCrate = !isVisible;
});



// ===== ANIMATION HELPER FUNCTIONS =====

function createStarShapedShootingStars(type, count) {
    const container = document.getElementById('shootingStarsContainer');
    const isRainbow = type === 'unique';
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const starContainer = document.createElement('div');
            starContainer.className = 'genshinStarShape';
            
            // Calculate paths that converge toward center
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Random starting position from edges
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = Math.max(window.innerWidth, window.innerHeight) * 0.8;
            
            const startX = centerX + Math.cos(angle) * distance;
            const startY = centerY + Math.sin(angle) * distance;
            
            // Mid-point for curved path
            const midX = centerX + Math.cos(angle) * (distance * 0.3);
            const midY = centerY + Math.sin(angle) * (distance * 0.3);
            
            // Vary star sizes
            const size = 15 + Math.random() * 20; // 15-35px stars
            
            // Create the star
            starContainer.innerHTML = `
                <div class="simpleStarShape ${isRainbow ? 'rainbow' : ''}" style="
                    width: ${size}px;
                    height: ${size}px;
                    animation: starTwinkle 1s ease-in-out infinite;
                "></div>
            `;
            
            // Position and animate
            starContainer.style.cssText = `
                left: ${startX}px;
                top: ${startY}px;
                --startX: 0px;
                --startY: 0px;
                --midX: ${midX - startX}px;
                --midY: ${midY - startY}px;
                --endX: ${centerX - startX}px;
                --endY: ${centerY - startY}px;
                animation: starShootToCenter 3s ease-out;
                animation-delay: ${i * 150}ms;
            `;
            
            container.appendChild(starContainer);
            
            // Remove after animation
            setTimeout(() => {
                if (starContainer.parentNode) {
                    starContainer.parentNode.removeChild(starContainer);
                }
            }, 3000 + (i * 150) + 500);
            
        }, i * 200);
    }
}

async function showClickToContinue(hasSpecial = false) {
    const clickDiv = document.getElementById('clickToContinue');
    
    if (hasSpecial) {
        clickDiv.innerHTML = `
            <p style="color: #ff00ff; font-size: 28px; text-shadow: 0 0 20px #ff00ff;">
                ✨ Click anywhere to witness your special pog! ✨
            </p>
        `;
        clickDiv.style.animation = 'uniquePulse 1s ease-in-out infinite';
    } else {
        clickDiv.innerHTML = '<p>Click anywhere to continue...</p>';
        clickDiv.style.animation = 'pulse 1.5s infinite';
    }
    
    clickDiv.style.display = 'block';
    
    // Wait for click
    return new Promise(resolve => {
        const handleClick = () => {
            clickDiv.style.display = 'none';
            document.removeEventListener('click', handleClick);
            resolve();
        };
        document.addEventListener('click', handleClick);
    });
}

async function createMiniExplosion() {
    const container = document.getElementById('shootingStarsContainer');
    
    // Create 10 mini explosion particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        
        const angle = (i / 10) * 2 * Math.PI;
        const distance = 50;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, #ffffff, #ffd700);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: miniExplode 1s ease-out forwards;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            z-index: 10001;
        `;
        
        particle.style.setProperty('--miniX', endX + 'px');
        particle.style.setProperty('--miniY', endY + 'px');
        
        container.appendChild(particle);
    }
    
    // Wait for mini explosion to finish
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clean up mini particles
    const miniParticles = container.querySelectorAll('[style*="miniExplode"]');
    miniParticles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
}

async function revealUniquePogInCenter(uniquePog) {
    let centerReveal = document.getElementById('centerPogReveal');
    if (!centerReveal) {
        centerReveal = document.createElement('div');
        centerReveal.id = 'centerPogReveal';
        centerReveal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10003;
        `;
        document.getElementById('gachaOverlay').appendChild(centerReveal);
    }
    
    // Circular pog display
    centerReveal.innerHTML = `
        <div style="
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(135deg, 
                #ff00ff, #ff69b4, #9400d3, #ffd700);
            background-size: 400% 400%;
            border: 8px solid white;
            box-shadow: 
                0 0 50px rgba(255, 0, 255, 1),
                0 0 100px rgba(255, 215, 0, 0.8),
                inset 0 0 40px rgba(255, 255, 255, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: uniquePogReveal 2s ease-out, uniqueBackgroundShimmer 2s ease-in-out infinite;
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        ">
            <!-- Circular shine effect -->
            <div style="
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: conic-gradient(
                    transparent, 
                    rgba(255, 255, 255, 0.4), 
                    transparent, 
                    rgba(255, 255, 255, 0.4), 
                    transparent
                );
                animation: circularShine 4s linear infinite;
                border-radius: 50%;
            "></div>
            
            <!-- Pog Name -->
            <div style="
                font-size: ${uniquePog.name.length > 12 ? '28px' : '32px'}; 
                font-weight: bold; 
                margin-bottom: 15px;
                text-shadow: 3px 3px 6px rgba(0,0,0,0.8);
                z-index: 1;
                max-width: 240px;
                word-wrap: break-word;
                line-height: 1.2;
            ">
                ${uniquePog.name}
            </div>
            
            <!-- Rarity Label -->
            <div style="
                font-size: 24px; 
                color: #ffffff; 
                text-shadow: 0 0 15px #ff00ff, 0 0 25px #ffd700;
                font-weight: bold;
                z-index: 1;
            ">
                ✨ UNIQUE ✨
            </div>
            
            <!-- Orbiting ring -->
            <div style="
                position: absolute;
                width: 320px;
                height: 320px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                animation: orbitRing 6s linear infinite;
            "></div>
        </div>
    `;
    
    centerReveal.style.display = 'block';
    
    // Trigger screenshake
    document.body.classList.add('screenshake');
    setTimeout(() => {
        document.body.classList.remove('screenshake');
    }, 800);
}

async function showUniqueParticleExplosion() {
    const container = document.getElementById('shootingStarsContainer');
    
    // Create 25 big rainbow particles
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        
        const angle = (i / 25) * 2 * Math.PI;
        const distance = 150 + Math.random() * 200;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        const size = 8 + Math.random() * 12;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, 
                #ff0000, #ff7f00, #ffff00, #00ff00, 
                #0000ff, #4b0082, #9400d3, #ff0000);
            background-size: 400% 400%;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: explodeRainbow 2.5s ease-out forwards, rainbowParticleShimmer 0.5s ease-in-out infinite;
            animation-delay: ${i * 15}ms;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
            z-index: 10002;
        `;
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        container.appendChild(particle);
    }
    
    // Screen flash
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
    
    setTimeout(() => {
        if (flash.parentNode) {
            flash.parentNode.removeChild(flash);
        }
    }, 500);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Clean up particles
    const particles = container.querySelectorAll('[style*="explodeRainbow"]');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
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
        z-index: 9999;
        animation: borderPulse 1s ease-in-out infinite;
    `;
    
    document.body.appendChild(border);
    
    // Remove after animation
    setTimeout(() => {
        if (border.parentNode) {
            border.parentNode.removeChild(border);
        }
    }, 6000);
}

// ===== MAIN ANIMATION SEQUENCES =====

async function showAnimationForRarity(rarity, pogResult) {
    document.getElementById('gachaOverlay').style.display = 'block';
    
    // Determine animation type and settings
    let animationType, starCount, duration;
    
    switch(rarity) {
        case 'Unique':
            animationType = 'unique';
            starCount = 15;
            duration = 4000;
            addUniqueScreenEffects();
            break;
        case 'Mythic':
            animationType = 'mythic';
            starCount = 12;
            duration = 3500;
            break;
        default:
            animationType = 'normal';
            starCount = 8;
            duration = 2500;
            break;
    }
    
    // Step 1: Shooting stars
    createStarShapedShootingStars(animationType, starCount);
    await new Promise(resolve => setTimeout(resolve, duration));
    
    // Step 2: Click to continue
    const isSpecial = rarity === 'Unique' || rarity === 'Mythic';
    await showClickToContinue(isSpecial);
    
    // Step 3: Show pog result based on rarity
    if (rarity === 'Unique') {
        await createMiniExplosion();
        await revealUniquePogInCenter(pogResult);
        await showUniqueParticleExplosion();
    } else if (rarity === 'Mythic') {
        await revealMythicPog(pogResult);
    } else {
        // Show simple reveal for common pogs
        await revealCommonPog(pogResult);
    }
    
    // Step 4: Clean up
    setTimeout(() => {
        document.getElementById('gachaOverlay').style.display = 'none';
        document.getElementById('shootingStarsContainer').innerHTML = '';
        const centerReveal = document.getElementById('centerPogReveal');
        if (centerReveal) {
            centerReveal.style.display = 'none';
            centerReveal.innerHTML = '';
        }
    }, 1500);
}


// ===== TEST FUNCTIONS =====

async function testCompleteStarAnimation() {
    console.log("Testing complete star animation...");
    
    // Create fake unique pog for testing
    const testPog = {
        name: "Rainbow Dragon",
        rarity: "Unique"
    };
    
    await showAnimationForRarity('Unique', testPog);
}

async function testNormalAnimation() {
    console.log("Testing normal animation...");
    
    const testPog = {
        name: "Common Pog",
        rarity: "Common"
    };
    
    await showAnimationForRarity('Common', testPog);
}

async function testMythicAnimation() {
    console.log("Testing mythic animation...");
    
    const testPog = {
        name: "Mythic Pog",
        rarity: "Mythic"
    };
    
    await showAnimationForRarity('Mythic', testPog);
}

// ===== MULTI-PULL WITH ANIMATION =====

async function openMultipleCratesWithAnimation(cost, index, count) {
    if (!validateCrateOpening(cost, count)) return;

    // Calculate all results first
    const results = [];
    for (let i = 0; i < count; i++) {
        const result = calculatePogResult(cost, index);
        if (result) results.push(result);
    }

    console.log(`Multi-pull results:`, results.map(r => `${r.name} (${r.rarity})`));

    // Determine the highest rarity pulled
    const rarityOrder = { 'Unique': 6, 'Mythic': 5, 'Rare': 4, 'Uncommon': 3, 'Common': 2, 'Trash': 1 };
    const highestRarity = results.reduce((highest, pog) => 
        rarityOrder[pog.rarity] > rarityOrder[highest.rarity] ? pog : highest
    );

    // Show multi-pull animation
    await showMultiPullAnimation(results, count, highestRarity);

    // Add all pogs to inventory AFTER animation
    results.forEach(result => addPogToInventory(result));

    // Deduct money and update
    money -= cost * count;
    cratesOpened += count;
    refreshInventory();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function addPogToInventory(pogResult) {
    if (!pogResult) return;
    
    console.log("Adding pog to inventory:", pogResult.name, pogResult.rarity); // DEBUG
    
    // add to pog amount if new pog
    const exists = inventory.find(i => i.name === pogResult.name);
    if (!exists && pogAmount < maxPogs) {
        pogAmount++;
    }

    // Add result to inventory (skip Dragon Ball check since it's handled in calculation)
    if (pogResult.name !== "Dragon Ball") {
        inventory.push(pogResult);
        console.log("Pog added! New inventory length:", inventory.length); // DEBUG
    }

    // XP gain
    xp += Math.floor(pogResult.income * (15 * level / 15));
    levelup();
}

// Temporary test function - add this to test
function testInventoryUpdate() {
    console.log("Testing inventory update...");
    
    // Create a fake common pog
    const testPog = {
        locked: false,
        pogid: "test123",
        name: "Test Common Pog",
        pogcol: "#blue",
        color: "blue",
        income: 10,
        value: "Common",
        rarity: "Common",
        id: Math.random() * 100000,
        description: "Test pog",
        creator: "Test"
    };
    
    console.log("Adding test pog:", testPog);
    addPogToInventory(testPog);
    refreshInventory();
    
    console.log("Current inventory length:", inventory.length);
    console.log("Last pog in inventory:", inventory[inventory.length - 1]);
}

// Simple reveal for common pogs
async function revealCommonPog(pogResult) {
    let centerReveal = document.getElementById('centerPogReveal');
    if (!centerReveal) {
        centerReveal = document.createElement('div');
        centerReveal.id = 'centerPogReveal';
        centerReveal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10003;
        `;
        document.getElementById('gachaOverlay').appendChild(centerReveal);
    }
    
    // Simple rectangular card for common pogs
    centerReveal.innerHTML = `
        <div style="
            width: 250px;
            height: 150px;
            border-radius: 15px;
            background: linear-gradient(135deg, #4a9eff, #7bb3ff);
            border: 3px solid white;
            box-shadow: 0 0 20px rgba(123, 179, 255, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: commonPogReveal 1s ease-out;
            color: white;
            text-align: center;
        ">
            <div style="
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
            ">
                ${pogResult.name}
            </div>
            
            <div style="
                font-size: 18px; 
                color: #e3f2fd;
                font-weight: bold;
            ">
                ${pogResult.rarity}
            </div>
        </div>
    `;
    
    centerReveal.style.display = 'block';
    
    // Wait for user to see it
    await new Promise(resolve => setTimeout(resolve, 2000));
}

// Mythic pog reveal (golden theme)
async function revealMythicPog(pogResult) {
    let centerReveal = document.getElementById('centerPogReveal');
    if (!centerReveal) {
        centerReveal = document.createElement('div');
        centerReveal.id = 'centerPogReveal';
        centerReveal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10003;
        `;
        document.getElementById('gachaOverlay').appendChild(centerReveal);
    }
    
    // Golden card for mythic pogs
    centerReveal.innerHTML = `
        <div style="
            width: 280px;
            height: 180px;
            border-radius: 15px;
            background: linear-gradient(135deg, #ffd700, #ffed4a);
            border: 4px solid white;
            box-shadow: 
                0 0 30px rgba(255, 215, 0, 0.8),
                0 0 60px rgba(255, 215, 0, 0.4);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            animation: mythicPogReveal 1.5s ease-out;
            color: #333;
            text-align: center;
        ">
            <div style="
                font-size: 28px; 
                font-weight: bold; 
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            ">
                ${pogResult.name}
            </div>
            
            <div style="
                font-size: 20px; 
                color: #b8860b;
                font-weight: bold;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            ">
                ⭐ ${pogResult.rarity.toUpperCase()} ⭐
            </div>
        </div>
    `;
    
    centerReveal.style.display = 'block';
    
    // Wait for user to see it
    await new Promise(resolve => setTimeout(resolve, 2500));
}

async function showMultiPullAnimation(results, pullCount, highestRarity) {
    document.getElementById('gachaOverlay').style.display = 'block';
    
    // Determine animation type based on highest rarity
    let animationType, starCount, duration;
    
    switch(highestRarity.rarity) {
        case 'Unique':
            animationType = 'unique';
            starCount = 15;
            duration = 4000;
            addUniqueScreenEffects();
            break;
        case 'Mythic':
            animationType = 'mythic';
            starCount = 12;
            duration = 3500;
            break;
        default:
            animationType = 'normal';
            starCount = 8;
            duration = 2500;
            break;
    }
    
    // Step 1: Shooting stars (one animation for all pulls)
    createStarShapedShootingStars(animationType, starCount);
    await new Promise(resolve => setTimeout(resolve, duration));
    
    // Step 2: Click to continue
    const hasSpecial = results.some(r => r.rarity === 'Unique' || r.rarity === 'Mythic');
    await showClickToContinue(hasSpecial);
    
    // Step 3: Show ALL pogs in a line
    await showAllPogResults(results, pullCount);
    
    // Step 4: Special effects for unique pogs
    const uniquePogs = results.filter(r => r.rarity === 'Unique');
    if (uniquePogs.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await showUniqueParticleExplosion();
    }
    
    // Step 5: Clean up
    setTimeout(() => {
        document.getElementById('gachaOverlay').style.display = 'none';
        document.getElementById('shootingStarsContainer').innerHTML = '';
        const centerReveal = document.getElementById('centerPogReveal');
        if (centerReveal) {
            centerReveal.style.display = 'none';
            centerReveal.innerHTML = '';
        }
    }, 2000);
}

async function showAllPogResults(results, pullCount) {
    // Sort results by rarity (highest to lowest)
    const rarityOrder = { 'Unique': 6, 'Mythic': 5, 'Rare': 4, 'Uncommon': 3, 'Common': 2, 'Trash': 1 };
    const sortedResults = [...results].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    
    let centerReveal = document.getElementById('centerPogReveal');
    if (!centerReveal) {
        centerReveal = document.createElement('div');
        centerReveal.id = 'centerPogReveal';
        centerReveal.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10003;
            max-width: 90vw;
            max-height: 80vh;
            overflow-y: auto;
        `;
        document.getElementById('gachaOverlay').appendChild(centerReveal);
    }
    
    // Create the results display
    centerReveal.innerHTML = `
        <div style="
            background: rgba(0, 0, 20, 0.9);
            border-radius: 15px;
            padding: 20px;
            border: 3px solid #444;
        ">
            <h2 style="
                color: #ffd700;
                text-align: center;
                margin-bottom: 20px;
                font-size: 24px;
            ">
                ${pullCount} Pull Results
            </h2>
            
            <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
                align-items: center;
            ">
                ${sortedResults.map((pog, index) => createPogResultCard(pog, index)).join('')}
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <button id="closeMultiResults" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                ">Continue</button>
            </div>
        </div>
    `;
    
    centerReveal.style.display = 'block';
    
    // Animate each pog appearing
    const pogCards = centerReveal.querySelectorAll('.pogResultCard');
    pogCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'pogCardReveal 0.6s ease-out forwards';
        }, index * 100);
    });
    
    // Wait for user to click continue
    return new Promise(resolve => {
        document.getElementById('closeMultiResults').addEventListener('click', resolve);
    });
}

function createPogResultCard(pog, index) {
    // Get rarity colors
    const rarityColors = {
        'Unique': { bg: 'linear-gradient(135deg, #ff00ff, #ff69b4, #9400d3, #ffd700)', border: '#ff00ff', shadow: 'rgba(255, 0, 255, 0.8)' },
        'Mythic': { bg: 'linear-gradient(135deg, #ffd700, #ffed4a)', border: '#ffd700', shadow: 'rgba(255, 215, 0, 0.8)' },
        'Rare': { bg: 'linear-gradient(135deg, #9b59b6, #c39bd3)', border: '#9b59b6', shadow: 'rgba(155, 89, 182, 0.6)' },
        'Uncommon': { bg: 'linear-gradient(135deg, #27ae60, #58d68d)', border: '#27ae60', shadow: 'rgba(39, 174, 96, 0.5)' },
        'Common': { bg: 'linear-gradient(135deg, #4a9eff, #7bb3ff)', border: '#7bb3ff', shadow: 'rgba(123, 179, 255, 0.5)' },
        'Trash': { bg: 'linear-gradient(135deg, #666, #999)', border: '#999', shadow: 'rgba(153, 153, 153, 0.3)' }
    };
    
    const colors = rarityColors[pog.rarity] || rarityColors['Common'];
    
    return `
        <div class="pogResultCard" style="
            width: 120px;
            height: 160px;
            background: ${colors.bg};
            border: 3px solid ${colors.border};
            border-radius: 12px;
            box-shadow: 0 0 20px ${colors.shadow};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            opacity: 0;
            transform: translateY(30px) scale(0.8);
            animation-delay: ${index * 100}ms;
            position: relative;
            overflow: hidden;
        ">
            ${pog.rarity === 'Unique' ? `
                <div style="
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: circularShine 2s linear infinite;
                "></div>
            ` : ''}
            
            <div style="
                font-size: ${pog.name.length > 12 ? '12px' : '14px'};
                font-weight: bold;
                margin-bottom: 8px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
                z-index: 1;
                max-width: 100px;
                word-wrap: break-word;
                line-height: 1.2;
            ">
                ${pog.name}
            </div>
            
            <div style="
                font-size: 12px;
                font-weight: bold;
                z-index: 1;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            ">
                ${pog.rarity}
            </div>
        </div>
    `;
}
