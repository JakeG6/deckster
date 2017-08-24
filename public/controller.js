angular.module('mainApp').controller('mainController', function($scope, mainService, $state) {

    $scope.loginStatus = false;

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        $scope.loginStatus = false;
        console.log($scope.loginStatus)
        $state.go('home');

       
    }

    $scope.loginStatus = sessionStorage.getItem('user') ? true : false;


});