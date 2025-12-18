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
    const filteredInventory = inventory.filter(item => item.name.toLowerCase().includes(itemSearched));
    console.log("Filtered inventory length:", filteredInventory.length);
    console.log("First few filtered items:", filteredInventory.slice(0, 3).map(i => i.name));

    // set inventory html
    const htmlResult = filteredInventory.map((item, index) => {
        console.log("Processing item:", item.name); // DEBUG
        
        const hasBonus = highlightColors.includes(item.name);
        const namelength = item.name.length;
        const desclength = item.description.length;
        const descFontSize = desclength >= 120 ? '12px' : desclength >= 80 ? '14px' : '16px';
        const nameFontSize = namelength >= 19 ? '9px' : namelength >= 12 ? '12px' : '16px';
        const sellvalue = Math.round(item.income * 1.05);
        
        const isBronze = item.name === "Bronze Pog";
        const isSilver = item.name === "Silver Pog";
        const isGold = item.name === "Gold Pog";
        const isDiamond = item.name === "Diamond Pog";
        const isAstral = item.name === "Astral Pog";
        const isGod = item.name === "God Pog";
        
        const bronze = isBronze && bronzeCount >= mergeAmount;
        const silver = isSilver && silverCount >= mergeAmount;
        const gold = isGold && goldCount >= mergeAmount;
        const diamond = isDiamond && diamondCount >= mergeAmount;
        const astral = isAstral && astralCount >= mergeAmount;
        const canMerge = bronze || silver || gold || diamond || astral;
        const canTrade = item.name === "Dragon Ball 7";
        
        return `<div class="item ${hasBonus ? 'highlight' : ''}" style="scale: ${item.locked ? 0.9 : 1}">
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
            <button id="sellbtn" onclick="sellItem(${item.id}, ${sellvalue}, ${item.locked})">Sell for <br>$${sellvalue}</button>
            ${canMerge ? `<button class="mergebtn" onclick="merge(${isBronze}, ${isSilver}, ${isGold}, ${isDiamond}, ${isAstral})">Merge (${mergeAmount})</button>` : ""}
            ${canTrade ? `<button class="mergebtn" onclick="trade()">Trade (7)</button>` : ""}
        </div>`;
    }).join("");

    console.log("Generated HTML length:", htmlResult.length);
    console.log("HTML preview:", htmlResult.substring(0, 200));

    inventoryDiv.innerHTML = htmlResult;
    
    console.log("DOM update complete - inventoryDiv.innerHTML set");
    console.log("inventoryDiv.children.length:", inventoryDiv.children.length);
}
