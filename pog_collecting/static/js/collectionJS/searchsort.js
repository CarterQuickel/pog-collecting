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

//categorize functionality
document.getElementById("selectSort").addEventListener("change", () => {
    const sortBy = document.getElementById("selectSort").value;
    if (sortBy === "incomeHf") {
        inventory.sort((a, b) => b.income - a.income);
    } else if (sortBy === "incomeLf") {
        inventory.sort((a, b) => a.income - b.income);
    } else if (sortBy === "nameAZ") {
        inventory.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "nameZA") {
        inventory.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "svHf") {
        inventory.sort((a, b) => (Math.round(b.income * 1.05)) - (Math.round(a.income * 1.05)));
    } else if (sortBy === "svLf") {
        inventory.sort((a, b) => (Math.round(a.income * 1.05)) - (Math.round(b.income * 1.05)));
    }
    refreshInventory();
});

// search variables
let searching = false;
let itemSearched = "";

// clear search every 100ms if box is empty
setInterval(() => {
    if (itemSearched === "") {
        searching = false;
    }
}, 100);