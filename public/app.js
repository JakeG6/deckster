angular.module('mainApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: '/views/home.html',
            controller: 'homeController'
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
            templateUrl: './views/deck-builder.html',
            controller: 'deckBuilderController'
        })
        
        .state('deckCollection', {
            url: '/deckcollection',
            templateUrl: './views/deck-collection.html',
            controller: 'deckCollectionController'
        })
        .state('loginSuccess', {
            url: '/loginsuccess',
            templateUrl: './views/login-success.html',
            resolve: {
                promiseObj: function ($http, $q, mainService) {
                    var deferred = $q.defer()
                    mainService.grabLoginSuccess().then(function(response) {
                        deferred.resolve()
                    })
                    return deferred.promise
                }
                
            }
        })
        .state('loginFailure', {
            url: '/loginfailure',
            templateUrl: './views/login-failure.html'
        })
        .state('deckConfirm', {
            url: '/deckconfirm',
            templateUrl: 'views/deck-confirm.html'
        });

         $urlRouterProvider.otherwise('/');

});

