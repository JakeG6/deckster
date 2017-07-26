angular.module('mainApp').controller('mainController', function($scope, mainService, $state) {
  
    $scope.greeting = 'Hola!';
  
    $scope.planeswalker = 'planeswalker';

    console.log('localStorage.getItemUser', localStorage.getItem('user'))
    $scope.loginStatus = localStorage.getItem('user') ? 'Logout' : 'Login'


});