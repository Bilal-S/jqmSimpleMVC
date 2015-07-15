/**
 * This abstracts jQuery http ajax calls and uses blocking calls
 */
define(['jquery'],
    function ($) {
        //private implementation of module


        /**
         * this function will handle errors in communication
         */
        var fncErrorHandler = function (err) {
            console.error("There was an error in web call");
            console.error(err);
            alert("There was an error in processing your request, please try again later");
        };

        /**
         * simplified http call not async. Only provide url, default error handling and clean up
         * if jsonp is desired the url should have a callback=? attribute
         * @param gourl
         */
        var fncBlockingGetHttp = function (gourl) {
            var callResult = "";
            //make blocking ajax call
            $.mobile.loading("show");
            $.ajax( {url:gourl,
                     type:"GET",
                     dataType: "json",
                     data: callResult,
                     async: false
                    } )
            .done(function(callData) {
                //do nothing here we do not do any further processing
                //since this is a blocking call we just want to return data
                var a=2;
                callResult = callData;
            })
            .fail(function(err) {
                fncErrorHandler(err);
            })
            .always(function() {
                $.mobile.loading("hide");
                console.log( "ajax complete:" + this.url );
            });


            return callResult;
        }

    //public interface
    return  {
                /**
                 * simplified http call not async. Only provide url, default error handling and clean up
                 * @param url
                 */
                blockingGetHttp: function(url) {
                     return fncBlockingGetHttp(url);
                }
	}
});