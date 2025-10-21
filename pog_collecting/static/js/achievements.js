
var userdata = JSON.parse(document.getElementById("userdata").textContent);

//mode
if (userdata.theme === "light") {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
} else if (userdata.theme === "dark") {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
}

achievements = userdata.achievements || [[], [], [], [], []];

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
                if (achievement.status == true) {
                    break;
                } else {
               //cant be tracked yet || ? true : achievement.status;
                break;
            }
            case "Coneisseur":
                if (achievement.status == true) {
                    break;
                } else {
                //cant be tracked yet || ? true : achievement.status;
                break;
            }
            case "Candid Coiner":
                if (achievement.status == true) {
                    break;
                } else {
                //cant be tracked yet || ? true : achievement.status;
                break;
                }
            case "6-7":
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.Isize >= 7 ? true : achievement.status;
                break;
            }
            case "Pristine":
                if (achievement.status == true) {
                    break;
                } else {
                //cant be tracked yet || ? true : achievement.status;
                break;
                }
            case "Exquisite":
                if (achievement.status == true) {
                    break;
                } else {
                 //cant be tracked yet || ? true : achievement.status;
                break;
                }
            case "Mythical":
                if (achievement.status == true) {
                    break;
                } else {
                //cant be tracked yet || ? true : achievement.status;
                break;
                }
            case "Mr. Smith":
                if (achievement.status == true) {
                    break;
                } else {
                 //cant be tracked yet || ? true : achievement.status;
                break;
                }
            case "Hoarder":
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.Isize >= 60 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                break;
                }
            case "Insane Hoarder":
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.Isize >= 100 && userdata.inventory.length >= userdata.Isize ? true : achievement.status;
                break;
                }
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
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.level >= 5 ? true : achievement.status;
                break;
                }
            case "Getting Better":
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.level >= 10 ? true : achievement.status;
                break;
                }
            case "Experienced":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.level >= 15 ? true : achievement.status;
                break;
            }
            case "Veteran":
            if (achievement.status == true) {
                    break;
                } else {
            achievement.status = userdata.level >= 25 ? true : achievement.status;
                break;
                }
            case "Professional":
            if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.level >= 40 ? true : achievement.status;
                break;
                }
            case "Halfway There":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.level >= 50 ? true : achievement.status;
                break;
                }
            case "Itsumi!":
            if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.level >= 64 ? true : achievement.status;
                break;
                }
            case "Prestigious":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.level >= 75 ? true : achievement.status;
                break;
                }
            case "No-Life":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.level >= 100 ? true : achievement.status;
                break;
                }
            case "What color is grass?":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.level >= 101 ? true : achievement.status;
                break;
                }
            default:
                achievement.status = false; // false if no match
        }
    }
}

function progFunc() {
    for (let i = 0; i < achievements[2].length; i++) {
        const achievement = achievements[2][i];
        switch (achievement.name) {
            case "First Steps":
                if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Pogger":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Merge Maniac":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Merge Monster":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Merge Master":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "God":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Granter":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Achiever":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Successor":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Victor":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Conqueror":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Dragon Lord":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Above All":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Zeno":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Completionist":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Secret Achiever":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            case "Platinum Trophy":
            if (achievement.status == true) {
                    break;
                } else {    
            // untracked ? true : achievement.status;
                break;
                }
            default:
                achievement.status = false; // false if no match
        }
    }
}

function econFunc() {
    for (let i = 0; i < achievements[3].length; i++) {
        const achievement = achievements[3][i];
        switch (achievement.name) {
            case "69":
                if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.score == 69 ? true : achievement.status;
                break;
                }
            case "420":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.totalSold >= 420 ? true : achievement.status;
                break;
                }
            case "Wealthy":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.score >= 1000 ? true : achievement.status;
                break;
                }
            case "Rich":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.score >= 1000000 ? true : achievement.status;
                break;
                }
            case "Elon":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.score >= 100000000 ? true : achievement.status;
                break;
                }
            case "Entrepreneur":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.income >= 2000 ? true : achievement.status;
                break;
            }
            case "Tycoon":
            if (achievement.status == true) {
                    break;
                } else {
                achievement.status = userdata.income >= 10000 ? true : achievement.status;
                break;
                }
            case "Pawn Broker":
            if (achievement.status == true) {
                    break;
                } else {    
            achievement.status = userdata.income >= 50000 ? true : achievement.status;
                break;
                }
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
                if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Chicken Jockey!":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "An Ender Pearl":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Soda Pop":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Sus":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Elden Lord":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "1% of My Power":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Ultimate Despair":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Shaw!":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Uhhh":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Reflection":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
            case "Mog Pog":
            if (achievement.status == true) {
                    break;
                } else {    
            //untracked ? true : achievement.status;
                break;
                }
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