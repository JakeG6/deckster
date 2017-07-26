

angular.module('mainApp').controller('deckCollectionController', function($scope, mainService) {
  
    $scope.deckArray = [];

    $scope.retrieveDeckCollection = function() {
       return mainService.getDeckCollection();
       $scope.deckArray = user.userDecks;
    }

    $scope.retrieveDeckCollection();
    
   

});