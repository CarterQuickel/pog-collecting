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
        refreshInventory();
    }
}