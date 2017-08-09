angular.module('mainApp').controller('deckBuilderController', function($scope, mainService) {

    $scope.createDeck = function(name, deckNotes, deckList) {
        
        console.log("we hit createDeck() in controller");

        mainService.createDeck(name, deckNotes, deckList);
    }

});