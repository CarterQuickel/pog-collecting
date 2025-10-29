var userdata = JSON.parse(document.getElementById("userdata").textContent);
var scores = JSON.parse(document.getElementById("scores").textContent);

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
        const inv = JSON.parse(player.inventory)
        console.log(inv)
        let sortedI = inv.map((item => ` ${item.name}`));
        displayed = sortedI.slice(0, 100);
        if (sortedI.length > 100) {
            displayed.push(" ...and more");
        }
        console.log(sortedI)
        const info = document.getElementById("details");
        info.innerHTML = `<h3>Details for ${player.displayname}</h3>
                          <h4>Score</h4> <p>${player.score}</p>
                          <h4>Level</h4> <p>${player.level}</p>
                          <h4>Inventory</h4> <p>${sortedI.length > 0 ? displayed : "No items"}</p>`;
    })
});