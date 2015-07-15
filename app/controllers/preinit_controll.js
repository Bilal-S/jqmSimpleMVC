//Pre-init controller module
define(
    function() {

        console.info("completed loading of controller preinit");

        //now switch page
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "app/pages/main.htm", { showLoadMsg: true } );



    //public (exports) 
    return  {
                init: function() {
                    console.log("pre-init controller INIT function called")
                }

            }

});