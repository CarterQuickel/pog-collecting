const helpcontain = document.getElementById("helpBanner")

function setHelp() {
    const hinf = document.getElementById("htpDiv")
    hinf.innerHTML = `
    <h2>Overview</h2>
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
    <h4>Dragon Pogs</h4>
    <p>There are 7 stars of dragon pogs, which do not drop from mythic crates. Getting one of each star will let you gain a wish.</p>
    <p>There are 3 wishes you can choose from:</p>
    <ul>
        <li>-Gain more money
        <li>-Gain XP
        <li>-Discount crate costs
    </ul>
    <p>You cannot trade, even if you a 7-star pog, without the other 6 stars.</p>
    <h4>Bronze Pogs</h4>
    <p>10 bronze pogs can be combined into silver pogs, 10 silver pogs can be combined into gold pogs.</p>
    <ul>
        <li>-Bronze; multiple incomes
        <li>-Silver; $620/s
        <li>-Gold; $7,400/s
        <li>-Diamond; $83,000/s
        <li>-Astral; $1,000,000/s
        <li>-God; $694,206,741/s
    </ul>
    `
}

document.getElementById("help").addEventListener("click", () => {
    helpcontain.style.display = "block";
    setHelp()
});

document.getElementById("closeHelp").addEventListener("click", () => {
    helpcontain.style.display = "none"
})