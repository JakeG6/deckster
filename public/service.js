angular.module('mainApp').service('mainService', function($http, $state) {
  
    var userAccount = [];

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
            })
    }

    this.getCardByName = function(name) {
        console.log(11111, 'I am here');
        return $http({
            method: 'GET',
            url: 'https://api.magicthegathering.io/v1/cards?name=' + name + '&contains=imageUrl'
            })
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
    

    this.destroyDeck = function(id) {
       
        return $http({
            method: 'DELETE',
            url: 'api/users/decks/' + id,
        });



    }

    this.grabLoginSuccess = function() {
        return $http({
            method: 'GET',
            url: '/loginsuccess'
        }).then(function(response) {
            sessionStorage.setItem('user', JSON.stringify(response.data[0]))
                    // $state.go("the logged in state")
                    
                 
        })
    }

});