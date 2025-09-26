//const
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const session = require('express-session');

// let
let version = "0.0.2";

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

const db = new sqlite3.Database('./db/scores.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to database');
    }
});

// home page
app.get('/collection', (req, res) => {
    res.render('collection');
});

// login route
app.get('/', isAuthenticated, (req, res) => {
	try {
        console.log("Authenticated")
        // add variable references here
		res.render('collection.ejs', { user: req.session.user, token: req.session.token, version: version} );
	}
	catch (error) {
		res.send(error.message)
	}
});

// patch notes page
app.get('/patch', (req, res) => {
    res.render('patch');
});

// login page
app.get('/login', (req, res) => {
    if (req.query.token) {
         let tokenData = jwt.decode(req.query.token);
         req.session.token = tokenData;
         req.session.user = tokenData.displayName;
         res.redirect('/');
    } else {
         res.redirect(`${AUTH_URL}?redirectURL=${THIS_URL}`);
    };
});

//listens
app.listen(3000, () => {
    console.log('Server started on port 3000');
});