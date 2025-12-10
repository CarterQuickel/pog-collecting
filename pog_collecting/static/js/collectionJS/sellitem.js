// sell item
function sellItem(id, sellvalue, locked) {
    console.log(locked)
    if (!locked) {
        const index = inventory.findIndex(item => item.id === id)
        money += sellvalue;
        totalSold++;
        inventory.splice(index, 1);
        // recalc income and refresh UI
        userIncome = getTotalIncome();
        refreshInventory();
        if (window.checkAllAchievements) window.checkAllAchievements();
    }
}