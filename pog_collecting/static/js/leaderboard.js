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
        info.innerHTML = `<h2>Details for ${player.displayname}</h2>
                          <h3>Score</h3> <p>${player.score}</p>
                          <h3>Level</h3> <p>${player.level}</p>
                          <h3>Inventory</h3> <p>${sortedI.length > 0 ? displayed : "No items"}</p>`;
    })
});