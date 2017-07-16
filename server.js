var express = require('express');
var session = require('express-session');
var app = express();

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
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#!/loginsuccess',  // some url
    failureRedirect: '/#!/loginfailure', // some url
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});






