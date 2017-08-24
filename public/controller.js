angular.module('mainApp').controller('mainController', function($scope, mainService, $state) {

    // $scope.loginStatus = 'Logout';
    $scope.loginStatus = false;

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        $scope.loginStatus = false;
        console.log($scope.loginStatus)
        $state.go('home');

       
    }

    console.log($scope.loginStatus);

    console.log('sessionStorage.getItemUser', sessionStorage.getItem('user'))
    $scope.loginStatus = sessionStorage.getItem('user') ? true : false;

    console.log($scope.loginStatus);


});