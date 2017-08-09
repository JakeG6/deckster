angular.module('mainApp').controller('homeController', function($scope, mainService, $state) {
  
    $scope.login = function() {
        mainService.login()
    }

});