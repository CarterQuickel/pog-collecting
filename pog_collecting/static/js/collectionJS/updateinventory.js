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
            desclength = item.description.length,
            descFontSize = desclength >= 120 ? '12px' : desclength >= 80 ? '14px' : '16px',
            nameFontSize = namelength >= 19 ? '9px' : namelength >= 12 ? '12px' : '16px',
            sellvalue = Math.round(item.income * 1.05),
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
            `<div class="item ${hasBonus ? 'highlight' : ''}" style="scale: ${item.locked ? 0.9 : 1}">
            <img id="lock" style="background-color: ${item.locked ? "white" : "rgba(255, 255, 255, 0.5)"}" src="../static/icons/buttons_main/lock.png" onclick="lock(${item.id})" width="11" height="12" title="Lock (can't be sold when locked)">
            <br>
            <strong class ="name" style="color: ${isBronze ? '#CD7F32' : isSilver ? '#C0C0C0' : isGold ? '#FFDF00' : isDiamond ? '#4EE2EC' : isAstral ? '#8A2BE2' : isGod ? 'black' : 'white'}; font-size: ${nameFontSize};">${item.name}</strong>
            <br>
            <div class="tooltip-descCont">
            <button id="desc" class="infobtn">Details</button>
            <span id="descSpan" class="tooltip-desc" style="font-size: ${descFontSize}">
                Id: ${item.pogid} <br><br>
                Color: ${item.pogcol} <br><br>
                Creator: ${item.creator} <br><br>
                Description: ${item.description}
            </span>
            </div>
            <br>
            <hr>
            <ul>
                <li class='list' style="color: ${item.color}">${item.value}</li>
                <li class='list' style="color: green">$${Math.round(item.income * ((window.perNameBonus && window.perNameBonus[item.name]) || 1))}/s</li>
            </ul>
            <button id="sellbtn" onclick="sellItem(${item.id}, sellvalue, ${item.locked})">Sell for <br>$${sellvalue}</button>
            ${canMerge ? `<button class="mergebtn" onclick="merge(${isBronze}, ${isSilver}, ${isGold}, ${isDiamond}, ${isAstral})">Merge (${mergeAmount})</button>` : ""}
            ${canTrade ? `<button class="mergebtn" onclick="trade()">Trade (7)</button>` : ""}
        </div>
    `}).join("");
}