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
    // is the name a dragon pog?
    if (item.name == "Dragon Ball") {

    }
    const rarity = item.rarity;
    const pogcol = item.color;
    let color = "white";
    let owned = false
    // is this possesed by the current pogAmount?
    if (pogAmount.find(n => n.name === name) && pogAmount.find(n => n.rarity === rarity) && pogAmount.find(n => n.pogcol === pogcol)) {
        owned = true;
    }
    // find rarity color details
    const match = rarityColor.find(r => r.name === rarity);
    // rarity color
    color = match ? match.color : "white";
    return `
        <div class="singleI" style="background-color: ${owned ? "rgb(66, 51, 66)" : "black"}">
            <h4 style="color: ${owned ? color : "white"}">${owned ? name : "???"}</h4>
            <p style="font-size: 12px; margin-top: -10px">${owned ? pogcol + " variant" : "???"}</p>
        </div>
    `
}).join("");
itemsHTML.innerHTML = itemView
}