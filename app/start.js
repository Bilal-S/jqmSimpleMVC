/**
 * This is the application start sequence
 * The start module requires jquerymobile, which in turn requires jquery. RequireJS will load the dependecies for us
 * since we declared the jquerymobile shim in config.js with the dependencies.
 *
 * The start.js module also acts as our main controller for the application
 *
 */


define(['jquerymobile'],
    function(jqm) {


        //jqm ajax loading of pages
        $.mobile.ajaxEnabled = true;
        $.mobile.linkBindingEnabled = true;

        //find and init toolbars that are external to pages and thus do not get auto-initialized
        $("[data-role='header'], [data-role='footer']" ).toolbar();
        //if you use a footer set theme for footer toolbars now 
        //$( "[data-role='footer']" ).toolbar({ theme: "b" });



        /*
        This is where our main magic happens
        We declare the following conventions:
        - for each "UI" page loaded, we will automatically load the controller module located in controllers path
            - for each loaded module
                - we will look for init() function and call it EVERY TIME we switch to that page
        - You should have a private function for attaching events in your controller module. Make sure you only attach events once, e.g. check
          before attaching things again.

        */

        $(document ).on( "pagecontainerchange", function() {

            //our requirement is that data-title is defined for all pages, we will automatically extract it
            var currentPage = $( ".ui-page-active" ).jqmData( "title" );
            var controllerCode = $.mobile.activePage[0].id + "_controll"; //we use the id as the convention for control code
            //we log everytime we change pages and load controllers. Something like this should be removed in production.
            console.log("pagechange:" + controllerCode);
            // Change the header
            $("[data-role='header'] h1" ).text( currentPage );

            //load page controller based on which controller or page title data-controller avoid preinit and info pages
            if (controllerCode != "preinit_controll" && controllerCode != "info_controll") {

                requirejs(['controllers/' + controllerCode],
                       function(cntrlHandle) {
                            console.info("loading controller: " + controllerCode);
                            // if we have an init invoke it
                            if (typeof cntrlHandle.init === "function") {
                              cntrlHandle.init();  //initialize controller init function
                            }
                        },
                        //error loading handler function for require
                        function(err) {
                            console.warn("could not load controller module for pageId: " + controllerCode);
                            //err.message has require message on most likely a 404 error
                        }
                ) //end of require
            }

        });


    }
);

console.log("start complete" );
