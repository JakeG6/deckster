angular.module('mainApp').controller('cardSearchController', function($scope, mainService) {
  
    $scope.getCard = function(searchInput) {
         
        console.log('$scope.selectedItem.label', $scope.selectedItem.label)
        if ($scope.selectedItem.label === 'Search By Multiverse ID') {
            mainService.getCardById(searchInput).then(function(response) {

                console.log('data from searching by ID: ',response.data);
                var returnedCards = response.data.card;
                var uniqueCards = [];
                console.log('the contents of returned cards: ', returnedCards);
                    
                        uniqueCards.push(returnedCards);
                    
                
                
                console.log('here are the unique cards: ', uniqueCards);
                $scope.displayedCards = uniqueCards;
                    
            })
            .catch(function (error) {
                alert('An Error', error)
            }); 
        }

        if ($scope.selectedItem.label === 'Search By Name') {
            var searchInput = searchInput.split(' ').join('+')
            mainService.getCardByName(searchInput).then(function(response) {

                console.log(response.data);
                var returnedCards = response.data.cards;
                var uniqueCards = [];
                console.log('the contents of returned cards: ', returnedCards);

                for (var card of returnedCards) {
                    var testedCard = card;
                    var uniqueName = true;

                    for (var uniqueCard of uniqueCards) {
        
                        if (testedCard.name === uniqueCard.name) {                            
                            uniqueName = false; 
                            break;
                        }
                    }
                    if (uniqueName) {
                        uniqueCards.push(testedCard);
                    }
                }
                
                console.log('here are the unique cards: ', uniqueCards);
                $scope.displayedCards = uniqueCards;
                    
            }) 
            .catch(function (error) {
                alert('An Error', error);
            });
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