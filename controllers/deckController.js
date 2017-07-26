module.exports = {
    getDecks: function(req, res) {
        var dbInstance = req.app.get('db');
        var user_id = req.params.id;

        dbInstance.get_decks([user_id]).then(response => {
            console.log(response);
            res.send(response);
        })
    }
}