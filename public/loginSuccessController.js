angular.module('mainApp').controller('loginSuccessController', function($scope, $rootScope) {

    $rootScope.$broadcast('reloadController')



});