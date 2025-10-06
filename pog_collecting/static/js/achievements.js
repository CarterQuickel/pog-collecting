// Define the achievements array
const achievements = [
    {
        name: "First Steps",
        description: "Open your first crate.",
        icon: "🏆",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Elon",
        description: "Have 100 million dollars at once.",
        icon: "💰",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Full Combo!",
        description: "Get a 3-item combo.",
        icon: "3️⃣",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "6-7",
        description: "Have 6, then 7, items in your inventory.",
        icon: "🔥",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Chicken Jockey!",
        description: "Get a chicken jockey combo.",
        icon: "🐔",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Merge Maniac",
        description: "Merge your first pog.",
        icon: "🌀",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Experienced",
        description: "Reach level 5.",
        icon: "🎖️",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Veteran",
        description: "Reach level 10.",
        icon: "🎗️",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Legendary",
        description: "Reach level 15.",
        icon: "🏅",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "No-Life",
        description: "Reach level 100.",
        icon: "💀",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Hoarder",
        description: "Fill your inventory to max size when your inventory is greater than 60.",
        icon: "📦",
        reward: "idk yet get a life vro",
        status: false
    },
    {
        name: "Completionist",
        description: "Unlock all other achievements.",
        icon: "🌟",
        reward: "idk yet get a life vro",
        status: false
    }
];

// Get the achievements list container
const achievementsList = document.getElementById("achievementsList");

// Check if the container exists before appending elements
if (achievementsList) {
    // Loop through the achievements array and create elements for each achievement
    achievements.forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.className = "achievement";
        achievementElement.id = `achievement-${index}`;
        achievementElement.innerHTML = `
            <span class="icon">${achievement.icon}</span><br>
            <span class="name">${achievement.name}</span><br>
            <span class="description">${achievement.description}</span><br>
            <span class="reward">Reward: ${achievement.reward}</span><br>
            <span class="status">${achievement.status ? "Unlocked" : "Locked"}</span>
        `;
        achievementsList.appendChild(achievementElement);
    });
} else {
    console.error("Element with ID 'achievementsList' not found in the DOM.");
}