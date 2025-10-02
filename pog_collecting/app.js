//const
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const session = require('express-session');

// API key for Formbar API access
const API_KEY = 'dab43ffb0ad71caa01a8c758bddb8c1e9b9682f6a987b9c2a9040641c415cb92c62bb18a7769e8509cb823f1921463122ad9851c5ff313dc24d929892c86f86a'

// URL to take user to Formbar for authentication
const AUTH_URL = 'http://localhost:420/oauth'; // ... or the address to the instance of fbjs you wish to connect to

//URL to take user back to after authentication
const THIS_URL = 'http://localhost:3000/login'; // ... or whatever the address to your application is

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
        res.redirect(`/login?redirectURL=${THIS_URL}`);
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
const usdb = new sqlite3.Database('./db/usersettings.db', (err) => {
    if (err) {
        console.error('Could not connect to settings database', err);
    } else {
        console.log('Connected to settings database');
    }
});

// home page
app.get('/collection', (req, res) => {
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('collection', { userdata: req.session.user });
});


// login route
app.get('/', isAuthenticated, (req, res) => {
    try {
        function insertUser() {

            const displayName = req.session.user.displayName;
            console.log(displayName);

            usdb.get(`SELECT uid FROM userSettings WHERE displayname = ?`, [displayName], (err, row) => {
                if (err) {
                    return console.error("Error querying user:", err.message);
                }
                if (row) {
                    console.log(`User '${displayName}' already exists with uid ${row.uid}`);
                    return;
                } else {
                    usdb.run(`INSERT INTO userSettings (theme, score, inventory, Isize, xp, maxxp, level, displayname) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            req.session.user.theme,
                            req.session.user.score,
                            JSON.stringify(req.session.user.inventory),
                            req.session.user.Isize,
                            req.session.user.xp,
                            req.session.user.maxxp,
                            req.session.user.level,
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
            maxxp: req.session.user.maxxp || 100,
            level: req.session.user.level || 1
        };
        console.log("Authenticated, hello " + req.session.user.displayName);

        // Call insertUser and handle callback
        insertUser();
        res.render('collection.ejs', { userdata: req.session.user, token: req.session.token });

    } catch (error) {
        res.send(error.message)
    }
});

// patch notes page
app.get('/patch', (req, res) => {
    res.render('patch', { userdata: req.session.user });
});

app.get('/achievements', (req, res) => {
    res.render('achievements', { userdata: req.session.user });
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
        level: req.body.level
    }
    req.session.save(err => {
        if (err) {
            console.error('Error saving session:', err);
            return res.status(500).json({ message: 'Error saving session' });
        }
    });
});

// login page
app.get('/login', (req, res) => {
    if (req.query.token) {
        let tokenData = jwt.decode(req.query.token);
        req.session.token = tokenData;
        req.session.user = { displayName: tokenData.displayName };
        res.redirect('/');
    } else {
        res.redirect(`${AUTH_URL}?redirectURL=${THIS_URL}`);
    };
});

//listens
app.listen(3000, () => {
    console.log('Server started on port 3000'); console.log('☆*: .｡. o(≧▽≦)o .｡.:*☆');
});