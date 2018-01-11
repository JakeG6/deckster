angular.module('mainApp').controller('cardSearchController', function($scope, mainService) {
  
    $scope.getCard = function(searchInput) {
         
        console.log('$scope.selectedItem.label', $scope.selectedItem.label)
        if ($scope.selectedItem.label === 'Search By Multiverse ID') {
            mainService.getCardById(searchInput).then(function(card){
                $scope.displayedCard = card;
            })
        }

        if ($scope.selectedItem.label === 'Search By Name') {
            var searchInput = searchInput.split(' ').join('+')
            mainService.getCardByName(searchInput).then(function(card){
                console.log('card in controller', card)
                $scope.displayedCard = card;
            })
        }

    };

    $scope.items = [
        {
            label: 'Search By Name'
        },
        {
            label: 'Search By Multiverse ID'
        }
    ]

});