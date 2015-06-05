function PageController(){
    var pv = new PageView();
    var _body = $("body");
    
    function _init(){
        pv.init();
        _bindOncaseSite();
        _triggerPermaLink();
	_calculateLastUpdated();
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
            _body.keyup(
                    function(event) {
                            if (event.keyCode == 27) {
                                    page.enableMainPage();
                            }
                    }
            );

            if ($("#main_content").find("img").length > 0) {
                    $("#main_content img").on('load', function() {
                        NProgress.done();
                    });
            }else{
                NProgress.done();
            }

            //Include last updated:
            var _writeStandardDate = function(box) {
                console.log(box);
                console.log(box.lastUpdate);
                var date = new Date(box.lastUpdate);
                document.getElementsByClassName("lastUpdatedOverlay").item(0).textContent = 
                    "Last update on " + date.toLocaleString().split(" ").join(" at ");
            }
        
            var box = $.grep(boxes, function(box) {return box.id == boxId})[0];
            if (box.type == "git") {
                var params = box.repo.split("//")[1].split("/");
                var owner = params[1];
                var repo = params[2];
                $.ajax({
                    url: "https://api.github.com/repos/" + owner + "/" + repo + "/commits",
                    cache: false,
                    success: function(html){
                        var date = new Date(html[0]['commit']['committer']['date']);
                        document.getElementsByClassName("lastUpdatedOverlay").item(0).textContent = 
                            "Last update on " + date.toLocaleString().split(" ").join(" at ");
                    },
                    error: function() {
                        _writeStandardDate(box);
                    }
                });
            } else {
                _writeStandardDate(box);
            }
            //Finished code for including last udated

        }).always(function(){
            
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

    function _calculateLastUpdated() {
        var i;
        for (i = 0; i < boxes.length; i++) {
            if (boxes[i].type != "git") {
                continue;
            }
            var params = boxes[i].repo.split("//")[1].split("/");
            var owner = params[1];
            var repo = params[2];
            $.ajax({
                url: "https://api.github.com/repos/" + owner + "/" + repo + "/commits",
                cache: false,
                index: i,
                success: function(html){
                    var date = new Date(html[0]['commit']['committer']['date']);
                    document.getElementsByClassName("lastUpdated").item(this.index).firstChild.textContent = 
                        "Last update on " + date.toLocaleString().split(" ").join(" at ");
                },
                error: function() {
                    console.log(this.index);
                }
            });
        }
    }
    
    return {
        init : _init,
        enableMainPage : _enableMainPage,
        disableMainPage : _disableMainPage
    };
    
}
