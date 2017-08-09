angular.module('mainApp').service('mainService', function($http, $state) {
  
    var userAccount = [];

    function Card(imageUrl, name, manaCost, cmc, colors, type) {
       
        this.imageUrl = imageUrl;
        this.name = name;
        this.manaCost = manaCost;
        this.cmc = cmc;
        this.colors = colors;
        this.type = type;

    }

    function User(username, password) {
        this.username = username;
        this.password = password
    }

    this.login = function() {
        return $http({
            method: 'GET',
            url: '/auth/facebook'
        }).then(function(response) {
            console.log("RESPONSE WOOO WOO WOO", response)
        })
    }

    this.createUser = function(username, password) {
        userAccount.push(new User(username, password));
    }

    this.getCardById = function(id) {
        console.log(11111, 'I am here')
        return $http({
            method: 'GET',
            url: 'https://api.magicthegathering.io/v1/cards/' + id
            }).then(function(response) {
                return new Card(
                    response.data.card.imageUrl,
                    response.data.card.name, 
                    response.data.card.manaCost,
                    response.data.card.cmc,
                    response.data.card.colors,
                    response.data.card.type);
            }, function (response) {
                alert('An Error');
            });
    }

    this.getCardByName = function(name) {
        console.log(11111, 'I am here')
        return $http({
            method: 'GET',
            url: 'https://api.magicthegathering.io/v1/cards/' + name
            }).then(function(response) {
                return new Card(
                    response.data.card.imageUrl,
                    response.data.card.name, 
                    response.data.card.manaCost,
                    response.data.card.cmc,
                    response.data.card.colors,
                    response.data.card.type);
            }, function (response) {
                alert('An Error');
            });
    }

    this.getCardById = function(id) {
        return $http({
            method: 'GET',
            url: 'https://api.magicthegathering.io/v1/cards/' + id
            }).then(function(response) {
                return new Card(
                    response.data.card.imageUrl,
                    response.data.card.name, 
                    response.data.card.manaCost,
                    response.data.card.cmc,
                    response.data.card.colors,
                    response.data.card.type);
            }, function (response) {
                alert('An Error');
        });
    }

    this.getDecks = function() {
        var userId = JSON.parse(sessionStorage.getItem('user')).id

        return $http({
            method: 'GET',
            url: 'api/users/' + userId + '/decks',
        });
    }

    this.saveDeck = function() {
        var userId = JSON.parse(sessionStorage.getItem('user')).id

        return $http({
            method: 'POST',
            url: 'api/users/' + userId + '/decks',
        });    
    }

    this.updateDeck = function(deck) {
        var userId = JSON.parse(sessionStorage.getItem('user')).id
        
        console.log('this is userId', userId);
        console.log(deck);
        
        return $http({
            method: 'PUT',
            url: 'api/users/' + userId + '/decks',
            data: deck
        });

    }

    this.createDeck = function(name, deckNotes, deckList) {
        
        var userId = JSON.parse(sessionStorage.getItem('user')).id;

        function Deck(name, user_id, deck_notes, deck_list) {
                this.name = name,
                this.user_id = user_id,
                this.deck_notes = deck_notes,
                this.deck_list = deck_list
        };
        
        console.log(Deck);

        return $http({
            method: 'POST',
            url: 'api/users/' + userId + '/decks',
            data: new Deck(name, userId, deckNotes, deckList)
        }).then(function(response, error) {
            // this callback will be called asynchronously
            // when the response is available
            if (error) {
                alert(`It did not work! ${error}`);
            }
            else {
                 $state.go('deckConfirm');
            }
           
            
            }
        )

    }

});