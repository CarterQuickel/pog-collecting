//const
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const session = require('express-session');
const fs = require('fs');
const csv = require('csv-parser');
 
const headers = [
    'id', 'name', 'color', 'code', 'number', 'code2',
    'description', 'type', 'rarity', 'creator'
];

crateRef = [
    {
        name: "simple crate",
        price: 100,
        rarities: [
            {
                name: "Trash",
                chance: 0.35
            },
            {
                name: "Common",
                chance: 0.7
            },
            {
                name: "Uncommon",
                chance: 0.15
            },
            {
                name: "Rare",
                chance: 0.1
            },
            {
                name: "Mythic",
                chance: 0.06
            },
        ]
    },
    {
        name: "big crate",
        price: 500,
        rarities: [
            {
                name: "Trash",
                chance: 0.0
            },
            {
                name: "Common",
                chance: 0.6
            },
            {
                name: "Uncommon",
                chance: 0.16
            },
            {
                name: "Rare",
                chance: 0.13
            },
            {
                name: "Mythic",
                chance: 0.11
            },
        ]
    },
    {
        name: "epic crate",
        price: 1000,
        rarities: [
            {
                name: "Trash",
                chance: 0.0
            },
            {
                name: "Common",
                chance: 0.4
            },
            {
                name: "Uncommon",
                chance: 0.27
            },
            {
                name: "Rare",
                chance: 0.21
            },
            {
                name: "Mythic",
                chance: 0.12
            },
        ]
    },
    {
        name: "risky crate",
        price: 10000,
        rarities: [
            {
                name: "Trash",
                chance: 0.0
            },
            {
                name: "Common",
                chance: 0.5
            },
            {
                name: "Uncommon",
                chance: 0.0
            },
            {
                name: "Rare",
                chance: 0.5
            },
            {
                name: "Mythic",
                chance: 0.0
            }
        ]
    },
    {
        name: "godly crate",
        price: 5000,
        rarities: [
            {
                name: "Trash",
                chance: 0.0
            },
            {
                name: "Common",
                chance: 0.4
            },
            {
                name: "Uncommon",
                chance: 0.0
            },
            {
                name: "Rare",
                chance: 0.0
            },
            {
                name: "Mythic",
                chance: 0.6
            }
        ]
    }
]

const results = [];
 
fs.createReadStream('pogipedia/db/pogs.csv')
    .pipe(csv({ headers }))
    .on('data', (row) => {
        const { name, rarity } = row;
        results.push({ name, rarity });
    })
    .on('end', () => {
    });
 
// API key for Formbar API access
const API_KEY = 'dab43ffb0ad71caa01a8c758bddb8c1e9b9682f6a987b9c2a9040641c415cb92c62bb18a7769e8509cb823f1921463122ad9851c5ff313dc24d929892c86f86a'
 
// URL to take user to Formbar for authentication
const AUTH_URL = 'https://formbeta.yorktechapps.com'; // ... or the address to the instance of fbjs you wish to connect to
 
//URL to take user back to after authentication
const THIS_URL = 'http://172.16.3.130:3000/login'; // ... or whatever the address to your application is
 
/* This creates session middleware with given options;
The 'secret' option is used to sign the session ID cookie.
The 'resave' option is used to force the session to be saved back to the session store, even if the session was never modified during the request.
The 'saveUninitialized' option is used to force a session that is not initialized to be saved to the store.*/
app.use(session({
    secret: 'youweremybrotheranakin',
    resave: false,
    saveUninitialized: false
}))
/* It is a good idea to use a Environment Variable or a .env file that is in the .gitignore file for your SECRET.
This will prevent it from getting out and allowing people to hack your cookies.*/
 
// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    console.log("Authenticating...");
    if (req.session.user) {
        const tokenData = req.session.token;
        try {
            // Check if the token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (tokenData.exp < currentTime) {
                throw new Error('Token has expired');
            }
            next();
        } catch (err) {
            res.redirect(`${AUTH_URL}/oauth?refreshToken=${tokenData.refreshToken}&redirectURL=${THIS_URL}`);
        }
    } else {
        res.redirect(`${AUTH_URL}/oauth?redirectURL=${THIS_URL}`);
    }
}
// The following isAuthenticated function checks when the access token expires and promptly retrieves a new one using the user's refresh token.
 
//set
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// user settings database
const usdb = new sqlite3.Database('usersettings.sqlite');
usdb.run(`CREATE TABLE IF NOT EXISTS userSettings (
    uid INTEGER PRIMARY KEY AUTOINCREMENT,
    theme TEXT,
    score INTEGER,
    inventory TEXT,
    Isize INTEGER,
    xp INTEGER,
    maxxp INTEGER,
    level INTEGER,
    income INTEGER,
    totalSold INTEGER,
    cratesOpened INTEGER,
    pogamount INTEGER,
    achievements TEXT,
    mergeCount INTEGER,
    highestCombo INTEGER,
    wish INTEGER,
    crates TEXT,
    displayname TEXT UNIQUE
 
)`);
 
// pog database
const pogs = new sqlite3.Database("pogipedia/db/pog.db", (err) => {
    if (err) {
        console.error("Error connecting to pog database:", err.message);
    } else {
        console.log("Connected to pog database.");
    }
});
 
let pogCount = 0;
//show many pogs there are
pogs.get(`SELECT COUNT(*) AS count FROM pogs`, (err, row) => {
    if (err) {
        console.error("Error counting pogs:", err.message);
    } else {
        console.log(`Pog database contains ${row.count} pogs.`);
        pogCount = row.count;
    }
});
 
// home page
app.get('/collection', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('collection', { userdata: req.session.user, maxPogs: pogCount, pogList: results });
});
 
// login route
app.get('/', isAuthenticated, (req, res) => {
    try {
        function insertUser() {
 
            const displayName = req.session.user.displayName;
 
            usdb.get(`SELECT uid FROM userSettings WHERE displayname = ?`, [displayName], (err, row) => {
                if (err) {
                    return console.error("Error querying user:", err.message);
                }
                if (row) {
                    console.log(`User '${displayName}' already exists with uid ${row.uid}`);
                    return;
                } else {
                    usdb.run(`INSERT INTO userSettings (theme, score, inventory, Isize, xp, maxxp, level, income, totalSold, cratesOpened, pogamount, achievements, mergeCount, highestCombo, wish, crates, displayname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            req.session.user.theme,
                            req.session.user.score,
                            JSON.stringify(req.session.user.inventory),
                            req.session.user.Isize,
                            req.session.user.xp,
                            req.session.user.maxxp,
                            req.session.user.level,
                            req.session.user.income,
                            req.session.user.totalSold,
                            req.session.user.cratesOpened,
                            req.session.user.pogamount,
                            JSON.stringify(req.session.user.achievements),
                            req.session.user.mergeCount,
                            req.session.user.highestCombo,
                            req.session.user.wish,
                            JSON.stringify(req.session.user.crates),
                            displayName
                        ],
                        function (err) {
                            if (err) {
                                return console.error("Error inserting user:", err.message);
                            }
                            console.log(`User '${displayName}' inserted with rowid ${this.lastID}`);
                        });
                }
            });
        }
 
        // add variable references here
        req.session.user = {
            displayName: req.session.token?.displayName || "guest",
            theme: req.session.user.theme || 'light',
            score: req.session.user.score || 0,
            inventory: req.session.user.inventory || [],
            Isize: req.session.user.Isize || 3,
            xp: req.session.user.xp || 0,
            maxxp: req.session.user.maxxp || 15,
            level: req.session.user.level || 1,
            income: req.session.user.income || 0,
            totalSold: req.session.user.totalSold || 0,
            cratesOpened: req.session.user.cratesOpened || 0,
            pogamount: req.session.user.pogamount || 0,
            achievements: req.session.user.achievements || [],
            mergeCount: req.session.user.mergeCount || 0,
            highestCombo: req.session.user.highestCombo || 0,
            wish: req.session.user.wish || 0,
            crates: req.session.user.crates || crateRef
        };

        // load user data from database
        const displayName = req.session.token?.displayName || "guest";
        usdb.get(`SELECT * FROM userSettings WHERE displayname = ?`, [displayName], (err, row) => {
            if (err) {
                return console.error("Error querying user:", err.message);
            }
            if (row) {
                req.session.user = {
                    displayName: displayName,
                    theme: row.theme,
                    score: row.score,
                    inventory: JSON.parse(row.inventory),
                    Isize: row.Isize,
                    xp: row.xp,
                    maxxp: row.maxxp,
                    level: row.level,
                    income: row.income,
                    totalSold: row.totalSold,
                    cratesOpened: row.cratesOpened,
                    pogamount: row.pogamount,
                    achievements: JSON.parse(row.achievements),
                    mergeCount: row.mergeCount,
                    highestCombo: row.comboHigh,
                    wish: row.wish,
                    crates: JSON.parse(row.crates)
                };
                console.log(`User data loaded for '${displayName}'`);
            } else {
                req.session.user = {
                    displayName: displayName,
                    theme: 'light',
                    score: 0,
                    inventory: [],
                    Isize: 3,
                    xp: 0,
                    maxxp: 100,
                    level: 1,
                    income: 0,
                    totalSold: 0,
                    cratesOpened: 0,
                    pogamount: 0,
                    achievements: [],
                    mergeCount: 0,
                    highestCombo: 0,
                    wish: 0,
                    crates: crateRef
                };

                console.log(`No existing user data for '${displayName}', using defaults.`);
            }
            // Call insertUser and handle callback
            insertUser();
            res.render('collection.ejs', { userdata: req.session.user, token: req.session.token, maxPogs: pogCount, pogList: results });
        });
    } catch (error) {
        res.send(error.message)
    }
});
 
// patch notes page
app.get('/patch', (req, res) => {
    res.render('patch', { userdata: req.session.user, maxPogs: pogCount, pogList: results });
});
 
app.get('/achievements', (req, res) => {
    res.render('achievements', { userdata: req.session.user, maxPogs: pogCount, pogList: results });
});
 
app.get('/leaderboard', (req, res) => {
    usdb.all(
        'SELECT * FROM userSettings ORDER BY score DESC LIMIT 10', [],
        (err, rows) => {
            if (err) {
                console.error('DB select error:', err);
            }
            console.log('Leaderboard data retrieved:', rows);
            res.render('leaderboard', { userdata: req.session.user, maxPogs: pogCount, pogList: results, scores: rows });
        }
    );
});
 
app.get('/api/leaderboard', (req, res) => {
    usdb.all('SELECT displayname, score FROM userSettings ORDER BY score DESC LIMIT 100', [], (err, rows) => {
        if (err) {
            console.error('API leaderboard error', err);
            return res.status(500).json({ error: 'db' });
        }
        res.json(rows || []);
    });
});
 
// save data route
app.post('/datasave', (req, res) => {
    console.log(req.body);
    const userSave = {
        theme: req.body.lightMode ? 'light' : 'dark',
        score: req.body.money,
        inventory: req.body.inventory,
        Isize: req.body.Isize,
        xp: req.body.xp,
        maxxp: req.body.maxXP,
        level: req.body.level,
        income: req.body.income,
        totalSold: req.body.totalSold,
        cratesOpened: req.body.cratesOpened,
        pogamount: req.body.pogAmount,
        achievements: req.body.achievements,
        mergeCount: req.body.mergeCount,
        highestCombo: req.body.highestCombo,
        wish: req.body.wish,
        crates: req.body.crates
    }
 
 
    console.log(userSave.theme);
    // save to session
    req.session.save(err => {
        if (err) {
            console.error('Error saving session:', err);
            return res.status(500).json({ message: 'Error saving session' });
        } else {
            const params = [
                userSave.theme,
                userSave.score,
                JSON.stringify(userSave.inventory),
                userSave.Isize,
                userSave.xp,
                userSave.maxxp,
                userSave.level,
                userSave.income,
                userSave.totalSold,
                userSave.cratesOpened,
                userSave.pogamount,
                JSON.stringify(userSave.achievements),
                userSave.mergeCount,
                req.session.user.highestCombo,
                userSave.wish,
                JSON.stringify(userSave.crates),
                req.session.user.displayName
            ]
            usdb.run(`UPDATE userSettings SET theme = ?, score = ?, inventory = ?, Isize = ?, xp = ?, maxxp = ?, level = ?, income = ?, totalSold = ?, cratesOpened = ?, pogamount = ?, achievements = ?, mergeCount = ?, highestCombo = ?, wish = ?, crates = ? WHERE displayname = ?`, params, function (err) {
                if (err) {
                    console.error('Error updating user settings:', err);
                    return res.status(500).json({ message: 'Error updating user settings' });
                }
                console.log(`User settings updated for ${req.session.user.displayName}`);
                req.session.user = { ...req.session.user, ...userSave };
                return res.json({ message: 'Data saved successfully' });
            });
        }
    });
});
 
// login page
app.get('/login', (req, res) => {
    if (req.query.token) {
        let tokenData = jwt.decode(req.query.token);
        req.session.token = tokenData;
        req.session.user = {
            displayName: tokenData.displayName,
            theme: tokenData.theme || 'light',
            score: tokenData.score || 0,
            inventory: tokenData.inventory || [],
            Isize: tokenData.Isize || 3,
            xp: tokenData.xp || 0,
            maxxp: tokenData.maxxp || 100,
            level: tokenData.level || 1,
            income: tokenData.income || 0,
            totalSold: tokenData.totalSold || 0,
            cratesOpened: tokenData.cratesOpened || 0,
            pogamount: tokenData.pogamount || 0,
            achievements: tokenData.achievements || [],
            mergeCount: tokenData.mergeCount || 0,
            highestCombo: tokenData.highestCombo || 0,
            wish: tokenData.wish || 0,
            crates: tokenData.crates || crateRef
        };

        res.redirect('/');
    } else {
        res.redirect(`${AUTH_URL}?redirectURL=${THIS_URL}`);
    };
});
 
//listens
app.listen(3000, () => {
    console.log('Server started on port 3000');
});