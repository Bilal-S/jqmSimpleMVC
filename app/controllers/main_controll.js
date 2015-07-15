/**
 *  This is the controller for main.htm screen 
 * The controller modules have all the code including all event attachments and event processing.
 * In a larger app this would be the place when other service modules would be loaded and things would begin to be broken out.
 * we rely on simpleHttp
 */

define(["services/simpleHttp","stores/ComposersDataStore"],
    function (simpleHttp,composerStore) {
        //private implementation of main module
        var callCount=0;

        /**
         * flip header buttons
         */
        var fncFlipHeaderButtons = function () {
            //make home invisible since we are at the home screen
            $("#btnHome").addClass("invisible");
            //change incon and target for info
            var btnInfo = $("#btnInfo");
            btnInfo.removeClass('ui-icon-arrow-l');
            btnInfo.addClass('ui-icon-info');
            btnInfo.attr('href','#info');
            btnInfo.removeAttr('data-rel data-transition title');
        };
        
        /**
         * load the data from server we use a service layer module to make a synchronous call
         * however we could have done this through requireJs
         */
        var fncLoadComposers= function() {
            //switch screen 
            var outList = "<li><h2>Please Wait</h2><p>loading composers ...</p></li>";
            $("#cntrlMainList").html(outList);
            setTimeout('', 1000);  //intentional timeout to show the flip of the buttong
            
            //now load data
            var ComposerData = simpleHttp.blockingGetHttp("../data/composers.json");
            composerStore.setStore(ComposerData);       
            
            //process the composers into list
            composerStore.sortByDobDesc();
        };
        
        /**
         * display composers from the store. A display widget could be build to transform from a store to this format.
         */
        var fncDisplayComposers = function() {
            var composersArray = composerStore.sortByDobDesc().composers;
            var outList = "";
            var i=0;
            var composer="";           

            for (i = 0; i < composersArray.length; ++i) {
                composer = composersArray[i];
                outList += "<li class='ui-li-has-thumb'><a class='ui-btn ui-btn-icon-right ui-icon-carat-r' dataIndex='" + i + "'>";
                outList += "<img src='" + composer.imageUrl +   "'>";
                outList += "<h2>" + composer.name + "</h2>";
                outList += "<p>year of birth: " + composer.born + " </p></a>";
                outList += "</li>";
            };     
            
            //display 
            $("#cntrlMainList").html(outList);
            
            //attach events to all links on this page to go to composer detail display
            $('#cntrlMainList a').click(function(myClickArgs) {
                var arrIdx = myClickArgs.currentTarget.getAttributeNode("dataIndex").value;
                var pageTarget = "composerDetail.htm";
                                
                composerStore.setSelectedComposer(arrIdx); //assign the selected composer to store this is not a good process if many modules access the store.                 
                
                //using jqm loader and page switcher
                $( ":mobile-pagecontainer" ).pagecontainer( "change", pageTarget, { showLoadMsg: true, transition:"slide" } );
            });            
            
            
        };
        
        /**
         * attach all the events for this controller
         */
        var fncAttachEvents = function () {
            //attach click events function if not already attached (allways check this since we do not want to
            //attach and trigger anything multiple times)
            if ( $("#btnLoadComposers").length) {
                if (!($.hasData( btnLoadComposers )) ) {
                    $("#btnLoadComposers").click(fncLoadAndDisplay);
                };
            };

        };      
        
        /**
         * function calls the detail worker functions to load and display composers
         */    
        var fncLoadAndDisplay = function() {
            fncLoadComposers();
            fncDisplayComposers();
        };

    //public interface
    return  {
                //we need to put event bindings in the init function since on reload of page the module may be cached
                //and the constructor will not be called again.
                init: function() {
                        callCount++;
                        console.log("main controller INIT function called:" + callCount);

                        //flip buttons to normal state
                        fncFlipHeaderButtons();
                    
                        //register events
                        fncAttachEvents();
                }
	}
});