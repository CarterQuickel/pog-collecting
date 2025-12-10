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