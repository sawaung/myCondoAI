(function () {
    var oWebViewInterface = window.nsWebViewInterface;
    var load = false;
    
    function addNativeMsgListener() {
        oWebViewInterface.on('loadLanguages', function (arrLanguages) {
            //this on method is used to pass data from Natvescript to webView
        });
    }
    
    /**
     * Defines global functions which will be called from andorid/ios
     */
    function defineJavaScriptFunctions(){

        window.getDescription = function() {
            return $('#summernote').summernote('code');
        }
        window.insertDescription = function(description) {
            $('#summernote').summernote('pasteHTML', description);
            load = true;
        }

        window.documentHeight = function () {
            return Math.max(
                window.innerHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight
            );
        }

        window.sendWebViewChanges = function(para){
            oWebViewInterface.emit('webviewChanged', para);
        }
        /*document.getElementById('#summernote').onkeypress = function( e ) {
            var evt = e || window.event;
            console.log(String.fromCharCode( evt.which ));
        }​*/

        /*window.bind = function(){
            $('div.note-editable.panel-body').bind( "contentchange", function(){
                console.log("content change");
            });
        }*/

      /*$('#summernote').bind('DOMNodeInserted DOMNodeRemoved', function() {
        console.log("content change");
        });
        */
       /* $("body").on('DOMSubtreeModified', "#summernote", function() {
            console.log("content change");
        });
        */


    }

    
    

    function init() {
       
        //addNativeMsgListener();
        defineJavaScriptFunctions();
        $(document).ready(function() {
           // $("body").css("background-color","blue");
            $('#summernote').summernote({
                //minHeight: 250,
                zindex:100 
            });
          
              /*$('div.note-editable.panel-body').bind('DOMNodeRemoved', function() {
                  //console.log("isLoad " + load);
                    //console.log("content change" + $( this).height());   
                    
                    if(load){
                        var mmHeight = parseInt($( this).height());
                        //sendWebViewChanges(mmHeight);
                    }
                  
              });*/
             
           
          }
        );
       
    }


    init();

})();