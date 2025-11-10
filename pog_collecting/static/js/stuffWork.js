
// reference userdata from ejs
var userdata = JSON.parse(document.getElementById("userdata").textContent);
// ensure a global achievements object exists early so other scripts can read it
window.achievements = window.achievements || userdata.achievements || [];
// reference pogs from ejs
var maxPogs = JSON.parse(document.getElementById("maxPogs").textContent);
// reference pogs from ejs
var pogList = JSON.parse(document.getElementById("pogList").textContent);

rarityColor = [
    { name: "Trash", color: "red", income: 6 }, //trash
    { name: "Common", color: "yellow", income: 17 }, //common
    { name: "Uncommon", color: "lime", income: 35 }, //uncommon
    { name: "Rare", color: "aqua", income: 66 }, //rare
    { name: "Mythic", color: "fuchsia", income: 205 }, //mythic
]

// debug rarity list
console.log(crates);

// wish
let wish = userdata.wish || 0;

// search variables
let searching = false;
let itemSearched = "";

// clear search every 100ms if box is empty
setInterval(() => {
    if (itemSearched === "") {
        searching = false;
    }
}, 100);

// money upgrade
let moneyTick = 1000;

// items
let inventory = userdata.inventory || [];
window.inventory = inventory;

//crate vars
cratesOpened = userdata.cratesOpened || 0;

// money
let money = userdata.score || 300;
let userIncome = userdata.income || 0;
let totalSold = userdata.totalSold || 0;

let pogAmount = userdata.pogamount || 0;

// XP
let xp = userdata.xp || 0;
let maxXP = userdata.maxxp || 15;
let level = userdata.level || 1;

//etc.
const mergeAmount = 10;
let mergeCount = userdata.mergeCount || 0;
//global vari
window.mergeCount = mergeCount;
userdata.mergeCount = mergeCount;

//combo tracking
let comboCount = 0;
let highestCombo = userdata.highestCombo || 0;
window.highestCombo = highestCombo;
userdata.highestCombo = highestCombo;

// inventory size
let Isize = userdata.Isize || 45;

//mode
if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    lightMode = true;
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
    lightMode = false;
}

//bonus multiplier
let bonusMulti = 1;

//abbreviation num
let abbreviatedMoney = 0;



//combo tracking fgdjhkfgjhkfgfgdjk
let perNameBonus = {}; 
function computeComboStats() {
    const counts = {};
    for (const item of inventory) {
        counts[item.name] = (counts[item.name] || 0) + 1;
    }

    // total number of complete 3-item combos across all item types
    const newComboCount = Object.values(counts).reduce((sum, c) => sum + Math.floor(c / 3), 0);
    // highest single-item stack count (e.g. 7 of "Bronze Pog" => 7)
    const currentMaxStack = Object.values(counts).reduce((m, c) => Math.max(m, c), 0);

    if (newComboCount !== comboCount) {
        comboCount = newComboCount;
        window.comboCount = comboCount;
    }
    if (currentMaxStack > highestCombo) {
        highestCombo = currentMaxStack;
        window.highestCombo = highestCombo;
    }


    perNameBonus = {};
    for (const [name, count] of Object.entries(counts)) {
        // combo only works if 3+; multiplier increases per item (5% per item) but capped at 2x
        const rawMult = count >= 3 ? 1 + (count * 0.05) : 1;
        perNameBonus[name] = Math.min(2, rawMult);
    }
    window.perNameBonus = perNameBonus; //we love global variables

    return currentMaxStack;
}

highestCombo = computeComboStats();

computeComboStats(); //corrects stats on load

// cost multiplier
function getTotalIncome() {
    computeComboStats();
    const bonusMap = window.perNameBonus || {};
    
    
    return inventory.reduce((sum, item) => {
        const mult = bonusMap[item.name] || 1;
        return sum + Math.round(item.income * mult);
    }, 0);
}

userIncome = getTotalIncome();

// initial money display
setInterval(updateMoney, 100);
function updateMoney() {
    const abbreviatedMoney = abbreviateNumber(money);
    document.getElementById("money").innerText = `$${abbreviatedMoney}`;
}

// sell item
function sellItem(id, sellvalue) {
    const index = inventory.findIndex(item => item.id === id)
    money += sellvalue;
    totalSold++;
    inventory.splice(index, 1);
    // recalc income and refresh UI
    userIncome = getTotalIncome();
    refreshInventory();
    if (window.checkAllAchievements) window.checkAllAchievements();
}

// update loop
setInterval(update, 100);
function update() {
    //abbrevs
    const abbreviatedXP = abbreviateNumber(xp);
    const abbreviatedMaxXP = abbreviateNumber(maxXP);
    // update inventory size text
    document.getElementById("invTxt").innerHTML = `${inventory.length}/${Isize} Slots`

    // update XP Txt
    document.getElementById("XPTxt").innerText = `Level ${level} (${abbreviatedXP}/${abbreviatedMaxXP} XP)`;

    // update income Txt
    document.getElementById("income").innerText = `($${abbreviateNumber(getTotalIncome())}/s)`;

    //update pog / pog
    document.getElementById("pogCount").innerText = `Pogs Discovered: ${pogAmount} / ${maxPogs}`;

    //update pogs color
    document.getElementById("pogCount").style.color = pogAmount >= maxPogs ? "gold" : lightMode ? "black" : "white";

    //update wish text
    document.getElementById("useWish").innerText = `Use Wish (${wish})`;

    //update wish visibility
    document.getElementById("useWish").style.display = wish > 0 ? "inline-block" : "none";

    //crate 1 text
    document.getElementById("crate1").innerHTML = `Trash Crate ($${abbreviateNumber(crates[0].price)})`;

    //crate 2 text
    document.getElementById("crate2").innerHTML = `Common Crate ($${abbreviateNumber(crates[1].price)})`;

    //crate 3 text
    document.getElementById("crate3").innerHTML = `Uncommon Crate ($${abbreviateNumber(crates[2].price)})`;

    //crate 4 text
    document.getElementById("crate4").innerHTML = `Rare Crate ($${abbreviateNumber(crates[3].price)})`;

    //crate 5 text
    document.getElementById("crate5").innerHTML = `Mythic Crate ($${abbreviateNumber(crates[4].price)})`;

    //sell all button
    document.getElementById("sellAll").innerText = `Sell All ${searching ? "(Searched)" : ""}`;

    //sell all width
    document.getElementById("sellAll").style.width = searching ? "150px" : "100px";

    if (inventory.length >= 999) {
        while (inventory.length > 999) {
            const item = inventory[0];
            sellItem(item.id, item.income * 105);
        }
    }

    // change inventory text color if full
    if (inventory.length >= Isize) {
        document.getElementById("invTxt").style.color = "red";
    } else {
        document.getElementById("invTxt").style.color = lightMode ? "black" : "white";
    }
}

function merge(bronze, silver, gold, diamond, astral) {
    let sold = 0;
    mergeCount += 1;
    //syncing global variable with session variable
    window.mergeCount = mergeCount;
    userdata.mergeCount = mergeCount;

    // add new  pog to inventory
    if (bronze) {
        inventory.push({ name: "Silver Pog", color: "orange", income: 620, value: "UNIQUE" });
    } else if (silver) {
        inventory.push({ name: "Gold Pog", color: "orange", income: 7400, value: "UNIQUE" });
    } else if (gold) {
        inventory.push({ name: "Diamond Pog", color: "orange", income: 83000, value: "UNIQUE" });
    } else if (diamond) {
        inventory.push({ name: "Astral Pog", color: "purple", income: 1000000, value: "UNIQUE" });
    } else if (astral) {
        inventory.push({ name: "God Pog", color: "purple", income: 694206741, value: "???" });
    }
    // only sell the amount needed
    for (let i = 0; i < inventory.length && sold < mergeAmount; i++) {
        if (inventory[i].name === "Bronze Pog" && bronze) {
            sellItem(inventory[i].id, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Silver Pog" && silver) {
            sellItem(inventory[i].id, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Gold Pog" && gold) {
            sellItem(inventory[i].id, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Diamond Pog" && diamond) {
            sellItem(inventory[i].id, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Astral Pog" && astral) {
            sellItem(inventory[i].id, 0);
            sold++;
            i--;
        }
    }
    if (window.checkAllAchievements) window.checkAllAchievements();
}

function trade() {
    let hasAll = true;
    // does user have all 7 dragon balls?
    for (let i = 1; i <= 7; i++) {
        if (!inventory.find(item => item.name === `Dragon Ball ${i}`)) {
            hasAll = false;
            break;
        }
    }
    if (!hasAll) {
        alert("You do not have all 7 Dragon Balls!");
        return;
    }
    // remove dragon balls from inventory
    if (hasAll) {
        for (let i = 1; i <= 7; i++) {
            const index = inventory.findIndex(item => item.name === `Dragon Ball ${i}`);
            if (index !== -1) {
                inventory.splice(index, 1);
            }
        }
        // add wish
        wish++;
        alert("You have traded in all 7 Dragon Balls for a wish!");
        refreshInventory();
    }
}

//update inventory
function refreshInventory() {
    // get inventory div
    const inventoryDiv = document.getElementById("inventory");

    // count how many of each rarity in inventory
    const rarityCounts = {};
    inventory.forEach(item => {
        // rarityCounts is an object where the KEY is the rarity name [] and the VALUE is the count of that rarity in the inventory; use the || operator to initialize the count to 0 if it doesn't exist yet; +1 to increment the count
        rarityCounts[item.name] = (rarityCounts[item.name] || 0) + 1;
    });

    //the computer is recomputing
    computeComboStats();

    // failsafe if they delete all items
    if (inventory.length === 0 && money < 200) {
        money = 200;
    }

    // create bonus outline for items with more than one of the same rarity
    // Object.keys get the KEY (rarity name) of the rarityCounts object ; filter to only get rarities with 3 or more items
    const highlightColors = Object.keys(rarityCounts).filter(rarity => rarityCounts[rarity] >= 3);

    //see if there is mergeAmount bronze pogs for merge button
    const bronzeCount = inventory.filter(item => item.name === "Bronze Pog").length;
    // see if there is mergeAmount silver pogs for merge button
    const silverCount = inventory.filter(item => item.name === "Silver Pog").length;
    // see if there is mergeAmount gold pogs for merge button
    const goldCount = inventory.filter(item => item.name === "Gold Pog").length;
    // see if there is mergeAmount diamond pogs for merge button
    const diamondCount = inventory.filter(item => item.name === "Diamond Pog").length;
    // see if there is mergeAmount astral pogs for merge button
    const astralCount = inventory.filter(item => item.name === "Astral Pog").length;

    // set inventory html
    // .filter is used to get the search and .includes to check if the item name includes the searched text
    inventoryDiv.innerHTML = inventory.filter(item => item.name.toLowerCase().includes(itemSearched)).map((item, index) => {
        return hasBonus = highlightColors.includes(item.name),
            namelength = item.name.length,
            nameFontSize = namelength >= 19 ? '9px' : namelength >= 12 ? '12px' : '16px',
            sellvalue = item.income * 105,
            // refernce this inside the map function, for item is only defined in here
            isBronze = item.name === "Bronze Pog",
            isSilver = item.name === "Silver Pog",
            isGold = item.name === "Gold Pog",
            isDiamond = item.name === "Diamond Pog",
            isAstral = item.name === "Astral Pog",
            // how many bronze pogs are there? (mergAmount)
            //bronze
            bronze = isBronze && bronzeCount >= mergeAmount,
            //silver
            silver = isSilver && silverCount >= mergeAmount,
            //gold 
            gold = isGold && goldCount >= mergeAmount,
            //diamond
            diamond = isDiamond && diamondCount >= mergeAmount,
            //astral from vamy
            astral = isAstral && astralCount >= mergeAmount,
            // show merge button
            canMerge = bronze || silver || gold || diamond || astral,
            // show trade button
            canTrade = item.name === "Dragon Ball 7",
            // return html
            `<div class="item ${hasBonus ? 'highlight' : ''}">
        <strong class ="name" style="color: ${isBronze ? '#CD7F32' : isSilver ? '#C0C0C0' : isGold ? '#FFDF00' : isDiamond ? '#4EE2EC' : isAstral ? '#8A2BE2' : 'white'}; font-size: ${nameFontSize};">${item.name}</strong>
        <br>
        <hr>
        <ul>
            <li class='list' style="color: ${item.color}">${item.value}</li>
            <li class='list' style="color: green">$${Math.round(item.income * ((window.perNameBonus && window.perNameBonus[item.name]) || 1))}/s</li>
        </ul>
        <button id="sellbtn" onclick="sellItem(${item.id}, sellvalue)">Sell for $${sellvalue}</button>
        ${canMerge ? `<button class="mergebtn" onclick="merge(${isBronze}, ${isSilver}, ${isGold}, ${isDiamond}, ${isAstral})">Merge (${mergeAmount})</button>` : ""}
        ${canTrade ? `<button class="mergebtn" onclick="trade()">Trade (7)</button>` : ""}
        </div>
    `}).join("");
}

//sell all button
document.getElementById("sellAll").addEventListener("click", () => {
    confirmation = confirm(`Are you sure you want to sell all ${searching ? "searched " : ""}items in your inventory?`);
    if (confirmation == false) {
        return;
    }
    if (!searching) {
        const initialInv = inventory.length
        for (let i = 0; i < initialInv; i++) {
            if (i = inventory.length) {
                i = 0
            }
            const item = inventory[i];
            if (inventory.length == 0) {
                break
            }
            sellItem(i, item.income * 105) //sellvalue
        }
    } else {
        const filteredItems = inventory.filter(item => item.name.toLowerCase().includes(itemSearched));
        const initialInv = filteredItems.length;
        for (let i = 0; i < initialInv; i++) {
            const item = filteredItems[i];
            const indexInInventory = inventory.findIndex(invItem => invItem.id === item.id);
            if (indexInInventory !== -1) {
                sellItem(item.id, item.income * 105); //sellvalue
            }
        }
    }
});

//first time call
refreshInventory();

//update progress bar
setInterval(updatePB, 100)
function updatePB() {
    const XPPB = document.getElementById("XPPB")
    XPPB.value = xp;
    XPPB.max = maxXP;
}

// passive money income
setInterval(() => {
    money += getTotalIncome(); // increase money based on the rarity income for each item in inventory every second
}, 1000);

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
                inventory.push({ name: rarity.name, color: color, income: income, value: rarity.rarity, id: id });
            }

            // XP gain
            xp += Math.floor(income * (3 * level / 15)); // gain XP based on income and level
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

// level up
function levelup() {
    while (xp >= maxXP) {
        // max level
        if (level >= 101) {
            xp = maxXP;
            return;
        }
        xp -= maxXP;
        level++;
        maxXP = Math.floor(maxXP * 1.67);
        Isize += level % 5 === 0 ? 10 : 5; // increase inventory size by 10 every 5 levels, otherwise by 5
        if (window.checkAllAchievements) window.checkAllAchievements();
    }
}

// save game
document.getElementById("save").addEventListener("click", () => {
    // fetch to /datasave
    fetch('/datasave', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lightMode: lightMode,
            money: money,
            inventory: inventory,
            Isize: Isize,
            xp: xp,
            maxXP: maxXP,
            level: level,
            income: userIncome,
            totalSold: totalSold,
            cratesOpened: cratesOpened,
            pogAmount: pogAmount,
            achievements: window.achievements,
            mergeCount: window.mergeCount,
            highestCombo: window.highestCombo
            wish: wish
        })
    })
        .then(response => response.json())
        .then(() => {
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
    alert("Game Saved!");
});

document.getElementById("patchNotesButton").addEventListener("click", () => {
    window.achievements[4][0].status = true;
        fetch('/datasave', {
    fetch('/datasave', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lightMode: lightMode,
            money: money,
            inventory: inventory,
            Isize: Isize,
            xp: xp,
            maxXP: maxXP,
            level: level,
            income: userIncome,
            totalSold: totalSold,
            cratesOpened: cratesOpened,
            pogAmount: pogAmount,
            achievements: window.achievements,
            mergeCount: window.mergeCount,
            highestCombo: window.highestCombo
            wish: wish
        })
    })
        .then(response => response.json())
        .then(() => {
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
    window.location.href = "/patch";
});

document.getElementById("achievementsButton").addEventListener("click", () => {
    fetch('/datasave', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lightMode: lightMode,
            money: money,
            inventory: inventory,
            Isize: Isize,
            xp: xp,
            maxXP: maxXP,
            level: level,
            income: userIncome,
            totalSold: totalSold,
            cratesOpened: cratesOpened,
            pogAmount: pogAmount,
            achievements: window.achievements,
            mergeCount: window.mergeCount,
            highestCombo: window.highestCombo
            wish: wish
        })
    })
        .then(response => response.json())
        .then(() => {
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
    window.location.href = "/achievements";
});

document.getElementById("leaderboardButton").addEventListener("click", () => {
    // fetch to /datasave
    fetch('/datasave', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lightMode: lightMode,
            money: money,
            inventory: inventory,
            Isize: Isize,
            xp: xp,
            maxXP: maxXP,
            level: level,
            income: userIncome,
            totalSold: totalSold,
            cratesOpened: cratesOpened,
            pogAmount: pogAmount,
            achievements: window.achievements,
            mergeCount: window.mergeCount,
            highestCombo: window.highestCombo
            wish: wish
        })
    })
        .then(response => response.json())
        .then(() => {
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
    window.location.href = "/leaderboard";
});

// mode toggle
document.getElementById("darkmode").addEventListener("click", () => {
    console.log("toggled");
    lightMode = !lightMode;
    if (lightMode) {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
});

//search functionality
document.getElementById("searchbtn").addEventListener("click", () => {
    box = document.getElementById("searchbox")
    inv = document.getElementById("inventory")
    searching = true;
    if (searching) {
        itemSearched = box.value.toLowerCase();
        refreshInventory();
    }
});

//categorize functionality
document.getElementById("selectSort").addEventListener("change", () => {
    const sortBy = document.getElementById("selectSort").value;
    if (sortBy === "rarityAZ") {
        inventory.sort((a, b) => a.value.localeCompare(b.value));
    } else if (sortBy === "rarityZA") {
        inventory.sort((a, b) => b.value.localeCompare(a.value));
    } else if (sortBy === "incomeHf") {
        inventory.sort((a, b) => b.income - a.income);
    } else if (sortBy === "incomeLf") {
        inventory.sort((a, b) => a.income - b.income);
    } else if (sortBy === "nameAZ") {
        inventory.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZA") {
        inventory.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "svHf") {
        inventory.sort((a, b) => (b.income * 105) - (a.income * 105));
    } else if (sortBy === "svLf") {
        inventory.sort((a, b) => (a.income * 105) - (b.income * 105));
    }
    refreshInventory();
});

//number abbreviation function
function abbreviateNumber(value) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' });
    return formatter.format(value);
}

const buttons = document.getElementsByTagName("button");



window.achievements = userdata.achievements || [
    [
        {
            name: "Full Combo!",
            description: "Get a 3-item combo.",
            icon: "static/icons/Full_Combo.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Coneisseur",
            description: "Have a 6-item combo.",
            icon: "static/icons/Coneisseur.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Candid Coiner",
            description: "Have a 60-item combo.",
            icon: "static/icons/Candid_Coiner.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Programming Prodigy",
            description: "Have 1100100 CP pogs.",
            icon: "static/icons/Programming_Prodigy.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "6-7",
            description: "Have 6, then 7, items in your inventory.",
            icon: "static/icons/67.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Pristine",
            description: "Have a copper, silver, and gold pog all at once.",
            icon: "static/icons/Pristine.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Exquisite",
            description: "Have a copper, silver, gold, and diamond pog all at once.",
            icon: "static/icons/Exquisite.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mythical",
            description: "Have a copper, silver, gold, diamond, and astral pog all at once.",
            icon: "static/icons/Mythical.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mr. Smith",
            description: "Have one of each tier pog at once.",
            icon: "static/icons/Mr_Smith.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Hoarder",
            description: "Fill your inventory to max when your inventory is greater than 60.",
            icon: "static/icons/Hoarder.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Insane Hoarder",
            description: "Own 100 pogs.",
            icon: "static/icons/Insane_Hoarder.png",
            status: false,
            hidden: true,
            notified: false
        },
    ],
    //start of level achievements
    [
        {
            name: "Rookie",
            description: "Reach level 5.",
            icon: "static/icons/Rookie.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Getting Better",
            description: "Reach level 10.",
            icon: "static/icons/Getting_Better.png",
            reward: "Combo Multiplier II",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Experienced",
            description: "Reach level 15.",
            icon: "static/icons/Experienced.png",
            reward: "Combo Multiplier III",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Veteran",
            description: "Reach level 25.",
            icon: "static/icons/Veteran.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Professional",
            description: "Reach level 40.",
            icon: "static/icons/Professional.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Halfway There",
            description: "Reach level 50.",
            icon: "static/icons/Halfway_There.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Itsumi!",
            description: "Reach level 64.",
            icon: "static/icons/Itsumi!.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Prestigious",
            description: "Reach level 75.",
            icon: "static/icons/Prestigious.png",
            status: false,
            hidden: false,
            notified: false,
        },
        {
            name: "No-Life",
            description: "Reach level 100.",
            icon: "static/icons/No-Life.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "What color is grass?",
            description: "Reach the max level.",
            icon: "static/icons/What_color_is_grass.png",
            status: false,
            hidden: true,
            notified: false
        }
    ],
    //start of progression achievements
    [
        {
            name: "First Steps",
            description: "Open your first crate.",
            icon: "static/icons/First_Steps.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pogger",
            description: "Open 100 crates.",
            icon: "static/icons/Pogger.png",
            reward: "None",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Maniac",
            description: "Merge your first pog.",
            icon: "static/icons/Merge_Maniac.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Monster",
            description: "Merge 30 pogs.",
            icon: "static/icons/Merge_Monster.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Master",
            description: "Merge 80 pogs.",
            icon: "static/icons/Merge_Master.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "God",
            description: "Merge into a God pog.",
            icon: "static/icons/God.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Granter",
            description: "Get a 1-star dragon pog.",
            icon: "static/icons/DB_1.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Achiever",
            description: "Get a 2-star dragon pog.",
            icon: "static/icons/DB_2.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Successor",
            description: "Get a 3-star dragon pog.",
            icon: "static/icons/DB_3.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Victor",
            description: "Get a 4-star dragon pog.",
            icon: "static/icons/DB_4.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Conqueror",
            description: "Get a 5-star dragon pog.",
            icon: "static/icons/DB_5.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Dragon Lord",
            description: "Get a 6-star dragon pog.",
            icon: "static/icons/DB_6.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Above All",
            description: "Get a 7-star dragon pog.",
            icon: "static/icons/DB_7.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Zeno",
            description: "Have one of each-star dragon pog.",
            icon: "static/icons/DB_All.png",
            status: false,
            hidden: true,
            notified: false
        },
        
        {
            name: "Completionist",
            description: "Unlock all main achievements.",
            icon: "static/icons/Completionist.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Secret Achiever",
            description: "Unlock all secret achievements.",
            icon: "static/icons/Secret_Achiever.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Platinum Trophy",
            description: "Unlock all achievements.",
            icon: "static/icons/Platinum_Trophy.png",
            status: false,
            hidden: false,
            notified: false
        }
    ],
    //start of economy achievements
    [
        {
            name: "69",
            description: "Have exactly 69 pogs at once.",
            icon: "static/icons/69.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "420",
            description: "Sell enough pogs to gain back a TOTAL of 420 digipogs.",
            icon: "static/icons/420.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Wealthy",
            description: "Make your first 1000 dollars.",
            icon: "static/icons/Wealthy.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Rich",
            description: "Have 1 million dollars at once.",
            icon: "static/icons/Rich.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Elon",
            description: "Have 100 million dollars at once.",
            icon: "static/icons/Elon.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Entrepreneur",
            description: "Make 2000 cash a second.",
            icon: "static/icons/Entrepreneur.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Tycoon",
            description: "Make 10000 cash a second.",
            icon: "static/icons/Tycoon.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pawn Broker",
            description: "Make 50000 cash a second.",
            icon: "static/icons/Pawn_Broker.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Bank Breaker",
            description: "Make 100000 cash a second.",
            icon: "static/icons/Bank_Breaker.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Industrialist",
            description: "Own a Robux pog.",
            icon: "static/icons/Industrialist.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Capitalist",
            description: "Own a V-Bucks pog.",
            icon: "static/icons/Capitalist.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Monopoly",
            description: "Be on the Top 5 leaderboard.",
            icon: "static/icons/Monopoly.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Monarch",
            description: "Be the Top 1 on the leaderboard.",
            icon: "static/icons/Monarch.png",
            status: false,
            hidden: false,
            notified: false
        }
    ],
    //start of unique achievements
    [
        {
            name: "Nerdy Inspector",
            description: "Go to the patch notes page.",
            icon: "static/icons/Nerdy_Inspector.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Chicken Jockey!",
            description: "Get a chicken jockey.",
            icon: "static/icons/Chicken_Jockey!.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "An Ender Pearl",
            description: "Get an endermen combo.",
            icon: "static/icons/An_Ender_Pearl.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Soda Pop",
            description: "Get a soda pog combo.",
            icon: "static/icons/Soda_Pop.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "SODA!",
            description: "Get one of each color soda pog.",
            icon: "static/icons/SODA!.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Sus",
            description: "Have 10 dingus pogs at once.",
            icon: "static/icons/Sus.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Elden Lord",
            description: "Get an Elden Ring pog combo.",
            icon: "static/icons/Elden_Lord.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "1% of My Power",
            description: "Get a Super Saiyan Shaggy pog combo.",
            icon: "🟠",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Ultimate Despair",
            description: "Get 13 DR (danganronpa) pogs",
            icon: "static/icons/Ultimate_Despair.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Shaw!",
            description: "Get a Hornet pog.",
            icon: "static/icons/Shaw!.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Uhhh",
            description: "Get an I Heart CP pog combo.",
            icon: "static/icons/Uhhh.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Reflection",
            description: "Get a Fallout Vault pog combo.",
            icon: "🛖",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pineapple Under the Sea",
            description: "Get a SpongeBob pog combo.",
            icon: "🍍",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mog Pog",
            description: "Get a Handsome Squidward pog combo.",
            icon: "🦑",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Goon",
            description: "Get an anime girl pog combo.",
            icon: "🤍",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Margot Robbie",
            description: "Get a Barbie pog combo.",
            icon: "🎀",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "I am Vengeance",
            description: "Get 4 Batman Robin pog combos.",
            icon: "static/icons/I_Am_Vengeance.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Nuke Kaboom",
            description: "Collect a Thomas Nuke pog.",
            icon: "static/icons/Nuke_Kaboom.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Hiding in your WiFi",
            description: "Get a Hatsune Miku pog combo.",
            icon: "🎤",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Strange Man's Game",
            description: "Get a Elf Biker pog combo.",
            icon: "🏍️",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "buttr",
            description: "Get a Butter Pog combo.",
            icon: "static/icons/buttr.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "OAUTH",
            description: "Get a Formbar pog combo.",
            icon: "static/icons/OAUTH.png",
            status: false,
            hidden: false,
            notified: false
        }
    ]
];
