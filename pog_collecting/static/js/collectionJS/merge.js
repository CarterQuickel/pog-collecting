function merge(bronze, silver, gold, diamond, astral) {
    let sold = 0;
    mergeCount += 1;
    //syncing global variable with session variable
    window.mergeCount = mergeCount;
    userdata.mergeCount = mergeCount;

    // add new  pog to inventory
    if (bronze) {
        inventory.push({ pogid: 286, name: "Silver Pog", pogcol: "Silver", color: "orange", income: 620, value: "Unique", id: Math.random() * 100000, description: "A pog made from pure silver.", creator: "Silversmith" });
    } else if (silver) {
        inventory.push({ pogid: 287, name: "Gold Pog", pogcol: "Gold", color: "orange", income: 7400, value: "Unique", id: Math.random() * 100000, description: "A pog made from pure gold.", creator: "King Midas" });
    } else if (gold) {
        inventory.push({ pogid: 288, name: "Diamond Pog", pogcol: "Diamond", color: "orange", income: 83000, value: "Unique", id: Math.random() * 100000, description: "A pog made from the hardest material on Earth.", creator: "Gemmaster" });
    } else if (diamond) {
        inventory.push({ pogid: 289, name: "Astral Pog", pogcol: "Astral", color: "purple", income: 1000000, value: "Unique", id: Math.random() * 100000, description: "A pog infused with the power of the stars.", creator: "Celestial Smith" });
    } else if (astral) {
        inventory.push({ pogid: 290, name: "God Pog", pogcol: "White", color: "purple", income: 694206741, value: "Otherworldly", id: Math.random() * 100000, description: "The ultimate pog, said to be created by the gods themselves.", creator: "Ancient Deity" });
    }
    // only sell the amount needed
    for (let i = 0; i < inventory.length && sold < mergeAmount; i++) {
        if (inventory[i].name === "Bronze Pog" && bronze) {
            sellItem(inventory[i].id, 0, false);
            sold++;
            i--;
        } else if (inventory[i].name === "Silver Pog" && silver) {
            sellItem(inventory[i].id, 0, false);
            sold++;
            i--;
        } else if (inventory[i].name === "Gold Pog" && gold) {
            sellItem(inventory[i].id, 0, false);
            sold++;
            i--;
        } else if (inventory[i].name === "Diamond Pog" && diamond) {
            sellItem(inventory[i].id, 0, false);
            sold++;
            i--;
        } else if (inventory[i].name === "Astral Pog" && astral) {
            sellItem(inventory[i].id, 0, false);
            sold++;
            i--;
        }
    }
    if (window.checkAllAchievements) window.checkAllAchievements();
}