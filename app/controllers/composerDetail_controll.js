//Movie Detail controller
define(["stores/ComposersDataStore"],
    function(composerStore) {
    var composerData = composerStore.getSelectedComposer();


    /**
     * fill in the selected composer details
     */
    var fncFillInfo = function() {
        composerData = composerStore.getSelectedComposer();
        
        $("#composerName").html(composerData.name);
        $("#composerDescription").html(composerData.synopsis);
        $("#composerImage").attr("src", composerData.imageUrl);

    }

    /**
     * handle Wiki link click we do this in this fashion to enable PhoneGap to open new window
     * a simple anchor tag does not work correctly
     */
    var fncWikiClickHandler = function(btnEvent) {
        composerData = composerStore.getSelectedComposer();
        window.open(composerData.moreURL,"_blank");        
    }

    /**
     * attach all the events for this controller
     */
    var fncAttachEvents = function () {
        //attach click events function if not already attached
        if (!($.hasData( btnWiki )) ) {
            $("#btnWiki").click(fncWikiClickHandler);
        };
    }

    /**
     * flip header buttons
     */
    var fncFlipHeaderButtons = function () {
        //make home visible
        $("#btnHome").removeClass("invisible");
        /*change incon and target for info
        var btnInfo = $("#btnInfo");
        btnInfo.removeClass('ui-icon-info');
        btnInfo.addClass('ui-icon-arrow-l');
        btnInfo.attr('href','');
        btnInfo.attr('data-rel','back');
        btnInfo.attr('data-transition','slide');
        btnInfo.attr('title','return to previous screen');
        */
    }


    //public functions defined in return
    return  {
            init: function() {
                    //redraw composer detail
                    fncFillInfo();

                    //add event handlers for this controller
                    fncAttachEvents();

                    //make header button changes
                    fncFlipHeaderButtons();

            } // end of init
    } //end of return

});
