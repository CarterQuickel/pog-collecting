achievements = [
{
    name: "First Steps",
    description: "Open your first crate.",
    icon: "🏆" //replace all icons with actual images
},
{
    name: "Elon",
    description: "Have 100 million dollars at once.",
    icon: "💰"
},
{
    name: "Full Combo!",
    description: "Get a 3-item combo.",
    icon: "3️⃣"
},
{
    name: "6-7",
    description: "Have 6, then 7, items in your inventory.",
    icon: "🔥"
},
{
    name: "Chicken Jockey!",
    description: "Get a chicken chockey combo.",
    icon: "🐔"
},
{
    name: "Merge Maniac",
    description: "Merge your first pog.",
    icon: "🌀"
},
{
    name: "Experienced",
    description: "Reach level 5.",
    icon: "🎖️"
},
{
    name: "Veteran",
    description: "Reach level 10.",
    icon: "🎗️"
},
{
    name: "Legendary",
    description: "Reach level 15.",
    icon: "🏅"
},
{
    name: "No-Life",
    description: "Reach level 100.",
    icon: "💀"
},
{
    name: "Hoarder",
    description: "Fill your inventory to max size when your inventory is greater than 60.",
    icon: "📦"
},
{
    name: "Glorious King",
    description: "Be on the Top 5 leaderboard.",
    icon: "👑"
},
{
    name: "Completionist",
    description: "Unlock all other achievements.",
    icon: "🌟"
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