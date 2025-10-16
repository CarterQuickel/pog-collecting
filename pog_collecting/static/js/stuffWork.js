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
console.log(rarities);
console.log(crates);

// money upgrade
let moneyTick = 1000;

// items
let inventory = userdata.inventory || [];

// money
let money = userdata.score || 20000;


// XP
let xp = userdata.xp || 0;
let maxXP = userdata.maxxp || 15;
let level = userdata.level || 101;

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

// initial money display
setInterval(updateMoney, 100);
function updateMoney() {
    const abbreviatedMoney = abbreviateNumber(money);
    document.getElementById("money").innerText = `$${abbreviatedMoney}`;
}

// sell item
function sellItem(index) {
    if (index >= 0 && index < inventory.length) {
        const item = inventory[index];
        const rarity = rarities.find(r => r.name === item.name);
        if (rarity) {
            money += rarity.value; // add money based on rarity value
        }
        inventory.splice(index, 1); // remove item from inventory
        refreshInventory(); // update inventory display
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

    // change inventory text color if full
    if (inventory.length >= Isize) {
        document.getElementById("invTxt").style.color = "red";
    } else {
        document.getElementById("invTxt").style.color = lightMode ? "black" : "white";
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

    // set inventory html
    inventoryDiv.innerHTML = inventory.map((item, index) => {
        return hasBonus = highlightColors.includes(item.name),
            `<div class="item ${hasBonus ? 'highlight' : ''}">
        <strong class ="name" style="color: white">${item.name}</strong><br>
        <hr>
        <ul>
            <li class='list' style="color: ${item.color}">${item.value}</li>
            <li class='list' style="color: green">$${hasBonus ? Math.round(item.income * bonusMulti) : item.income}/s</li>
        </ul>
        <button id="sellbtn" onclick="sellItem(${index})">Sell</button>
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

                // Add result to inventory
                inventory.push({ name: rarity.name, color: color, income: income, value: rarity.rarity });

                // XP gain
                xp += Math.floor(55);
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
            level: level
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

//number abbreviation function
function abbreviateNumber(value) {
    const formatter = Intl.NumberFormat('en', { notation: 'compact', compactDisplay: 'short' });
    return formatter.format(value);
}

const buttons = document.getElementsByTagName("button");
