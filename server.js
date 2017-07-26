var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
var massive = require('massive');

var deckController = require('./controllers/deckController');

var connectionString = 'postgres://jake@localhost/deckster';

massive(connectionString).then(dbInstance => app.set('db', dbInstance));

app.use(cors());
app.use(express.static('public'));

app.listen(8000, function(){
    console.log('listening on port 8000');
})

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

app.use(session({ secret: 'some-random-string' }));

app.use(passport.initialize());

app.use(passport.session())

passport.use(new FacebookStrategy({
  clientID: '114712219164821',
  clientSecret: 'a15ddece0e0480422f0d0a4849115768',
  callbackURL: 'http://localhost:8000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
    var dbInstance = app.get('db');
    dbInstance.get_user_by_facebookid([profile.id]).then(user => {
        if (user && user.length && user[0].facebook_id === profile.id) {
            return done(null, user)
        } else {
            dbInstance.save_user([profile.id, profile.displayName]).then(response => {
                dbInstance.get_user_by_id([response[0].id]).then(user => {
                    return done(null, user[0])
                })
            })
        }
    })

}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#!/loginsuccess',  // some url
    failureRedirect: '/#!/loginfailure', // some url
}));

app.get('/api/users/:id/decks', deckController.getDecks);


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



app.get('/loginsuccess', function(req, res, next) {
    res.send(req.user)
})



