
var hide_timer;
var dragging_on_content = false;




document.addEventListener('DOMContentLoaded', function(){

    
    console.log('STUPID被执行了！');
    content_div = $("<div></div>");
    content_div.addClass("injected_chrome_extention   ghost_drop");
    content_div.load(chrome.extension.getURL("/in_content/in_content.html"));
    
    
    
    content_div.hide();
    
/*     title_div = $("<div>Title</div>");
    title_div.addClass("title_div");
    
    prompt_div = $("<div>Prompt</div>");
    prompt_div.addClass("prompt_div");
    
    buttons_container_div = $("<div>Prompt</div>");
    buttons_container_div.addClass("buttons_container_div"); */
    
    //content_div.append(title_div).append(prompt_div);

    
    if (window.frames.length == parent.frames.length) {  


        $("html").append(content_div);
        $("body").click(function(){
            //$("#STUPID_content_div").toggle(200);
            
            
            
            
        });
        
        $("body").on("dragover",function(evt){
            //console.log(chrome.extension.getURL("123"));
            //prompt_div.html("拖至边栏");
            content_div.removeClass("active");;
            dragging_on_content = false;
            
            
            //console.log(dragging_on_content);
            if(!content_div.queue().length)
                content_div.fadeIn(200);
            clearTimeout(hide_timer);
            hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    content_div.fadeOut(200);
            },500);
            evt.preventDefault();
        });
 //       $("body").on("dragleave",function(evt){
 //           console.log(dragging_on_content)
 //
 //       });
        content_div.on("dragover",function(evt){
            content_div.addClass("active");
            dragging_on_content = true;
            evt.preventDefault();
        });
        content_div.on("dragleave",function(evt){
            
            content_div.removeClass("active");
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
            
            window.open("//www.baidu.com/s?wd="+dt);    
            window.open("//www.bing.com/search?q="+dt);  
            window.open("//www.sogou.com/web?query="+dt);   
            hide_timer = setTimeout(function(){
                if(true)
                    content_div.fadeOut(200);
            },800);
            evt.preventDefault();
        });
    }
});