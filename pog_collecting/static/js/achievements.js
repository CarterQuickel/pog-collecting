var userdata = JSON.parse(document.getElementById("userdata").textContent);

//mode
if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

// Define the achievements array
const achievements = [
    collection = [
        {
            name: "Full Combo!",
            description: "Get a 3-item combo.",
            icon: "3️⃣",
            reward: "Pileup I",
            status: false,
            hidden: false
        },
        {
            name: "Coneisseur",
            description: "Have 6 3-item combos.",
            icon: "6️⃣",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Candid Coiner",
            description: "Have 60 3-item combos.",
            icon: "6️⃣0️⃣",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "6-7",
            description: "Have 6, then 7, items in your inventory.",
            icon: "🔥",
            reward: "Throwaway I",
            status: false,
            hidden: true
        },
        {
            name: "Pristine",
            description: "Have a copper, silver, and gold pog all at once.",
            icon: "✨",
            reward: "XP Boost II",
            status: false,
            hidden: false
        },
        {
            name: "Exquisite",
            description: "Have a copper, silver, gold, and diamond pog all at once.",
            icon: "💎",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Mythical",
            description: "Have a copper, silver, gold, diamond, and astral pog all at once.",
            icon: "🌌",
            reward: "XP Boost III",
            status: false,
            hidden: false
        },
        {
            name: "Mr. Smith",
            description: "Have one of each tier pog at once.",
            icon: "🎮",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Hoarder",
            description: "Fill your inventory to max when your inventory is greater than 60.",
            icon: "📦",
            reward: "Pileup II",
            status: false,
            hidden: false
        },
        {
            name: "Insane Hoarder",
            description: "Own 100 pogs.",
            icon: "🎁",
            reward: "Pileup III",
            status: false,
            hidden: true
        },
    ],
    level = [
        {
            name: "Merge Maniac",
            description: "Merge your first pog.",
            icon: "🌀",
            reward: "Fast Cash I",
            status: false,
            hidden: false
        },
        {
            name: "Merge Monster",
            description: "Merge 30 pogs.",
            icon: "👹",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Merge Master",
            description: "Merge 80 pogs.",
            icon: "👺",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "God",
            description: "Merge into a God pog.",
            icon: "🪙",
            reward: "Fast Cash II",
            status: false,
            hidden: true
        },
        {
            name: "Experienced",
            description: "Reach level 5.",
            icon: "🎖️",
            reward: "Combo Multiplier I",
            status: false,
            hidden: false
        },
        {
            name: "Veteran",
            description: "Reach level 10.",
            icon: "🎗️",
            reward: "Combo Multiplier II",
            status: false,
            hidden: false
        },
        {
            name: "Legendary",
            description: "Reach level 15.",
            icon: "🏅",
            reward: "Combo Multiplier III",
            status: false,
            hidden: false
        },
        {
            name: "Itsumi!",
            description: "Reach level 64.",
            icon: "🍄",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "No-Life",
            description: "Reach level 100.",
            icon: "💀",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Prestigious",
            description: "Reach the max level.",
            icon: "👑",
            reward: "None",
            status: false,
            hidden: true
        }
    ],
    progression = [
        {
            name: "First Steps",
            description: "Open your first crate.",
            icon: "🏆",
            reward: "XP Boost I",
            status: false,
            hidden: false
        },
        {
            name: "Pogger",
            description: "Open 100 crates.",
            icon: "😲",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Granter",
            description: "Get a 1-star dragon pog.",
            icon: "I",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Achiever",
            description: "Get a 2-star dragon pog.",
            icon: "II",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Successor",
            description: "Get a 3-star dragon pog.",
            icon: "III",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Victor",
            description: "Get a 4-star dragon pog.",
            icon: "IV",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Conqueror",
            description: "Get a 5-star dragon pog.",
            icon: "V",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Dragon Lord",
            description: "Get a 6-star dragon pog.",
            icon: "VI",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Above All",
            description: "Get a 7-star dragon pog.",
            icon: "VII",
            reward: "God Pog",
            status: false,
            hidden: false
        },
        {
            name: "Zeno",
            description: "Have one of each-star dragon pog.",
            icon: "X",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Completionist",
            description: "Unlock all main achievements.",
            icon: "🌟",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Secret Achiever",
            description: "Unlock all secret achievements.",
            icon: "🤫🧏‍♂️",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Platinum Trophy",
            description: "Unlock all achievements.",
            icon: "💯",
            reward: "None",
            status: false,
            hidden: true
        }
    ],
    economy = [
        {
            name: "69",
            description: "Have exactly 69 digipogs at once.",
            icon: "🌈",
            reward: "Throwaway III",
            status: false,
            hidden: true
        },
        {
            name: "420",
            description: "Sell enough pogs to gain back a TOTAL of 420 digipogs.",
            icon: "🗣️",
            reward: "Throwaway II",
            status: false,
            hidden: true
        },
        {
            name: "Wealthy",
            description: "Make your first 1000 dollars.",
            icon: "💵",
            reward: "TBD",
            status: false,
            hidden: false
        },
        {
            name: "Rich",
            description: "Have 1 million dollars at once.",
            icon: "💴",
            reward: "TBD",
            status: false,
            hidden: false
        },
        {
            name: "Elon",
            description: "Have 100 million dollars at once.",
            icon: "💰",
            reward: "Winter is Coming Theme",
            status: false,
            hidden: false
        },
        {
            name: "Entrepreneur",
            description: "Make 2000 cash a second.",
            icon: "🏦",
            reward: "TBD",
            status: false,
            hidden: false
        },
        {
            name: "Tycoon",
            description: "Make 10000 cash a second.",
            icon: "🤑",
            reward: "TBD",
            status: false,
            hidden: false
        },
        {
            name: "Pawn Broker",
            description: "Make 50000 cash a second.",
            icon: "💸",
            reward: "TBD",
            status: false,
            hidden: false
        }
    ],
    unique = [
        {
            name: "Nerdy Inspector",
            description: "Go to the patch notes page.",
            icon: "🤓",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Chicken Jockey!",
            description: "Get a chicken jockey combo.",
            icon: "🐔",
            reward: "Inventory Expansion",
            status: false,
            hidden: true
        },
        {
            name: "An Ender Pearl",
            description: "Get an endermen combo.",
            icon: "🟢",
            reward: "Sorting System",
            status: false,
            hidden: false
        },
        {
            name: "Soda Pop",
            description: "Get a soda pog combo.",
            icon: "🥤",
            reward: "None",
            status: false,
            hidden: false
        }, 
        {
            name: "Sus",
            description: "Have 10 dingus pogs at once.",
            icon: "👽",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Elden Lord",
            description: "Get an Elden Ring pog combo.",
            icon: "⚔️",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "1% of My Power",
            description: "Get a Super Saiyan Shaggy pog combo.",
            icon: "🟠",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Ultimate Despair",
            description: "Get 13 DR (danganronpa) pogs",
            icon: "🔪",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Shaw!",
            description: "Get a Hornet pog.",
            icon: "🕷️",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Uhhh",
            description: "Get an I Heart CP pog combo.",
            icon: "💖",
            reward: "None",
            status: false,
            hidden: true
        },
        {
            name: "Reflection",
            description: "Get a Fallout Vault pog combo.",
            icon: "🛖",
            reward: "None",
            status: false,
            hidden: false
        },
        {
            name: "Mog Pog",
            description: "Get a Handsome Squidward pog combo.",
            icon: "🦑",
            reward: "None",
            status: false,
            hidden: false
        }
    ]
];

const achievementContainer = document.getElementById("achievementsList");
function renderCollection () {
    achievementContainer.innerHTML = "";
    achievements[0].forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement");
        achievementElement.id = `achievement-${index}`;

        if (achievement.hidden && !achievement.status) {
            // Darken and replace content for hidden achievements
            achievementElement.style.backgroundColor = "#333";
            achievementElement.innerHTML = `
                <span class="icon">❓</span><br>
                <span class="name">???</span><br>
                <span class="description">???</span><br>
                <span class="reward">Reward: ???</span><br>
            `;
        } else if (achievement.status) {
            // Render unlocked achievements with glowing effect
            achievementElement.style.backgroundColor = "#8e6fa9"; 
            achievementElement.style.border = "2px solid #FFFFFF"; // Solid border
            achievementElement.style.boxShadow = "0 0 10px #FFFFFF"; // Glowing effect
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderLevel () {
    achievementContainer.innerHTML = "";
    achievements[1].forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement");
        achievementElement.id = `achievement-${index}`;

        if (achievement.hidden && !achievement.status) {
            // Darken and replace content for hidden achievements
            achievementElement.style.backgroundColor = "#333";
            achievementElement.innerHTML = `
                <span class="icon">❓</span><br>
                <span class="name">???</span><br>
                <span class="description">???</span><br>
                <span class="reward">Reward: ???</span><br>
            `;
        } else if (achievement.status) {
            // Render unlocked achievements with glowing effect
            achievementElement.style.backgroundColor = "#8e6fa9"; 
            achievementElement.style.border = "2px solid #FFFFFF"; // Solid border
            achievementElement.style.boxShadow = "0 0 10px #FFFFFF"; // Glowing effect
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderProgression () {
    achievementContainer.innerHTML = "";
    achievements[2].forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement");
        achievementElement.id = `achievement-${index}`;

        if (achievement.hidden && !achievement.status) {
            // Darken and replace content for hidden achievements
            achievementElement.style.backgroundColor = "#333";
            achievementElement.innerHTML = `
                <span class="icon">❓</span><br>
                <span class="name">???</span><br>
                <span class="description">???</span><br>
                <span class="reward">Reward: ???</span><br>
            `;
        } else if (achievement.status) {
            // Render unlocked achievements with glowing effect
            achievementElement.style.backgroundColor = "#8e6fa9"; 
            achievementElement.style.border = "2px solid #FFFFFF"; // Solid border
            achievementElement.style.boxShadow = "0 0 10px #FFFFFF"; // Glowing effect
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });  
}
function renderEconomy () {
    achievementContainer.innerHTML = "";
    achievements[3].forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement");
        achievementElement.id = `achievement-${index}`;

        if (achievement.hidden && !achievement.status) {
            // Darken and replace content for hidden achievements
            achievementElement.style.backgroundColor = "#333";
            achievementElement.innerHTML = `
                <span class="icon">❓</span><br>
                <span class="name">???</span><br>
                <span class="description">???</span><br>
                <span class="reward">Reward: ???</span><br>
            `;
        } else if (achievement.status) {
            // Render unlocked achievements with glowing effect
            achievementElement.style.backgroundColor = "#8e6fa9"; 
            achievementElement.style.border = "2px solid #FFFFFF"; // Solid border
            achievementElement.style.boxShadow = "0 0 10px #FFFFFF"; // Glowing effect
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderUnique() {
    achievementContainer.innerHTML = "";
    achievements[4].forEach((achievement, index) => {
        const achievementElement = document.createElement("div");
        achievementElement.classList.add("achievement");
        achievementElement.id = `achievement-${index}`;

        if (achievement.hidden && !achievement.status) {
            // Darken and replace content for hidden achievements
            achievementElement.style.backgroundColor = "#333";
            achievementElement.innerHTML = `
                <span class="icon">❓</span><br>
                <span class="name">???</span><br>
                <span class="description">???</span><br>
                <span class="reward">Reward: ???</span><br>
            `;
        } else if (achievement.status) {
            // Render unlocked achievements with glowing effect
            achievementElement.style.backgroundColor = "#8e6fa9"; 
            achievementElement.style.border = "2px solid #FFFFFF"; // Solid border
            achievementElement.style.boxShadow = "0 0 10px #FFFFFF"; // Glowing effect
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
                <span class="reward">Reward: ${achievement.reward}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}




// #8e6fa9 (carter dont worry abt ts)

function elonFunc() {
    for (let i = 0; i < achievements[3].length; i++) {
        if (achievements[3][i].name === "Elon") {
            achievements[3][i].status = false && userdata.score >= 100000000;
            achievements[3][i].status = true;
        }
    }
}

function levelFuncs() {
    for (let i = 0; i < achievements[1].length; i++) {
        if (achievements[1][i].name === "Experienced") {
            achievements[1][i].status = userdata.level >= 5;
        }
        if (achievements[1][i].name === "Veteran") {
            achievements[1][i].status = userdata.level >= 10;
        }
        if (achievements[1][i].name === "Legendary") {
            achievements[1][i].status = userdata.level >= 15;
        }
        if (achievements[1][i].name === "Itsumi!") {
            achievements[1][i].status = userdata.level >= 64;
        }
        if (achievements[1][i].name === "No-Life") {
            achievements[1][i].status = userdata.level >= 100;
        }
        if (achievements[1][i].name === "Prestigious") {
            achievements[1][i].status = userdata.level >= 101;
        }
    }
}

setInterval(elonFunc, 1000);
setInterval(levelFuncs, 1000);