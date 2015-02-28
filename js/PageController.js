function PageController(){
    var pv = new PageView();
    var _body = $("body");
    
    function _init(){
        pv.init();
        _bindOncaseSite();
        _triggerPermaLink();
    }

    function _triggerPermaLink(){
        var hash = window.location.hash;

        if(hash === null)
            return;

        hash = hash.substring(1);

        var indexHash = $(".boxes-container").children().map(
            function(){
                        return $(this)
                            .find(".project-title")
                            .attr("box-id");
                    }
        ).splice(0).indexOf(hash);

        if (indexHash<0)
            return;

        _disableMainPage(hash);

    }
    
    function _bindOncaseSite(){
        $(".oncase-logo-footer").click(function(){
            window.open("http://onca.se");
        });
    }
    
    function _createOverlay(boxId){
        var overlay = '';
        var burl = "/box/"+boxId;
        console.log(burl);
        NProgress.start();
        $.ajax({
            url:burl,
            type:'GET',
            dataType : 'html'
        }).done(function(res){
            overlay = res;
            _body.append(overlay);
            $(".pg-overlay-close").unbind()
            .click(_enableMainPage);
        }).always(function(){
            NProgress.done();
        });
        
        
    }
    
    function _removeOverlay(){
        $(".pg-overlay").remove();
    }
    
    function _disableMainPage(title){
        _body.addClass("disabled");
        window.location.hash=title;
        _createOverlay(title);
    }
    function _enableMainPage(){
        window.location.hash="";
        _removeOverlay();
        _body.removeClass("disabled");
    }
    
    function _openBoxDetail(){
        
    }
    
    return {
        init : _init,
        enableMainPage : _enableMainPage,
        disableMainPage : _disableMainPage
    };
    
}