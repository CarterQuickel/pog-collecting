
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
    //start of collection achievements
    [
        {
            name: "Full Combo!",
            description: "Get a 3-item combo.",
            icon: "3️⃣",
            status: false,
            hidden: false
        },
        {
            name: "Coneisseur",
            description: "Have 6 3-item combos.",
            icon: "6️⃣",
            status: false,
            hidden: false
        },
        {
            name: "Candid Coiner",
            description: "Have 60 3-item combos.",
            icon: "6️⃣0️⃣",
            status: false,
            hidden: true
        },
        {
            name: "Programming Prodigy",
            description: "Have 1100100 CP pogs.",
            icon: "💻",
            status: false,
            hidden: false
        },
        {
            name: "6-7",
            description: "Have 6, then 7, items in your inventory.",
            icon: "🔥",
            status: false,
            hidden: true
        },
        {
            name: "Pristine",
            description: "Have a copper, silver, and gold pog all at once.",
            icon: "✨",
            status: false,
            hidden: false
        },
        {
            name: "Exquisite",
            description: "Have a copper, silver, gold, and diamond pog all at once.",
            icon: "💎",
            status: false,
            hidden: false
        },
        {
            name: "Mythical",
            description: "Have a copper, silver, gold, diamond, and astral pog all at once.",
            icon: "🌌",
            status: false,
            hidden: false
        },
        {
            name: "Mr. Smith",
            description: "Have one of each tier pog at once.",
            icon: "🎮",
            status: false,
            hidden: true
        },
        {
            name: "Hoarder",
            description: "Fill your inventory to max when your inventory is greater than 60.",
            icon: "📦",
            status: false,
            hidden: false
        },
        {
            name: "Insane Hoarder",
            description: "Own 100 pogs.",
            icon: "🎁",
            status: false,
            hidden: true
        },
    ],
    //start of level achievements
    [
        {
            name: "Rookie",
            description: "Reach level 5.",
            icon: "🎖️",
            status: false,
            hidden: false
        },
        {
            name: "Getting Better",
            description: "Reach level 10.",
            icon: "🎗️",
            reward: "Combo Multiplier II",
            status: false,
            hidden: false
        },
        {
            name: "Experienced",
            description: "Reach level 15.",
            icon: "🏅",
            reward: "Combo Multiplier III",
            status: false,
            hidden: false
        },
        {
            name: "Veteran",
            description: "Reach level 25.",
            icon: "🥇",
            status: false,
            hidden: false
        },
        {
            name: "Professional",
            description: "Reach level 40.",
            icon: "🕶️",
            status: false,
            hidden: false
        },
        {
            name: "Halfway There",
            description: "Reach level 50.",
            icon: "🥈",
            status: false,
            hidden: false
        },
        {
            name: "Itsumi!",
            description: "Reach level 64.",
            icon: "🍄",
            status: false,
            hidden: false
        },
        {
            name: "Prestigious",
            description: "Reach level 75.",
            icon: "👑",
            status: false,
            hidden: false,
        },
        {
            name: "No-Life",
            description: "Reach level 100.",
            icon: "💀",
            status: false,
            hidden: true
        },
        {
            name: "What color is grass?",
            description: "Reach the max level.",
            icon: "🔵",
            status: false,
            hidden: true
        }
    ],
    //start of progression achievements
    [
        {
            name: "First Steps",
            description: "Open your first crate.",
            icon: "🏆",
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
            name: "Merge Maniac",
            description: "Merge your first pog.",
            icon: "🌀",
            status: false,
            hidden: false
        },
        {
            name: "Merge Monster",
            description: "Merge 30 pogs.",
            icon: "👹",
            status: false,
            hidden: false
        },
        {
            name: "Merge Master",
            description: "Merge 80 pogs.",
            icon: "👺",
            status: false,
            hidden: false
        },
        {
            name: "God",
            description: "Merge into a God pog.",
            icon: "🪙",
            status: false,
            hidden: true
        },
        {
            name: "Granter",
            description: "Get a 1-star dragon pog.",
            icon: "I",
            status: false,
            hidden: false
        },
        {
            name: "Achiever",
            description: "Get a 2-star dragon pog.",
            icon: "II",
            status: false,
            hidden: false
        },
        {
            name: "Successor",
            description: "Get a 3-star dragon pog.",
            icon: "III",
            status: false,
            hidden: false
        },
        {
            name: "Victor",
            description: "Get a 4-star dragon pog.",
            icon: "IV",
            status: false,
            hidden: false
        },
        {
            name: "Conqueror",
            description: "Get a 5-star dragon pog.",
            icon: "V",
            status: false,
            hidden: false
        },
        {
            name: "Dragon Lord",
            description: "Get a 6-star dragon pog.",
            icon: "VI",
            status: false,
            hidden: false
        },
        {
            name: "Above All",
            description: "Get a 7-star dragon pog.",
            icon: "VII",
            status: false,
            hidden: false
        },
        {
            name: "Zeno",
            description: "Have one of each-star dragon pog.",
            icon: "X",
            status: false,
            hidden: true
        },
        
        {
            name: "Completionist",
            description: "Unlock all main achievements.",
            icon: "🌟",
            status: false,
            hidden: false
        },
        {
            name: "Secret Achiever",
            description: "Unlock all secret achievements.",
            icon: "🤫🧏‍♂️",
            status: false,
            hidden: true
        },
        {
            name: "Platinum Trophy",
            description: "Unlock all achievements.",
            icon: "💯",
            status: false,
            hidden: true
        }
    ],
    //start of economy achievements
    [
        {
            name: "69",
            description: "Have exactly 69 pogs at once.",
            icon: "🌈",
            status: false,
            hidden: true
        },
        {
            name: "420",
            description: "Sell enough pogs to gain back a TOTAL of 420 digipogs.",
            icon: "🗣️",
            status: false,
            hidden: true
        },
        {
            name: "Wealthy",
            description: "Make your first 1000 dollars.",
            icon: "💵",
            status: false,
            hidden: false
        },
        {
            name: "Rich",
            description: "Have 1 million dollars at once.",
            icon: "💴",
            status: false,
            hidden: false
        },
        {
            name: "Elon",
            description: "Have 100 million dollars at once.",
            icon: "💰",
            status: false,
            hidden: false
        },
        {
            name: "Entrepreneur",
            description: "Make 2000 cash a second.",
            icon: "🏦",
            status: false,
            hidden: false
        },
        {
            name: "Tycoon",
            description: "Make 10000 cash a second.",
            icon: "🤑",
            status: false,
            hidden: false
        },
        {
            name: "Pawn Broker",
            description: "Make 50000 cash a second.",
            icon: "💸",
            status: false,
            hidden: false
        },
        {
            name: "Bank Breaker",
            description: "Make 100000 cash a second.",
            icon: "💳",
            status: false,
            hidden: false
        },
        {
            name: "Industrialist",
            description: "Own a Robux pog.",
            icon: "R$",
            status: false,
            hidden: false
        },
        {
            name: "Capitalist",
            description: "Own a V-Bucks pog.",
            icon: "V$",
            status: false,
            hidden: false
        },
        {
            name: "Monopoly",
            description: "Be on the Top 5 leaderboard.",
            icon: "💹",
            status: false,
            hidden: false
        },
        {
            name: "Oligarch",
            description: "Be the Top 1 on the leaderboard.",
            icon: "€£¥",
            status: false,
            hidden: false
        }
    ],
    //start of unique achievements
    [
        {
            name: "Nerdy Inspector",
            description: "Go to the patch notes page.",
            icon: "🤓",
            status: false,
            hidden: true
        },
        {
            name: "Chicken Jockey!",
            description: "Get a chicken jockey combo.",
            icon: "🐔",
            status: false,
            hidden: true
        },
        {
            name: "An Ender Pearl",
            description: "Get an endermen combo.",
            icon: "🟢",
            status: false,
            hidden: false
        },
        {
            name: "Soda Pop",
            description: "Get a soda pog combo.",
            icon: "🥤",
            status: false,
            hidden: false
        },
        {
            name: "SODA!",
            description: "Get one of each color soda pog.",
            icon: "🫧",
            status: false,
            hidden: false
        },
        {
            name: "Sus",
            description: "Have 10 dingus pogs at once.",
            icon: "👽",
            status: false,
            hidden: false
        },
        {
            name: "Elden Lord",
            description: "Get an Elden Ring pog combo.",
            icon: "⚔️",
            status: false,
            hidden: false
        },
        {
            name: "1% of My Power",
            description: "Get a Super Saiyan Shaggy pog combo.",
            icon: "🟠",
            status: false,
            hidden: false
        },
        {
            name: "Ultimate Despair",
            description: "Get 13 DR (danganronpa) pogs",
            icon: "🔪",
            status: false,
            hidden: true
        },
        {
            name: "Shaw!",
            description: "Get a Hornet pog.",
            icon: "🕷️",
            status: false,
            hidden: false
        },
        {
            name: "Uhhh",
            description: "Get an I Heart CP pog combo.",
            icon: "💖",
            status: false,
            hidden: true
        },
        {
            name: "Reflection",
            description: "Get a Fallout Vault pog combo.",
            icon: "🛖",
            status: false,
            hidden: false
        },
        {
            name: "Pineapple Under the Sea",
            description: "Get a SpongeBob pog combo.",
            icon: "🍍",
            status: false,
            hidden: false
        },
        {
            name: "Mog Pog",
            description: "Get a Handsome Squidward pog combo.",
            icon: "🦑",
            status: false,
            hidden: false
        },
        {
            name: "Goon",
            description: "Get an anime girl pog combo.",
            icon: "👧",
            status: false,
            hidden: true
        },
        {
            name: "Margot Robbie",
            description: "Get a Barbie pog combo.",
            icon: "🎀",
            status: false,
            hidden: false
        },
        {
            name: "I am Vengeance",
            description: "Get 4 Batman Robin pog combos.",
            icon: "🦇",
            status: false,
            hidden: false
        },
        {
            name: "Nuke Kaboom",
            description: "Collect a Thomas Nuke pog.",
            icon: "🚂",
            status: false,
            hidden: false
        },
        {
            name: "Hiding in your WiFi",
            description: "Get a Hatsune Miku pog combo.",
            icon: "🎤",
            status: false,
            hidden: false
        },
        {
            name: "Strange Man's Game",
            description: "Get a Elf Biker pog combo.",
            icon: "🏍️",
            status: false,
            hidden: true
        },
        {
            name: "buttr",
            description: "Get a Butter Pog combo.",
            icon: "🧈",
            status: false,
            hidden: false
        },
        {
            name: "OUATH",
            description: "Get a Formbar pog combo.",
            icon: "📊",
            status: false,
            hidden: false
        }
    ]
];

window.achievements = achievements;

// category variable
let cate = "";
const achievementContainer = document.getElementById("achievementsList");

// initial render
function renderCollection () {
    cate = "collection";
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
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderLevel () {
    cate = "level";
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
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderProgression () {
    cate = "progression";
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
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });  
}
function renderEconomy () {
    cate = "economy";
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
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}
function renderUnique() {
    cate = "unique";
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
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <span class="icon">${achievement.icon}</span><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        }

        achievementContainer.appendChild(achievementElement);
    });
}

// highlight selected category button
setInterval(() => {
    if (cate == "collection") {
        document.getElementById("collection").style = "border: 2px solid white;";
    } else {
        document.getElementById("collection").style = "border: none;";
    }
    if (cate == "level") {
        document.getElementById("level").style = "border: 2px solid white;";
    } else {
        document.getElementById("level").style = "border: none;";
    }
    if (cate == "progression") {
        document.getElementById("progression").style = "border: 2px solid white;";
    } else {
        document.getElementById("progression").style = "border: none;";
    }
    if (cate == "economy") {
        document.getElementById("economy").style = "border: 2px solid white;";
    } else {
        document.getElementById("economy").style = "border: none;";
    }
    if (cate == "unique") {
        document.getElementById("unique").style = "border: 2px solid white;";
    } else {
        document.getElementById("unique").style = "border: none;";
    }
}, 100);

// #8e6fa9 (carter dont worry abt ts)

function collectFunc() {
    for (let i = 0; i < achievements[0].length; i++) {
        const achievement = achievements[0][i];
        switch (achievement.name) {
            case "Full Combo!":
               //cant be tracked yet || ? true : achievement.status;
                break;
            case "Coneisseur":
                //cant be tracked yet || ? true : achievement.status;
                break;
            case "Candid Coiner":
                //cant be tracked yet || ? true : achievement.status;
                break;
            case "6-7":
                if (achievement.status = true) {
                    break;
                } else {
                achievement.status = userdata.Isize >= 7 ? true : achievement.status;
                break;
            }
            case "Pristine":
                //cant be tracked yet || ? true : achievement.status;
                break;
            case "Exquisite":
                 //cant be tracked yet || ? true : achievement.status;
                break;
            case "Mythical":
                //cant be tracked yet || ? true : achievement.status;
                break;
            case "Mr. Smith":
                 //cant be tracked yet || ? true : achievement.status;
                break;
            case "Hoarder":
                achievement.status = userdata.Isize >= 60 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                break;
            case "Insane Hoarder":
                achievement.status = userdata.Isize >= 100 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                break;
            default:
                achievement.status = false; //set to false if no match
        }
    }
}

function levelFuncs() {
    for (let i = 0; i < achievements[1].length; i++) {
        const achievement = achievements[1][i];
        switch (achievement.name) {
            case "Rookie":
                achievement.status = userdata.level >= 5 ? true : achievement.status;
                break;
            case "Getting Better":
                achievement.status = userdata.level >= 10 ? true : achievement.status;
                break;
            case "Experienced":
                achievement.status = userdata.level >= 15 ? true : achievement.status;
                break;
            case "Veteran":
                achievement.status = userdata.level >= 25 ? true : achievement.status;
                break;
            case "Professional":
                achievement.status = userdata.level >= 40 ? true : achievement.status;
                break;
            case "Halfway There":
                achievement.status = userdata.level >= 50 ? true : achievement.status;
                break;
            case "Itsumi!":
                achievement.status = userdata.level >= 64 ? true : achievement.status;
                break;
            case "Prestigious":
                achievement.status = userdata.level >= 75 ? true : achievement.status;
                break;
            case "No-Life":
                achievement.status = userdata.level >= 100 ? true : achievement.status;
                break;
            case "What color is grass?":
                achievement.status = userdata.level >= 101 ? true : achievement.status;
                break;
            default:
                achievement.status = false; // Optional: set to false if no match
        }
    }
}

function econFunc() {
    for (let i = 0; i < achievements[3].length; i++) {
        const achievement = achievements[3][i];
        switch (achievement.name) {
            case "69":
                achievement.status = userdata.inventory.length == 69 ? true : achievement.status;
                break;
            case "420":
                achievement.status = userdata.totalSold >= 420 ? true : achievement.status;
                break;
            case "Wealthy":
                achievement.status = userdata.score >= 1000 ? true : achievement.status;
                break;
            case "Rich":
                achievement.status = userdata.score >= 1000000 ? true : achievement.status;
                break;
            case "Elon":
                achievement.status = userdata.score >= 100000000 ? true : achievement.status;
                break;
            case "Entrepreneur":
                achievement.status = userdata.income >= 2000 ? true : achievement.status;
                break;
            case "Tycoon":
                achievement.status = userdata.income >= 10000 ? true : achievement.status;
                break;
            case "Pawn Broker":
                achievement.status = userdata.income >= 50000 ? true : achievement.status;
                break;
            default:
                achievement.status = false; //set to false if no match
        }
    }
}
setInterval(collectFunc, 1000);
setInterval(levelFuncs, 1000);
setInterval(progFunc, 1000);
setInterval(econFunc, 1000);
setInterval(uniqueFunc, 1000);