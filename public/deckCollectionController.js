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
        console.log("you clicked save deck");
        console.log(deckSavedAlert);
        deckSavedAlert.style.opacity = 1;
        console.log("opacity is at 1")
        setTimeout( () => {deckSavedAlert.style.opacity = 0}, 2000);
    }

    $scope.destroyDeck = function(id) {
        console.log(id);
        mainService.destroyDeck(id).then(response => {
            $state.reload();
        });
    }

});