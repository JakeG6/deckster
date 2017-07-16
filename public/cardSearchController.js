angular.module('mainApp').controller('cardSearchController', function($scope, mainService) {
  
    $scope.getCard = function(id) {
        console.log('aloha', id)
        mainService.getCardById(id).then(function(card){
            $scope.displayedCard = card;
            
        })
    };

});