//update inventory
function refreshInventory() {
    console.log("refreshInventory called, current inventory:", inventory.length);
    console.log("Last 3 pogs:", inventory.slice(-3).map(p => p.name));

    // Make sure itemSearched is defined
    if (typeof itemSearched === 'undefined') {
        window.itemSearched = '';
    }
    console.log("itemSearched:", itemSearched);

    const inventoryDiv = document.getElementById("inventory");
    console.log("inventoryDiv found:", inventoryDiv ? "YES" : "NO");

    // count how many of each rarity in inventory
    const rarityCounts = {};
    inventory.forEach(item => {
        rarityCounts[item.name] = (rarityCounts[item.name] || 0) + 1;
    });

    //the computer is recomputing
    computeComboStats();

    // failsafe if they delete all items
    if (inventory.length === 0 && money < 200) {
        money = 200;
    }

    const highlightColors = Object.keys(rarityCounts).filter(rarity => rarityCounts[rarity] >= 3);

    const bronzeCount = inventory.filter(item => item.name === "Bronze Pog").length;
    const silverCount = inventory.filter(item => item.name === "Silver Pog").length;
    const goldCount = inventory.filter(item => item.name === "Gold Pog").length;
    const diamondCount = inventory.filter(item => item.name === "Diamond Pog").length;
    const astralCount = inventory.filter(item => item.name === "Astral Pog").length;

    // DEBUG: Check filtering
    console.log("Item name: ", inventory.filter(item => item.name))
    const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(itemSearched));
    console.log("Filtered inventory length:", filteredInventory.length);
    console.log("First few filtered items:", filteredInventory.slice(0, 3).map(i => i.name));

    // set inventory html
    // .filter is used to get the search and .includes to check if the item name includes the searched text
    inventoryDiv.innerHTML = inventory.filter(item => item.name.toLowerCase().includes(itemSearched)).map((item, index) => {
        return hasBonus = highlightColors.includes(item.name),
            namelength = item.name.length,
            sellvalue = Math.round((item.income * 2.94 * (level / 1.6))**((level / 100) + 1)),
            unique = item.rarity === "Unique",
            selected = item.id === selectedID,
            // refernce this inside the map function, for item is only defined in here
            isBronze = item.name === "Bronze Pog",
            isSilver = item.name === "Silver Pog",
            isGold = item.name === "Gold Pog",
            isDiamond = item.name === "Diamond Pog",
            isAstral = item.name === "Astral Pog",
            isGod = item.name === "God Pog",
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
            `<div data-index=${index} class="item ${hasBonus ? 'highlight' : ''} ${item.locked ? 'locked' : ''} ${selected ? 'select' : ''}" style="border: 4px solid ${unique ? "lightgray" : "black"}; background-color: ${isBronze ? '#CD7F32' : isSilver ? '#C0C0C0' : isGold ? '#FFDF00' : isDiamond ? '#4EE2EC' : isAstral ? '#8A2BE2' : isGod ? 'white' : 'rgb(66, 51, 66)'};">
            <img id="lock" style="background-color: ${item.locked ? "white" : "rgba(200, 200, 200, 1)"}" src="../static/icons/buttons_main/lock.png" onclick="lock(${item.id})" width="11" height="12" title="Lock (can't be sold when locked)">
            <h1 class="name" style="color: ${item.color};">${item.name}</h1>
            <br>
            ${canMerge ? `<button class="mergebtn" onclick="merge(${isBronze}, ${isSilver}, ${isGold}, ${isDiamond}, ${isAstral})">Merge (${mergeAmount})</button>` : ""}
            ${canTrade ? `<button class="mergebtn" onclick="trade()">Trade (7)</button>` : ""}
        </div>`;
    }).join("");
}
