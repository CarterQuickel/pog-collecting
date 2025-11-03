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
            icon: "static/icons/Full_Combo.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Coneisseur",
            description: "Have 6 3-item combos.",
            icon: "static/icons/Coneisseur.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Candid Coiner",
            description: "Have 60 3-item combos.",
            icon: "static/icons/Candid_Coiner.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Programming Prodigy",
            description: "Have 1100100 CP pogs.",
            icon: "static/icons/Programming_Prodigy.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "6-7",
            description: "Have 6, then 7, items in your inventory.",
            icon: "static/icons/67.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Pristine",
            description: "Have a copper, silver, and gold pog all at once.",
            icon: "static/icons/Pristine.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Exquisite",
            description: "Have a copper, silver, gold, and diamond pog all at once.",
            icon: "static/icons/Exquisite.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mythical",
            description: "Have a copper, silver, gold, diamond, and astral pog all at once.",
            icon: "static/icons/Mythical.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Mr. Smith",
            description: "Have one of each tier pog at once.",
            icon: "static/icons/Mr_Smith.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Hoarder",
            description: "Fill your inventory to max when your inventory is greater than 60.",
            icon: "static/icons/Hoarder.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Insane Hoarder",
            description: "Own 100 pogs.",
            icon: "static/icons/Insane_Hoarder.png",
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
            icon: "static/icons/Rookie.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Getting Better",
            description: "Reach level 10.",
            icon: "static/icons/Getting_Better.png",
            reward: "Combo Multiplier II",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Experienced",
            description: "Reach level 15.",
            icon: "static/icons/Experienced.png",
            reward: "Combo Multiplier III",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Veteran",
            description: "Reach level 25.",
            icon: "static/icons/Veteran.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Professional",
            description: "Reach level 40.",
            icon: "static/icons/Professional.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Halfway There",
            description: "Reach level 50.",
            icon: "static/icons/Halfway_There.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Itsumi!",
            description: "Reach level 64.",
            icon: "static/icons/Itsumi!.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Prestigious",
            description: "Reach level 75.",
            icon: "static/icons/Prestigious.png",
            status: false,
            hidden: false,
            notified: false,
        },
        {
            name: "No-Life",
            description: "Reach level 100.",
            icon: "static/icons/No-Life.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "What color is grass?",
            description: "Reach the max level.",
            icon: "static/icons/What_color_is_grass.png",
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
            icon: "static/icons/First_Steps.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Pogger",
            description: "Open 100 crates.",
            icon: "static/icons/Pogger.png",
            reward: "None",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Maniac",
            description: "Merge your first pog.",
            icon: "static/icons/Merge_Maniac.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Monster",
            description: "Merge 30 pogs.",
            icon: "static/icons/Merge_Monster.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Merge Master",
            description: "Merge 80 pogs.",
            icon: "static/icons/Merge_Master.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "God",
            description: "Merge into a God pog.",
            icon: "static/icons/God.png",
            status: false,
            hidden: true,
            notified: false
        },
        {
            name: "Granter",
            description: "Get a 1-star dragon pog.",
            icon: "static/icons/DB_1.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Achiever",
            description: "Get a 2-star dragon pog.",
            icon: "static/icons/DB_2.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Successor",
            description: "Get a 3-star dragon pog.",
            icon: "static/icons/DB_3.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Victor",
            description: "Get a 4-star dragon pog.",
            icon: "static/icons/DB_4.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Conqueror",
            description: "Get a 5-star dragon pog.",
            icon: "static/icons/DB_5.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Dragon Lord",
            description: "Get a 6-star dragon pog.",
            icon: "static/icons/DB_6.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Above All",
            description: "Get a 7-star dragon pog.",
            icon: "static/icons/DB_7.png",
            status: false,
            hidden: false,
            notified: false
        },
        {
            name: "Zeno",
            description: "Have one of each-star dragon pog.",
            icon: "static/icons/DB_Zeno.png",
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
            name: "Monarch",
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
            const img = document.createElement("img")
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
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
                <img src="${achievement.icon}" width="100" height="100"><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
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
                <img src="${achievement.icon}" width="100" height="100"><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
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
                <img src="${achievement.icon}" width="100" height="100"><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
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
                <img src="${achievement.icon}" width="100" height="100"><br>
                <span class="name">${achievement.name}</span><br>
                <span class="description">${achievement.description}</span><br>
            `;
        } else {
            // Render normal visible achievements
            achievementElement.innerHTML = `
                <img src="${achievement.icon}" width="100" height="100"><br>
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
            case "Programming Prodigy":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const CPCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('cp')).length;
                    achievement.status = CPCount >= 100 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Pristine":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasBronzePog = inv.some(it => (it && it.name || '').toLowerCase().includes('bronze pog'));
                    const hasSilverPog = inv.some(it => (it && it.name || '').toLowerCase().includes('silver pog'));
                    const hasGoldPog = inv.some(it => (it && it.name || '').toLowerCase().includes('gold pog'));
                    achievement.status = hasBronzePog && hasSilverPog && hasGoldPog ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Exquisite":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasBronzePog = inv.some(it => (it && it.name || '').toLowerCase().includes('bronze pog'));
                    const hasSilverPog = inv.some(it => (it && it.name || '').toLowerCase().includes('silver pog'));
                    const hasGoldPog = inv.some(it => (it && it.name || '').toLowerCase().includes('gold pog'));
                    const hasDiamondPog = inv.some(it => (it && it.name || '').toLowerCase().includes('diamond pog'));
                    achievement.status = hasBronzePog && hasSilverPog && hasGoldPog && hasDiamondPog ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Mythical":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasBronzePog = inv.some(it => (it && it.name || '').toLowerCase().includes('bronze pog'));
                    const hasSilverPog = inv.some(it => (it && it.name || '').toLowerCase().includes('silver pog'));
                    const hasGoldPog = inv.some(it => (it && it.name || '').toLowerCase().includes('gold pog'));
                    const hasDiamondPog = inv.some(it => (it && it.name || '').toLowerCase().includes('diamond pog'));
                    const hasAstralPog = inv.some(it => (it && it.name || '').toLowerCase().includes('astral pog'));
                    achievement.status = hasBronzePog && hasSilverPog && hasGoldPog && hasDiamondPog && hasAstralPog ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Mr. Smith":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const hasBronzePog = inv.some(it => (it && it.name || '').toLowerCase().includes('bronze pog'));
                    const hasSilverPog = inv.some(it => (it && it.name || '').toLowerCase().includes('silver pog'));
                    const hasGoldPog = inv.some(it => (it && it.name || '').toLowerCase().includes('gold pog'));
                    const hasDiamondPog = inv.some(it => (it && it.name || '').toLowerCase().includes('diamond pog'));
                    const hasAstralPog = inv.some(it => (it && it.name || '').toLowerCase().includes('astral pog'));
                    const hasGodPog = inv.some(it => (it && it.name || '').toLowerCase().includes('god pog'));
                    achievement.status = hasBronzePog && hasSilverPog && hasGoldPog && hasDiamondPog && hasAstralPog && hasGodPog ? true : achievement.status;
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
                    const inv = userdata.inventory;
                    const hasGodPog = inv.some(it => (it && it.name || '').toLowerCase().includes('god pog'));
                    achievement.status = hasGodPog ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Granter":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has1Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 1'));
                    achievement.status = has1Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Achiever":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has2Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 2'));
                    achievement.status = has2Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Successor":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has3Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 3'));
                    achievement.status = has3Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Victor":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has4Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 4'));
                    achievement.status = has4Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Conqueror":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has5Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 5'));
                    achievement.status = has5Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Dragon Lord":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has6Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 6'));
                    achievement.status = has6Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Above All":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has7Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 7'));
                    achievement.status = has7Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Zeno":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const has1Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 1'));
                    const has2Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 2'));
                    const has3Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 3'));
                    const has4Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 4'));
                    const has5Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 5'));
                    const has6Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 6'));
                    const has7Star = inv.some(it => (it && it.name || '').toLowerCase().includes('dragon ball 7'));
                    achievement.status = has1Star && has2Star && has3Star && has4Star && has5Star && has6Star && has7Star ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Completionist":
                if (!achievement.status) {
                    for (let c = 0; c < achievements.length - 1; c++) {
                        for (let a = 0; a < achievements[c].length; a++) {
                            if (!achievements[c][a].hidden) {
                                if (!achievements[c][a].status) {
                                    return;
                                }
                            }
                        }
                    }
                    achievement.status = true;
                    achievementNotify(achievement);
                }
                break;
            case "Secret Achiever":
                if (!achievement.status) {
                    for (let c = 0; c < achievements.length - 1; c++) {
                        for (let a = 0; a < achievements[c].length; a++) {
                            if (achievements[c][a].hidden) {
                                if (!achievements[c][a].status) {
                                    return;
                                }
                            }
                        }
                    }
                    achievement.status = true;
                    achievementNotify(achievement);
                }
                break;
            case "Platinum Trophy":
                if (!achievement.status) {
                    for (let c = 0; c < achievements.length - 1; c++) {
                        for (let a = 0; a < achievements[c].length; a++) {
                            if (!achievements[c][a].status) {
                                return;
                            }
                        }
                    }
                    achievement.status = true;
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
            case "Monopoly":
                if (!achievement.status) {
                    //not function yet aughhh
                }
                break;
            case "Monarch":
                if (!achievement.status) {
                    //not function yet aughhh
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
            case "Nuke Kaboom":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const nkCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('thomas nuke')).length;
                    achievement.status = nkCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Hiding in your WiFi":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const mikuCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('hatsune miku')).length;
                    achievement.status = mikuCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "Strange Man's Game":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const smCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('elf biker')).length;
                    achievement.status = smCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "buttr":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const buttrCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('butter pog')).length;
                    achievement.status = buttrCount >= 3 ? true : achievement.status;
                    achievementNotify(achievement);
                }
                break;
            case "OAUTH":
                if (!achievement.status) {
                    const inv = userdata.inventory;
                    const fbCount = inv.filter(it => (it && it.name || '').toLowerCase().includes('formbar')).length;
                    achievement.status = fbCount >= 1 ? true : achievement.status;
                    achievementNotify(achievement);
                }
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
       <img src="${achievement.icon}" width="50" height="50"><br>
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