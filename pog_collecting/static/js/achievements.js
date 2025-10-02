achievements = [
{
    name: "First Steps",
    description: "Open your first crate.",
    icon: "🏆" //replace all icons with actual images
},
{
    name: "No-Life",
    description: "Have 100 Million dollars at once.",
    icon: "💰"
}
]

for (let i = 0; i < achievements.length; i++) {
    let achievement = achievements[i];
    let achievementElement = document.createElement("div");
    achievementElement.className = "achievement";
    achievementElement.id = "achievement-" + i;
    achievementElement.innerHTML = `<span class="icon">${achievement.icon}</span> <br>
     <span class="name">${achievement.name}</span> <br>
    <span class="description">${achievement.description}</span>`;
    document.getElementById("achievementsList").appendChild(achievementElement);
}