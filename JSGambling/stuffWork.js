// debug rarity list
console.log(rarities);
console.log(crates);

// cost of upgrade
inventoryCost = 300;

// money upgrade
let moneyTick = 1000;

// items
let inventory = [];

// money
let money = 200;

// inventory size
let Isize = 3;

//mode
let lightMode = true;

//sort style
let sortStyle = "none";

//bonus multiplier
let bonusMulti = 1.5;

// cost multiplier
function getTotalIncome() {
    const rarityCounts = {};
    inventory.forEach(item => {
        rarityCounts[item.name] = (rarityCounts[item.name] || 0) + 1;
    });

    const bonusRarities = Object.keys(rarityCounts).filter(rarity => rarityCounts[rarity] >= 3);

    return inventory.reduce((sum, item) => {
        const hasBonus = bonusRarities.includes(item.name);
        console.log(sum);
        return sum + (hasBonus ? Math.round(item.income * bonusMulti) : item.income);
    }, 0);
}

// initial money display
setInterval(updateMoney, 100);
function updateMoney() {
    document.getElementById("money").innerText = `$${money}`;
}

// sell item
function sellItem(index) {
    console.log("Selling item at index:", index);
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

    // update upgrade button text
    document.getElementById("upgradeinventory").innerText = `Upgrade Inventory + 3 ($${inventoryCost})`;

    // update mode text
    document.getElementById("modeTxt").innerHTML = lightMode ? "Light Mode" : "Dark Mode"

    // update inventory size text
    document.getElementById("invTxt").innerHTML = `${inventory.length}/${Isize}`

    //update sort text
    if (sortStyle === "top") {
        document.getElementById("sortTxt").innerHTML = `Sort \u2191`
    } else if (sortStyle === "bottom") {
        document.getElementById("sortTxt").innerHTML = `Sort \u2193`
    } else {
        document.getElementById("sortTxt").innerHTML = `Sort`
    }

    // update income Txt
    document.getElementById("income").innerText = `($${getTotalIncome()}/s)`;

    // change inventory text color if full
    if (inventory.length >= Isize) {
        document.getElementById("invTxt").style.color = "red";
    } else {
        if (lightMode) {
            document.getElementById("invTxt").style.color = "black";
        } else {
            document.getElementById("invTxt").style.color = "white";
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

    // set inventory html
    inventoryDiv.innerHTML = inventory.map((item, index) => {
        return hasBonus = highlightColors.includes(item.name),
        `<div class="item ${hasBonus ? 'highlight' : ''}">
        <strong class ="name" style="color: ${item.color}">${item.name}</strong><br>
        <hr>
        <ul>
            <li class='list'>$${hasBonus ? Math.round(item.income * bonusMulti) : item.income}/s</li>
            <li class='list'>$${item.value}</li>
        </ul>
        <button id="sellbtn" onclick="sellItem(${index})">Sell</button>
        </div>
    `}).join("");
}

//update progress bar
setInterval(updatePB, 100)
function updatePB() {
    const invPB = document.getElementById("invPB")
    invPB.value = inventory.length;
    invPB.max = Isize;
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

    let rand = Math.random();
    let cumulativeChance = 0;

    for (let item of crates[Object.keys(crates)[index]].rarities) {
        for (let rarity of rarities) {
            if (item.name === rarity.name) {
                console.log(item.name);
                cumulativeChance += item.chance;
                if (rand < cumulativeChance) {
                    // Add result to inventory
                    inventory.push({ name: rarity.name, color: rarity.color, income: rarity.income, value: rarity.value });
                    // Deduct cost
                    money -= cost;
                    console.log(rarity.chance);
                    refreshInventory();
                    return;
                }
            }
        }
    }
}

// button click event
document.getElementById("crate1").addEventListener("click", () => openCrate(crates[Object.keys(crates)[0]].price, 0));
document.getElementById("crate2").addEventListener("click", () => openCrate(crates[Object.keys(crates)[1]].price, 1));
document.getElementById("crate3").addEventListener("click", () => openCrate(crates[Object.keys(crates)[2]].price, 2));
document.getElementById("crate4").addEventListener("click", () => openCrate(crates[Object.keys(crates)[3]].price, 3));
document.getElementById("crate5").addEventListener("click", () => openCrate(crates[Object.keys(crates)[5]].price, 5));
document.getElementById("crate6").addEventListener("click", () => openCrate(crates[Object.keys(crates)[4]].price, 4));

//upgrade event
document.getElementById("upgradeinventory").addEventListener("click", (
    () => {
        if (money >= inventoryCost) {
            costMultiplier = 1.5;
            money -= inventoryCost;
            Isize += 3;
            inventoryCost = Math.floor(inventoryCost * costMultiplier);
            if (costMultiplier > 0.2) {
                costMultiplier -= 0.1;
            }
        }
    }
));

// save game
document.getElementById("save").addEventListener("click", () => {
    const saveState = {
        money: money,
        inventory: inventory,
        Isize: Isize,
        inventoryCost: inventoryCost,
    };
    localStorage.setItem("gameState", JSON.stringify(saveState));
    alert("Game Saved!");
});

// load game
document.getElementById("load").addEventListener("click", () => {
    const savedState = JSON.parse(localStorage.getItem("gameState"));
    if (savedState) {
        money = savedState.money;
        inventory = savedState.inventory;
        Isize = savedState.Isize;
        inventoryCost = savedState.inventoryCost;
        refreshInventory();
    } else {
        alert("No saved game found.");
    }
});

// reset game
document.getElementById("reset").addEventListener("click", () => {
    if (confirm("Are you sure you want to reset the game?")) {
        money = 200;
        inventory = [];
        Isize = 3;
        inventoryCost = 300;
        costMultiplier = 1.5;
        localStorage.removeItem("gameState");
        refreshInventory();
    }
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

// sort inventory from least to most valuable
document.getElementById("bottomSort").addEventListener("click", () => {
    inventory.sort((a, b) => {
        const rarityA = rarities.find(r => r.name === a.name);
        const rarityB = rarities.find(r => r.name === b.name);
        sortStyle = "bottom";
        return rarityA.value - rarityB.value; // sort by value descending
    });
    refreshInventory();
});

// sort inventory from most to least valuable
document.getElementById("topSort").addEventListener("click", () => {
    inventory.sort((a, b) => {
        const rarityA = rarities.find(r => r.name === a.name);
        const rarityB = rarities.find(r => r.name === b.name);
        sortStyle = "top";
        return rarityB.value - rarityA.value; // sort by value descending
    });
    refreshInventory();
});
