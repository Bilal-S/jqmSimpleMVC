/**
 * module to store and process composer data
 * (store, sort etc)
 */

define(
    function() {
        var composerData = [];
        var selectedComposer = 0;

    //getter and setters
    return  {
            /**
             * data setter
             * we are not doing an eloborate check on whether data is array and right format
             */
            setStore: function(userData) {
                composerData = userData;
                return true;
            },
            /**
             * global get, return all data as we have it
             */
            getStore: function() {
                return composerData;
            },
            /**
             * return all sorted by birthyear DESC
             */
            sortByDobDesc: function() {                
                //sort by youngest first
                composerData.composers.sort(function(a,b){
                   return b.born - a.born;
                });                
                return composerData;
            },
            /**
            * return all sorted by birthyear ASC
            */
           sortByDobAsc: function() {                
                //sort by oldest first
                composerData.composers.sort(function(a,b){
                   return a.born - b.born;
                });                
                return composerData;
            },
            /**
             * set the array index pointer to selected composer
             */
            setSelectedComposer: function(composerIndex) {
                selectedComposer = composerIndex;
                return true;
            },
            /**
             * return composer at selected index that has been set with prior call to setSelectedComposer
             */
            getSelectedComposer: function() {
                return composerData.composers[selectedComposer];
            },
            /**
             * return array of composer data at given index 
             */
            getComposer: function(composerIndex) {
                return composerData.composers[composerIndex];
            }
    }

});