function PageView() {
    
    var boxes = new BoxesView();

	function _init() {
        boxes.init();
	};
    
    return {
        init : _init
    };
}