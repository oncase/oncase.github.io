function BoxesView(){
    
	var _boxSel = ".box";
	var _boxContentSel = ".content-wrapper";
	var _boxMobileButtonSel = ".touch-more";
    var _boxHoverClass = "content-wrapper-hover";
    var _boxDescrSel = ".project-description";
    var _boxTitleSel = ".project-title";
    
    function _bindEvents(){
        
		$(_boxSel).on('mouseenter', function(e) {
			e.preventDefault();
			$(this).find(_boxContentSel)
				.addClass(_boxHoverClass);

		}).on('mouseleave', function(e) {
			e.preventDefault();
			$(this).find(_boxContentSel)
				.removeClass(_boxHoverClass);
		});

		$(_boxMobileButtonSel).on("touchstart", function(e) {
			e.preventDefault();
			var wrapper = $(this).parent().parent();

			if (wrapper.hasClass(_boxHoverClass)) {
				wrapper.removeClass(_boxHoverClass);
			} else {
				wrapper.addClass(_boxHoverClass);
			}
		});
        
        $(_boxDescrSel).click(function(){
            _callDetails($(this));
        });
        
        $(_boxTitleSel).click(function(e){
            var title = $(this);
            if(event.target === this){
                
                if(title.parent().css("top") === "-217px" ||
                   title.parent().css("top") === "-202px")
                    _callDetails(title);
            }
            else{
                console.log("something else within parent was clicked and is ingored...");
            }
        });
    }   
                              
    function _callDetails(obj){
        var title = obj.parent()
                        .find(".project-title").attr('box-id').trim();
            page.disableMainPage(title);
    }
    
    function _init(){
        _bindEvents();
    }
    
    return {
        init : _init
    };
}