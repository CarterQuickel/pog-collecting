var userdata = JSON.parse(document.getElementById("userdata").textContent);
var scores = JSON.parse(document.getElementById("scores").textContent);
console.log(scores)

//mode
if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

document.querySelectorAll(".infobtn").forEach(button => {
    button.addEventListener('click', () => {
        const index = button.dataset.index;
        const player = scores[index]
        const inv = player.inventory
        console.log(player)
        alert(`Player: ${player.displayname}\nScore: ${player.score}\nLevel: ${player.level}\nPogs: ${player.pogamount}\nXP: ${player.xp}\nInventory: ${JSON.parse(JSON.stringify(inv))}`);
    })
});