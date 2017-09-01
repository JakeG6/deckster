angular.module('mainApp').controller('deckCollectionController', function($scope, mainService, $state) {
  
    $scope.deckArray = [];

    $scope.getDecks = function() {
       mainService.getDecks().then(function(response) {
        $scope.decks = response.data;
       });
    }
    
    $scope.getDecks();

    $scope.updateDeck = function(deck) {
        console.log('updating deck in controller');
        mainService.updateDeck(deck);
    }

    $scope.destroyDeck = function(id) {
        console.log(id);
        mainService.destroyDeck(id).then(response => {
            $state.reload();
        });
    }

});