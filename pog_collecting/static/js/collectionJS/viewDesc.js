function viewDesc(id, color, creator, desc, income, value) {
    console.log(id, color, creator, desc, income, value)
    const panel = document.getElementById("descPanel")
    panel.innerHTML = `
    Id: ${id} <br><br>
    Color: ${color} <br><br>
    Creator: ${creator} <br><br>
    Description: ${desc}<br><br>
    <strong style="color: green">$${Math.round(income * ((window.perNameBonus && window.perNameBonus[name]) || 1))}/s</strong><br>
    <strong style="color: #79c761">Sell Value: $${value}</strong>
    `
}