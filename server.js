var express = require('express');
var session = require('express-session');
var app = express();
var cors = require('cors');
var massive = require('massive');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var deckController = require('./controllers/deckController');

var connectionString = 'postgres://jake@localhost/deckster';

massive(connectionString).then(dbInstance => app.set('db', dbInstance));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.listen(8000, function(){
    console.log('listening on port 8000');
})

const passport = require('passport');
//require facebook strategy
const FacebookStrategy = require('passport-facebook').Strategy;
//require passport strategy
const LocalStrategy = require('passport-local').Strategy;

app.use(session({ secret: 'some-random-string' }));
app.use(passport.initialize());
app.use(passport.session())

//GIANT FACEBOOK STRATEGY
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

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#!/loginsuccess',  // some url
    failureRedirect: '/#!/loginfailure', // some url
}));

app.get('/loginSuccess', function(req, res, next) {
    res.send(req.user)
})

app.get('/api/users/:id/decks', deckController.getDecks);
app.put('/api/users/:id/decks', deckController.updateDeck);
app.post('/api/users/:id/decks', deckController.createDeck);



app.get('/loginsuccess', function(req, res, next) {
    res.send(req.user)
})


//USERNAME AND PASSWORD STRATEGY

    passport.use(new LocalStrategy(
    function(username, password, done) {
            var dbInstance = app.get('db');

        dbInstance.get_user([username]).then( user => {

        // console.log("MAGIC", bcrypt.compareSync(password, user[0].password))
    //robbcobbruelz
    //password
        if (!user) { return done(null, false); }
        if (!bcrypt.compareSync(password, user[0].password)) { return done(null, false); }
        return done(null, user[0]);
        })
    }
    ));

    passport.serializeUser(function(user, done) {
    done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
    done(null, obj);
    });

    // endpoints

    app.post('/login', passport.authenticate('local', { failureRedirect: '/failure' }), function (req, res) {
    console.log("req.user", req.user)
    return res.send(req.user)
    })

    app.post('/signup', function(req, res) {
    var dbInstance = app.get('db');
    var hash = bcrypt.hashSync(req.body.password, 8);

    dbInstance.create_user([req.body.username, hash])
        .then(response => {
        console.log('this is response from signup', response)
        res.status(200).send(response)
        })
        .catch(error => {
        console.log('this is error in /signup', error)
        })
    })

    app.get('/failure', function(req, res) {
    console.log('is this working')
    res.send('failed')
    })



