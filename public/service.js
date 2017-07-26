angular.module('mainApp').service('mainService', function($http) {
  
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

    this.getDecks = function() {
        console.log('getting the deck collection from the user account');
        return $http({
            method: 'GET',
            url: '/api/user/1/decks'
      }  ).then(function(response) {
          console.log(1111111, reponse)
                return //user.userDecks;
                    
            }, function (response) {
        alert('An Error');
    });

    }

    



});