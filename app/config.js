/**
 * This is the configuration file for require application definition
 * After the configuration has been defined we will start the application itself by loading the start module
 * All path definitions should use relative notation, e.g. do not start with backslash
 */

//this is the configuration file that we use for require.

    console.log("requireJs configuration file is beeing loaded");



    requirejs.config({
        app_name: "simpleApp",
        baseUrl:"app",

        paths : {
            /*libs*/
            'jquery': '../libs/jquery-2.1.1.min',
            'jquerymobile': '../libs/jquery.mobile-1.4.5',
            /*requirejs-plugins*/
            'text': '../libs/text',
            /* defined the application */
            'controllers': '../../controllers',
            'data':'../../data',
            'stores':'../../stores',
            'services' : '../../services'

        },
        shim : {
            jquerymobile : {
                deps: ['jquery']
            },
            jquery: {
                exports: '$' //attaches jquery to well known dollar
            }
        }
    });


    //since jqm mobileinit is triggered immediatly it needs to be declared before loading of jqm so we do this here
    requirejs(['jquery'],
        function($) {

            $( document ).ready(function() {
                console.log( "jquery detects dom ready!" );

                //jquery mobile ready
                $(document).on("mobileinit", function() {
                    console.log("jqm mobile init completed");
                    //put all jqm specific config stuff here
                    //keep pages in cache
                    $.mobile.page.prototype.options.domCache = true;

                });
            });

    });



    //now lets start the application by loading the start module
    requirejs(['start'],
        function(s) {
            //switch to main content page
            console.log("infra complete --> passing focus to app.");

            //turn off invisibility of initial page content
            $("#mainWrapper").removeClass( "invisible" );

            //go to main page now
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "app/pages/main.htm", { showLoadMsg: true } );

        }
    )




