$(document).ready(function(){

   var dropDownDisplayed = false;


   // jQuery methods go here...
   $(".fa-bars").click(function(){
       console.log('runnin ', dropDownDisplayed)
       
    
    // if ($("#links").css("display", "flex")) {
    //     $("#links").css("display", "none");
    // }
    // else {
        if ( dropDownDisplayed == false) {
             $("#links").css("display", "flex");
             dropDownDisplayed = true;
        }
        else if (dropDownDisplayed == true) {
            $("#links").css("display", "none");
            dropDownDisplayed = false;
            
        }    


        
    // }
    
   

   });

   $(window).resize(function() {
       console.log('window.innerwidth', window.innerWidth)
       if (window.innerWidth > 1024 || dropDownDisplayed == true) {
           $("#links").css("display", "flex");
       } else {
           $("#links").css("display", "none");
       }
   })

    



});