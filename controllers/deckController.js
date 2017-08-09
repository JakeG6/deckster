module.exports = {
    getDecks: function(req, res) {
        var dbInstance = req.app.get('db');
        var user_id = req.params.id;

        dbInstance.get_decks([user_id]).then(response => {
            console.log(response);
            res.send(response);
        })
    },

    updateDeck: function(req, res) {
        console.log('this is req.body.deck', req.body)
        //req.body has on it whatever you pass in 'data' from angular
        var dbInstance = req.app.get('db');
        var user_id = req.params.id;
        dbInstance.update_deck([req.body.id, req.body.name, req.body.deck_notes, req.body.deck_list]).then(response => {
            console.log('this is our response', response);
            res.send(response);
        })
    },

     createDeck: function(req, res) {
        console.log('this is req.body.deck', req.body)
        //req.body has on it whatever you pass in 'data' from angular
        var dbInstance = req.app.get('db');
        dbInstance.create_deck([req.body.user_id, req.body.name, req.body.deck_notes, req.body.deck_list]).then(response => {
            console.log('this is our response', response);
            res.send(response);
        })
    }

}