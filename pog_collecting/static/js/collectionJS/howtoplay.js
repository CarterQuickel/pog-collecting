const helpcontain = document.getElementById("helpBanner")

function setHelp() {
    const hinf = document.getElementById("htpDiv")
    hinf.innerHTML = `
    <h2>The Basics</h2>
    <p>Open the crate list in the bottom right corner to show your crates. Each one has its own rarities and cost.</p>
    <p>Opening crates grants you pogs. Pogs give XP based on their income, which scales the further you progress.</p>
    <p>Once you level up, you will gain new inventory slots:</p>
    <ul>
        <li>-Every level grants 5 slots
        <li>-Every level 5 grants 10 slots
    </ul>
    <p>Your income also rises with new pogs.</p>
    <p>There are 285 unique pogs. Collect them all!</p>
    <h2>Unqiue Pogs</h2>
    <h4></h4>
    `
}

document.getElementById("help").addEventListener("click", () => {
    helpcontain.style.display = "block";
    setHelp()
});

document.getElementById("closeHelp").addEventListener("click", () => {
    helpcontain.style.display = "none"
})