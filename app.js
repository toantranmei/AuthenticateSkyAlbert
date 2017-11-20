const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express(); 

app.use(express.static('public'));


app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.keySecret],
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, function() {
    console.log("Database connected!");
})

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', function(req, res) {
    res.render('home', {user: req.user});
})

app.listen(4100, () => {
    console.log('Server running on the port 4100!');
});