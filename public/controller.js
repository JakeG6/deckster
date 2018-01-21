angular.module('mainApp').controller('mainController', function($scope, $rootScope, mainService, $state) {

    $scope.loginStatus = false;

    $scope.logout = function() {
        sessionStorage.removeItem('user');
        $scope.loginStatus = false;
        console.log($scope.loginStatus)
        $state.go('home');
        $rootScope.$emit("checkMenu");
    }




    $scope.loginStatus = sessionStorage.getItem('user') ? true : false;

    $scope.$on('reloadController', function() {
        console.log('Something is happening')
        $scope.loginStatus = sessionStorage.getItem('user') ? true : false;
        menuChecker();
   })

   //jQuery for navbar 
   $(document).ready(function(){

                menuChecker();

                $rootScope.$on("checkMenu", menuChecker);

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

                $("#links, a").click(function(){
                    if (dropDownDisplayed == true && $(window).innerWidth()<= 1024) {
                        $("#links").css("display", "none");
                        dropDownDisplayed = false;
                        // console.log('dropdown displayed?', dropDownDisplayed);  
                    } 
                 });
                
    
                $(window).resize(function() {
                    // console.log('window.innerwidth', window.innerWidth)
                    menuChecker();
                    if (window.innerWidth > 1024 || dropDownDisplayed == true) {
                        $("#links").css("display", "flex");
                        
                    } else {
                        $("#links").css("display", "none");
                    }
                });            
    
    });

    function menuChecker() {
        if ($scope.loginStatus == true && $(window).width()<=1024){
            $("#links").css("top", "240px");
            console.log("It's actually doing something");
        }
        else { $("#links").css("top", "140px"); }
    }  

});