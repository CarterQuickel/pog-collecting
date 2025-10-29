// Client-side achievements script
// Initialize userdata and DOM references after DOMContentLoaded
let achievementContainer = null;

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    if (slider) {
        //slider stuff cuz it pmo
        if (!slider.style.position) slider.style.position = 'fixed';
        slider.style.transition = `left ${TRANSITION_MS}ms ease`;
        slider.style.left = SLIDE_OUT; // start hidden
    }

    achievementContainer = document.getElementById('achievementsList');

    if (userdata && userdata.theme === 'light') {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    } else if (userdata && userdata.theme === 'dark') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }

    // start periodic checks now that DOM and userdata are available
    setInterval(collectFunc, 1000);
    setInterval(levelFuncs, 1000);
    setInterval(progFunc, 1000);
    setInterval(econFunc, 1000);
    setInterval(uniqueFunc, 1000);
});




const achievements = [
    //start of collection achievements
    [
        {
            name: "Full Combo!",
            description: "Get a 3-item combo.",
            icon: "3️⃣",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Coneisseur",
            description: "Have 6 3-item combos.",
            icon: "6️⃣",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Candid Coiner",
            description: "Have 60 3-item combos.",
            icon: "6️⃣0️⃣",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Programming Prodigy",
            description: "Have 1100100 CP pogs.",
            icon: "💻",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "6-7",
            description: "Have 6, then 7, items in your inventory.",
            icon: "🔥",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Pristine",
            description: "Have a copper, silver, and gold pog all at once.",
            icon: "✨",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Exquisite",
            description: "Have a copper, silver, gold, and diamond pog all at once.",
            icon: "💎",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mythical",
            description: "Have a copper, silver, gold, diamond, and astral pog all at once.",
            icon: "🌌",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mr. Smith",
            description: "Have one of each tier pog at once.",
            icon: "🎮",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Hoarder",
            description: "Fill your inventory to max when your inventory is greater than 60.",
            icon: "📦",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Insane Hoarder",
            description: "Own 100 pogs.",
            icon: "🎁",
            status: false,
            hidden: true,
            notified: false
        },
    ],
    //start of level achievements
    [
        {
            name: "Rookie",
            description: "Reach level 5.",
            icon: "🎖️",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Getting Better",
            description: "Reach level 10.",
            icon: "🎗️",
            reward: "Combo Multiplier II",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Experienced",
            description: "Reach level 15.",
            icon: "🏅",
            reward: "Combo Multiplier III",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Veteran",
            description: "Reach level 25.",
            icon: "🥇",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Professional",
            description: "Reach level 40.",
            icon: "🕶️",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Halfway There",
            description: "Reach level 50.",
            icon: "🥈",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Itsumi!",
            description: "Reach level 64.",
            icon: "🍄",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Prestigious",
            description: "Reach level 75.",
            icon: "👑",
            status: false,
            hidden: false,
            notified: false,
        },
        {
            name: "No-Life",
            description: "Reach level 100.",
            icon: "💀",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "What color is grass?",
            description: "Reach the max level.",
            icon: "🔵",
            status: false,
            hidden: true,
            notified: false
        }
    ],
    //start of progression achievements
    [
        {
            name: "First Steps",
            description: "Open your first crate.",
            icon: "🏆",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pogger",
            description: "Open 100 crates.",
            icon: "😲",
            reward: "None",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Maniac",
            description: "Merge your first pog.",
            icon: "🌀",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Monster",
            description: "Merge 30 pogs.",
            icon: "👹",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Master",
            description: "Merge 80 pogs.",
            icon: "👺",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "God",
            description: "Merge into a God pog.",
            icon: "🪙",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Granter",
            description: "Get a 1-star dragon pog.",
            icon: "I",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Achiever",
            description: "Get a 2-star dragon pog.",
            icon: "II",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Successor",
            description: "Get a 3-star dragon pog.",
            icon: "III",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Victor",
            description: "Get a 4-star dragon pog.",
            icon: "IV",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Conqueror",
            description: "Get a 5-star dragon pog.",
            icon: "V",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Dragon Lord",
            description: "Get a 6-star dragon pog.",
            icon: "VI",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Above All",
            description: "Get a 7-star dragon pog.",
            icon: "VII",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Zeno",
            description: "Have one of each-star dragon pog.",
            icon: "X",
            status: false,
            hidden: true,
            notified: false
        },
        
        {
            name: "Completionist",
            description: "Unlock all main achievements.",
            icon: "🌟",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Secret Achiever",
            description: "Unlock all secret achievements.",
            icon: "🤫🧏‍♂️",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Platinum Trophy",
            description: "Unlock all achievements.",
            icon: "💯",
            status: false,
            hidden: true,
            notified: false
        }
    ],
    //start of economy achievements
    [
        {
            name: "69",
            description: "Have exactly 69 pogs at once.",
            icon: "🌈",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "420",
            description: "Sell enough pogs to gain back a TOTAL of 420 digipogs.",
            icon: "🗣️",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Wealthy",
            description: "Make your first 1000 dollars.",
            icon: "💵",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Rich",
            description: "Have 1 million dollars at once.",
            icon: "💴",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Elon",
            description: "Have 100 million dollars at once.",
            icon: "💰",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Entrepreneur",
            description: "Make 2000 cash a second.",
            icon: "🏦",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Tycoon",
            description: "Make 10000 cash a second.",
            icon: "🤑",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pawn Broker",
            description: "Make 50000 cash a second.",
            icon: "💸",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Bank Breaker",
            description: "Make 100000 cash a second.",
            icon: "💳",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Industrialist",
            description: "Own a Robux pog.",
            icon: "R$",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Capitalist",
            description: "Own a V-Bucks pog.",
            icon: "V$",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Monopoly",
            description: "Be on the Top 5 leaderboard.",
            icon: "💹",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Oligarch",
            description: "Be the Top 1 on the leaderboard.",
            icon: "€£¥",
            status: false,
            hidden: false,
            notified: false
        }
    ],
    //start of unique achievements
    [
        {
            name: "Nerdy Inspector",
            description: "Go to the patch notes page.",
            icon: "🤓",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Chicken Jockey!",
            description: "Get a chicken jockey.",
            icon: "🐔",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "An Ender Pearl",
            description: "Get an endermen combo.",
            icon: "🟢",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Soda Pop",
            description: "Get a soda pog combo.",
            icon: "🥤",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "SODA!",
            description: "Get one of each color soda pog.",
            icon: "🫧",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Sus",
            description: "Have 10 dingus pogs at once.",
            icon: "👽",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Elden Lord",
            description: "Get an Elden Ring pog combo.",
            icon: "⚔️",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "1% of My Power",
            description: "Get a Super Saiyan Shaggy pog combo.",
            icon: "🟠",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Ultimate Despair",
            description: "Get 13 DR (danganronpa) pogs",
            icon: "🔪",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Shaw!",
            description: "Get a Hornet pog.",
            icon: "🕷️",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Uhhh",
            description: "Get an I Heart CP pog combo.",
            icon: "💖",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Reflection",
            description: "Get a Fallout Vault pog combo.",
            icon: "🛖",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pineapple Under the Sea",
            description: "Get a SpongeBob pog combo.",
            icon: "🍍",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mog Pog",
            description: "Get a Handsome Squidward pog combo.",
            icon: "🦑",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Goon",
            description: "Get an anime girl pog combo.",
            icon: "🤍",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Margot Robbie",
            description: "Get a Barbie pog combo.",
            icon: "🎀",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "I am Vengeance",
            description: "Get 4 Batman Robin pog combos.",
            icon: "🦇",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Nuke Kaboom",
            description: "Collect a Thomas Nuke pog.",
            icon: "🚂",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Hiding in your WiFi",
            description: "Get a Hatsune Miku pog combo.",
            icon: "🎤",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Strange Man's Game",
            description: "Get a Elf Biker pog combo.",
            icon: "🏍️",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "buttr",
            description: "Get a Butter Pog combo.",
            icon: "🧈",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "OAUTH",
            description: "Get a Formbar pog combo.",
            icon: "📊",
            status: false,
            hidden: false,
            notified: false
        }
    ]
];

window.achievements = achievements;

// category variable
let cate = "";

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
    try {
        const ids = ['collection','level','progression','economy','unique'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            // explicitly reset then apply highlight only to the active category
            el.style.border = (cate === id) ? '2px solid white' : 'none';
        });
    } catch (e) { /* ignore */ }
}, 100);

// #8e6fa9 (carter dont worry abt ts)

function collectFunc() {
    for (let i = 0; i < achievements[0].length; i++) {
        const achievement = achievements[0][i];
        switch (achievement.name) {
            case "Full Combo!":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Coneisseur":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Candid Coiner":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "6-7":
                if (!achievement.status) {
                    achievement.status = userdata.Isize >= 7 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Pristine":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Exquisite":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Mythical":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Mr. Smith":
                if (!achievement.status) {
                    //cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Hoarder":
                if (!achievement.status) {
                    achievement.status = userdata.Isize >= 60 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Insane Hoarder":
                if (!achievement.status) {
                    achievement.status = userdata.Isize >= 100 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                    achievementNotify(achievement);
                }
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
                if (!achievement.status) {
                    achievement.status = userdata.level >= 5 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Getting Better":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 10 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Experienced":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 15 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Veteran":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 25 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Professional":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 40 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Halfway There":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 50 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Itsumi!":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 64 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Prestigious":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 75 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "No-Life":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 100 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "What color is grass?":
                if (!achievement.status) {
                    achievement.status = userdata.level >= 101 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            default:
                achievement.status = false; // Optional: set to false if no match
        }
    }
}

function progFunc() {
    for (let i = 0; i < achievements[2].length; i++) {
        const achievement = achievements[2][i];
        switch (achievement.name) {
            case "First Steps":
                if (!achievement.status) {
                    achievement.status = userdata.cratesOpened >= 1 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Pogger":
                if(!achievement.status){
                    achievement.status = userdata.cratesOpened >= 100 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Merge Maniac":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Merge Monster":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Merge Master":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "God":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Granter":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Achiever":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Successor":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Victor":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Conqueror":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Dragon Lord":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Above All":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Zeno":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Completionist":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Secret Achiever":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Platinum Trophy":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;

            default:
                achievement.status = false; //set to false if no match
        }
    }
}

function econFunc() {
    for (let i = 0; i < achievements[3].length; i++) {
        const achievement = achievements[3][i];
        switch (achievement.name) {
            case "69":
                if (!achievement.status) {
                    achievement.status = userdata.inventory.length == 69 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "420":
                if (!achievement.status) {
                    achievement.status = userdata.totalSold >= 420 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Wealthy":
                if (!achievement.status) {
                    achievement.status = userdata.score >= 1000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Rich":
                if (!achievement.status) {
                    achievement.status = userdata.score >= 1000000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Elon":
                if (!achievement.status) {
                    achievement.status = userdata.score >= 100000000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Entrepreneur":
                if (!achievement.status) {
                    achievement.status = userdata.income >= 2000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Tycoon":
                if (!achievement.status) {
                    achievement.status = userdata.income >= 10000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Pawn Broker":
                if (!achievement.status) {
                    achievement.status = userdata.income >= 50000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Bank Breaker":
                if (!achievement.status) {
                    achievement.status = userdata.income >= 100000 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Industrialist":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasRobux = inv.some(it => (it && it.name || '').toLowerCase().includes('robux') || (it && it.name || '').toLowerCase().includes('robuck'));
                    achievement.status = hasRobux ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Capitalist":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasVbucks = inv.some(it => (it && it.name || '').toLowerCase().includes('v-bucks') || (it && it.name || '').toLowerCase().includes('vbuck'));
                    achievement.status = hasVbucks ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            default:
                achievement.status = false; //set to false if no match
        }
    }
}

function uniqueFunc() {
    for (let i = 0; i < achievements[4].length; i++) {
        const achievement = achievements[4][i];
        switch (achievement.name) {
            case "Nerdy Inspector":
                if (!achievement.status) {
                    //untracked ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Chicken Jockey!":
                if (!achievement.status) {
                const inv = userdata.inventory;
                const hasChicken = inv.some(it => (it && it.name || '').toLowerCase().includes('chicken'));
                const hasZombie = inv.some(it => (it && it.name || '').toLowerCase().includes('zombie'));
                achievement.status = hasChicken && hasZombie ? true : achievement.status;
                achievementNotify(achievement);
                }
                break;
            case "An Ender Pearl":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasUpperEnder = inv.some(it => (it && it.name || '').toLowerCase().includes('upper endermen'));
                    const hasLowerEnder = inv.some(it => (it && it.name || '').toLowerCase().includes('lower endermen'));
                    achievement.status = hasUpperEnder && hasLowerEnder ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Soda Pop":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const sodaCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('soda')).length;
                    achievement.status = sodaCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "SODA!":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    //achievement.status = cant be tracked yet || ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Sus":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const dingusCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('dingus')).length;
                    achievement.status = dingusCount >= 10 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break; 
            case "Elden Lord":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const eldenCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('elden ring')).length;
                    achievement.status = eldenCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "1% of My Power":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const shaggyCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('saiyan shaggy')).length;
                    achievement.status = shaggyCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Ultimate Despair":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const drCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('danganronpa')).length;
                    achievement.status = drCount >= 13 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;         
            case "Shaw!":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hornetCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('hornet')).length;
                    achievement.status = hornetCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Uhhh":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const cpCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('i [heart] cp')).length;
                    achievement.status = cpCount >= 1 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Reflection":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const vaultCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('fallout vault')).length;
                    achievement.status = vaultCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Pineapple Under the Sea":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const sbCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('spongebob squarepants')).length;
                    achievement.status = sbCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Mog Pog":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const squidCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('squidward')).length;
                    achievement.status = squidCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Goon":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const goonCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('anime girl')).length;
                    achievement.status = goonCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Margot Robbie":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const barbieCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('barbie')).length;
                    achievement.status = barbieCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "I am Vengeance":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const brCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('batman & robin')).length;
                    achievement.status = brCount >= 12 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            default:
                achievement.status = false; //set to false if no match
        }
    }
}

//notification slider logic bc im lazy
const achievementQueue = [];
let sliderBusy = false;
const SLIDE_IN = "20px";
const SLIDE_OUT = "-320px";
const DISPLAY_MS = 3000;
const TRANSITION_MS = 400;

function achievementNotify(achievement) {
    // queue achievements instead of showing immediately
    if (achievement.status && !achievement.notified) {
        achievement.notified = true; // prevent duplicate queueing
        achievementQueue.push(achievement);
        processAchievementQueue();
        refreshAchievementsView();
    }
}


function refreshAchievementsView() {
    try {
        switch (cate) {
            case "collection": renderCollection(); break;
            case "level": renderLevel(); break;
            case "progression": renderProgression(); break;
            case "economy": renderEconomy(); break;
            case "unique": renderUnique(); break;
            default:  break;
        }
    } catch (e) {
    }
}


function processAchievementQueue() {
    if (sliderBusy) return;
    if (achievementQueue.length === 0) {
        // ensure slider is hidden if queue is empty
        const slider = document.getElementById("slider");
        if (slider) {
            slider.style.left = SLIDE_OUT;
            // clear leftover content after transition to avoid lingering visuals
            setTimeout(() => {
                slider.innerHTML = "";
            }, TRANSITION_MS);
        }
        return;
    }

    sliderBusy = true;
    const achievement = achievementQueue.shift();
    const slider = document.getElementById("slider");
    if (!slider) {
        achievementQueue.unshift(achievement);
        sliderBusy = false;
        setTimeout(processAchievementQueue, 200);
        return;
    }

    slider.innerHTML = `
       <span class="title">Achievement Unlocked!</span><br>
       <span class="icon">${achievement.icon}</span><br>
       <span class="name">${achievement.name}</span><br>
       <span class="description">${achievement.description}</span><br>
    `;

    if (!slider.style.transition) slider.style.transition = `left ${TRANSITION_MS}ms ease`;

    //me when the slider slides in
    requestAnimationFrame(() => {
        slider.style.left = SLIDE_IN;
    });

    //me when the slider slides out
    setTimeout(() => {
        slider.style.left = SLIDE_OUT;
        setTimeout(() => {
            // clear DOM so last item doesn't linger visually
            slider.innerHTML = "";
            sliderBusy = false;
            setTimeout(processAchievementQueue, 100);
        }, TRANSITION_MS);
    }, DISPLAY_MS);
}

setInterval(collectFunc, 1000);
setInterval(levelFuncs, 1000);
setInterval(progFunc, 1000);
setInterval(econFunc, 1000);
setInterval(uniqueFunc, 1000);