
    var hide_timer;
    var dragging_on_content = false;

document.addEventListener('DOMContentLoaded', function(){

    
    console.log('STUPID被执行了！');
    content_div = $("<div id = 'STUPID_content_div'>123</div>");
    content_div.css('position','fixed');
    content_div.css('height','100px');
    content_div.css('width','100px');
    content_div.css('top','0');
    content_div.css('left','0');
    content_div.css('z-index','99999999');
    content_div.css('background-color','red');
    content_div.hide();
    if (window.frames.length == parent.frames.length) {  


        $("html").append(content_div);
        $("body").click(function(){
            //$("#STUPID_content_div").toggle(200);
            
            
            
            
        });
        
        $("body").on("dragover",function(evt){
            //console.log(evt);
            //$("#STUPID_content_div").stop();
            //console.log($("#STUPID_content_div").queue().length)
            content_div.css("background-color","red");
            dragging_on_content = false;
            
            
            console.log(dragging_on_content);
            if(!content_div.queue().length)
                content_div.fadeIn(200);
            clearTimeout(hide_timer);
            hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    content_div.fadeOut(200);
            },1000);
            evt.preventDefault();
        });
 //       $("body").on("dragleave",function(evt){
 //           console.log(dragging_on_content)
 //
 //       });
        content_div.on("dragover",function(evt){
            content_div.css("background-color","gray");
            dragging_on_content = true;
            evt.preventDefault();
        });
        content_div.on("dragleave",function(evt){
            
            content_div.css("background-color","red");
            dragging_on_content = false;
            
/*             hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    content_div.fadeOut(200);
            },1500); */
            evt.preventDefault();
        });
        content_div.on("drop",function(evt){
            dt = evt.originalEvent.dataTransfer;
            dt = dt.getData('Text');
            content_div.html(dt);
            
            hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    content_div.fadeOut(200);
            },1500);
            evt.preventDefault();
        });
    }
});