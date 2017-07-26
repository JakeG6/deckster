angular.module('mainApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '/views/home.html'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url:'/about',
            templateUrl: './views/about.html'      
        })
        
        .state('cardSearch', {
            url: '/cardsearch',
            templateUrl: './views/card-search.html'
        })
        
        .state('deckBuilder', {
            url: '/deckbuilder',
            templateUrl: './views/deck-builder.html'
        })
        
        .state('deckCollection', {
            url: '/deckcollection',
            templateUrl: './views/deck-collection.html'
        })
        .state('loginSuccess', {
            url: '/loginsuccess',
            templateUrl: './views/login-success.html',
            resolve: {
                promiseObj: function ($http) {
                    return $http({
                        method: 'GET',
                        url: '/loginsuccess'
                    })
                }
            },
            controller: function($scope, promiseObj) {
                console.log('$scope baby', $scope)
                if (promiseObj.data.id) {
                    console.log('in if statement')
                    localStorage.setItem('user', JSON.stringify(promiseObj.data.id))   
                }
            }
        })
        .state('loginFailure', {
            url: '/loginfailure',
            templateUrl: './views/login-failure.html'
        });

         $urlRouterProvider.otherwise('/');

});

