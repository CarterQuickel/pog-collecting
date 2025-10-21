// Define the achievements array
const achievements = [
    //start of collection achievements
    [
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
    //start of economy achievements
    [
        {
            name: "69",
            description: "Have exactly 69 pogs at once.",
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
    //start of unique achievements
    [
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

window.achievements = achievements;