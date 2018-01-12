(function () {
    var oWebViewInterface = window.nsWebViewInterface;
    
    /**
     * Registers handlers for native events.
     */
    function addNativeMsgListener() {
        oWebViewInterface.on('loadLanguages', function (arrLanguages) {
            /*for (var i = 0; i < arrLanguages.length; i++) {
                addLanguageOption(arrLanguages[i]);
            }*/
            alert(arrLanguages);
        });
    }
    
    /**
     * Defines global functions which will be called from andorid/ios
     */
    function defineNativeInterfaceFunctions(){

    window.getvalue = function() {
       // document.getElementById("sn").innerHTML = $('#summernote').summernote('code');
        hello();
      }

      window.hello = function() {
        return document.getElementById("sn").innerHTML = $('#summernote').summernote('code');
      }
    }
    

    

    function init() {
        addNativeMsgListener();
        defineNativeInterfaceFunctions();
    }

    init();
})();