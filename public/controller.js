angular.module('mainApp').controller('mainController', function($scope, mainService, $state) {

    $scope.loginStatus = false;

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        $scope.loginStatus = false;
        console.log($scope.loginStatus)
        $state.go('home');

       
    }

    $scope.loginStatus = sessionStorage.getItem('user') ? true : false;

    $scope.$on('reloadController', function() {
        console.log('Something is happening')
        $scope.loginStatus = sessionStorage.getItem('user') ? true : false;
   })


   //jQuery for navbar
   $(document).ready(function(){


    
                var dropDownDisplayed = false;



                // jQuery methods go here...
                $(".fa-bars").click(function(){
                    console.log('running ', dropDownDisplayed)
    
                        if ( dropDownDisplayed == false) {
                            $("#links").css("display", "flex");
                            dropDownDisplayed = true;
                            console.log('dropdown displayed?', dropDownDisplayed);
                        }
                        else if (dropDownDisplayed == true) {
                            $("#links").css("display", "none");
                            dropDownDisplayed = false;
                            console.log('dropdown displayed?', dropDownDisplayed);                            
                        }    
                    });

                function menuChecker() {
                    if ($scope.loginStatus !== true && $(window).width()<=1024){
                        $("#links").css("top", "140px");
                    }
                    else if ($scope.loginStatus == true && $(window).width()<=1024){
                        $("#links").css("top", "240px");
                    }  
                }

                $(".fa-bars").click(function(){

                    menuChecker();
                    // if ($scope.loginStatus !== true && $(window).width()<=1024){
                    //     $("#links").css("top", "140px");
                    // }
                    // else if ($scope.loginStatus == true && $(window).width()<=1024){
                    //     $("#links").css("top", "240px");
                    // }  
                })   

                $("#links, a").click(function(){
                    if (dropDownDisplayed == true && $(window).innerWidth()<= 1024) {
                        $("#links").css("display", "none");
                        dropDownDisplayed = false;
                        console.log('dropdown displayed?', dropDownDisplayed);  
                    } 
 
                 });

                
    
                $(window).resize(function() {
                    console.log('window.innerwidth', window.innerWidth)
                    if (window.innerWidth > 1024 || dropDownDisplayed == true) {
                        $("#links").css("display", "flex");
                    } else {
                        $("#links").css("display", "none");
                    }
                });
    
                // dropdown menu while loggedout
                 
                    // if ($scope.loginStatus !== true && $(window).width()<=1024){
                    //     $("#links").css("top", "140px");
                    // }    
                   
                // dropdown menu while loggedin
                
                    // if ($scope.loginStatus == true && $(window).width()<=1024){
                    //     $("#links").css("top", "240px");
                    // }    
                
    
                });

   


});