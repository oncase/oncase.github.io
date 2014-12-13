function PageController(){
    var pv = new PageView();
    var _body = $("body");
    
    function _init(){
        pv.init();
    }
    
    function _createOverlay(boxId){
        var overlay = '';
        
        $.ajax({
            url:"/box/"+boxId,
            type:'GET',
            dataType : 'html'
        }).done(function(res){
            overlay = res;
        });
        
        _body.append(overlay);
        $(".pg-overlay-close").unbind()
        .click(_enableMainPage);
    }
    
    function _removeOverlay(){
        $(".pg-overlay").remove();
    }
    
    function _disableMainPage(title){
        _body.addClass("disabled");
        _createOverlay(title);
    }
    function _enableMainPage(){
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