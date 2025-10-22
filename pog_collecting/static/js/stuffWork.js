
// reference userdata from ejs
var userdata = JSON.parse(document.getElementById("userdata").textContent);
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
    { name: "Unknown", color: "grey", income: 16 }, //unknown
]

// debug rarity list
console.log(crates);

// search variables
let searching = false;
let itemSearched = "";

// money upgrade
let moneyTick = 1000;

// items
let inventory = userdata.inventory || [];

// money
let money = userdata.score || 200000000;

let pogAmount = userdata.pogamount || 0;

// XP
let xp = userdata.xp || 0;
let maxXP = userdata.maxxp || 15;
let level =  userdata.level || 1;

//merge amount 
const mergeAmount = 10;

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
let bonusMulti = 1.5;

//abbreviation num
let abbreviatedMoney = 0;

// cost multiplier
function getTotalIncome() {
    const rarityCounts = {};
    inventory.forEach(item => {
        rarityCounts[item.name] = (rarityCounts[item.name] || 0) + 1;
    });

    const bonusRarities = Object.keys(rarityCounts).filter(rarity => rarityCounts[rarity] >= 3);

    return inventory.reduce((sum, item) => {
        const hasBonus = bonusRarities.includes(item.name);
        return sum + (hasBonus ? Math.round(item.income * bonusMulti) : item.income);
    }, 0);
}

income = getTotalIncome();

// initial money display
setInterval(updateMoney, 100);
function updateMoney() {
    const abbreviatedMoney = abbreviateNumber(money);
    document.getElementById("money").innerText = `$${abbreviatedMoney}`;
}

// sell item
function sellItem(index, sellvalue) {
    if (index >= 0 && index < inventory.length) {
        const item = inventory[index];
        const rarity = pogList.find(r => r.rarity === item.value);
        if (rarity) {
            money += sellvalue; // add money based on rarity value
            totalSold += sellvalue; // track total money earned from selling
        }
        // remove item from inventory (splice removes 1 item at the specified index)
        inventory.splice(index, 1); 
        refreshInventory();
    }
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

    // change inventory text color if full
    if (inventory.length >= Isize) {
        document.getElementById("invTxt").style.color = "red";
    } else {
        document.getElementById("invTxt").style.color = lightMode ? "black" : "white";
    }
}

function merge(bronze, silver, gold) {
    let sold = 0;
    // add new  pog to inventory
    if (bronze) {
        inventory.push({ name: "Silver Pog", color: "orange", income: 620, value: "UNIQUE" });
    } else if (silver) {
        inventory.push({ name: "Gold Pog", color: "orange", income: 7400, value: "UNIQUE" });
    } else if (gold) {
        inventory.push({ name: "Diamond Pog", color: "orange", income: 83000, value: "UNIQUE" });
    }
    // only sell the amount needed
    for (let i = 0; i < inventory.length && sold < mergeAmount; i++) {
        if (inventory[i].name === "Bronze Pog" && bronze) {
            sellItem(i, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Silver Pog" && silver) {
            sellItem(i, 0);
            sold++;
            i--;
        } else if (inventory[i].name === "Gold Pog" && gold) {
            sellItem(i, 0);
            sold++;
            i--;
        }
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
        // how many bronze pogs are there? (mergAmount)
        //bronze
        bronze = isBronze && bronzeCount >= mergeAmount,
        //silver
        silver = isSilver && silverCount >= mergeAmount,
        //gold 
        gold = isGold && goldCount >= mergeAmount,
        //diamond
        diamond = isDiamond && diamondCount >= mergeAmount,
        // show merge button
        canMerge = bronze || silver || gold || diamond,
        // return html
        `<div class="item ${hasBonus ? 'highlight' : ''}">
        <strong class ="name" style="color: ${isBronze ? '#CD7F32' : isSilver ? '#C0C0C0' : isGold ? '#FFDF00' : isDiamond ? '#4EE2EC' : 'white'}; font-size: ${nameFontSize};">${item.name}</strong>
        <br>
        <hr>
        <ul>
            <li class='list' style="color: ${item.color}">${item.value}</li>
            <li class='list' style="color: green">$${hasBonus ? Math.round(item.income * bonusMulti) : item.income}/s</li>
        </ul>
        <button id="sellbtn" onclick="sellItem(${index}, sellvalue)">Sell for $${sellvalue}</button>
        ${canMerge ? `<button class="mergebtn" onclick="merge(${isBronze}, ${isSilver}, ${isGold})">Merge (${mergeAmount})</button>` : ""}
        </div>
    `}).join("");
}

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

                // rarity color
                color = match ? match.color : "white";

                // rarity income
                income = match ? match.income : 5;

                // add to pog amount if new pog
                let added = { name: rarity.name}
                const exists = inventory.find(i => i.name === added.name);
                if (!exists) {
                    pogAmount++;
                }

                // Add result to inventory
                inventory.push({ name: rarity.name, color: color, income: income, value: rarity.rarity });

                // XP gain
                xp += Math.floor(income * (3 * level/15)); // gain XP based on income and level
                levelup();

                // Deduct cost
                money -= cost;
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
            pogAmount: pogAmount
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data saved successfully:", data);
        })
        .catch(err => {
            console.error("Error saving data:", err);
        });
    alert("Game Saved!");
});

document.getElementById("patchNotesButton").addEventListener("click", () => {
    window.location.href = "/patch";
});

document.getElementById("achievementsButton").addEventListener("click", () => {
    window.location.href = "/achievements";
    console.log(userdata.totalSold);
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

//number abbreviation function
function abbreviateNumber(value) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' });
    return formatter.format(value);
}

const buttons = document.getElementsByTagName("button");
