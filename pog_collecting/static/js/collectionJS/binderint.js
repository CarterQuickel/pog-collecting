document.getElementById("binder").addEventListener("click", () => {
    const binder = document.getElementById("binderBanner");
    binder.style.display = "block";
    viewCollection()
});

document.getElementById("closeBinder").addEventListener("click", () => {
    const binder = document.getElementById("binderBanner");
    binder.style.display = "none";
});

function viewCollection() {
const itemsHTML = document.getElementById("binderItems")
const itemView = pogList.map((item) => {
    const name = item.name;
    const rarity = item.rarity;
    let color = "white";
    let owned = false
    if (inventory.find(r => r.name === name)) {
        owned = true;
    }
    // find rarity color details
    const match = rarityColor.find(r => r.name === rarity);
    // rarity color
    color = match ? match.color : "white";
    return `
        <div class="singleI" style="background-color: ${owned ? "rgb(66, 51, 66)" : "black"}">
            <h4>${name}</h4>
            <p style="color: ${color}">${rarity}</p>
        </div>
    `
}).join("");
itemsHTML.innerHTML = itemView
}