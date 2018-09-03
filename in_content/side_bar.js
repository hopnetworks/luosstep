
var hide_timer;
var dragging_on_content = false;
var scroll_indicator = true;



document.addEventListener('DOMContentLoaded', function(){

    
    console.log('STUPID被执行了！');
    side_bar_div = $("<div></div>");
    side_bar_div.addClass("injected_chrome_extention   ghost_drop");

    
    
    side_bar_div.hide();                       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    title_div = $("<div>Title</div>");
    title_div.addClass("title");
    
    prompt_div = $("<div>Prompt</div>");
    prompt_div.addClass("prompt");
    
    scroll_up_act_div = $("<div>▲</div>");
    scroll_up_act_div.addClass("scroll_up scroll_act");
    
    icons_container_div = $("<div></div>");
    icons_container_div.addClass("icons_container");
    
        drop_icon_div = $("<div></div>");
        drop_icon_div.addClass("drop_icon");
    
    scroll_down_act_div = $("<div>▼</div>");
    scroll_down_act_div.addClass("scroll_down scroll_act");
    
    
    bottom_div = $("<div>Bottom</div>");
    bottom_div.addClass("bottom");
    
    side_bar_div.append(title_div).append(prompt_div)
        .append(scroll_up_act_div).append(icons_container_div)
        .append(scroll_down_act_div).append(bottom_div);
        
        
    drop_icon_web_search = drop_icon_div.clone();
    drop_icon_web_search.html("WEB");
    drop_icon_web_search.on("drop",function(evt){
            dt = evt.originalEvent.dataTransfer;
            dt = dt.getData('Text');
            dt = encodeURIComponent(dt);
            //var opened_window_list = new Array();
            chrome.runtime.sendMessage({msg_type:"to_clear_exploded_list"}, function(response) {
                console.log(response.msg);
            });
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://www.baidu.com/s?wd="+dt,
                name:"baidu_web_pages",
                disp:"百度网页搜索"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
            
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://www.bing.com/search?q="+dt,
                name:"bing_web_pages",
                disp:"必应网页搜索"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://www.sogou.com/web?query="+dt,
                name:"sougou_web_pages",
                disp:"搜狗网页搜索"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
    });
    
    drop_icon_shopping_search = drop_icon_div.clone();
    drop_icon_shopping_search.html("SHOP");
    drop_icon_shopping_search.on("drop",function(evt){
            dt = evt.originalEvent.dataTransfer;
            dt = dt.getData('Text');
            //dt = encodeURI(dt);
            chrome.runtime.sendMessage({msg_type:"to_clear_exploded_list"}, function(response) {
                console.log(response.msg);
            });
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://s.taobao.com/search?q="+dt,
                name:"taobao",
                disp:"淘宝搜索"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://search.jd.com/Search?enc=utf-8&keyword="+dt,
                name:"jd",
                disp:"京东"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
            
            message = {
                msg_type:"to_open_exploded_tag",
                url:"http://category.vip.com/suggest.php?keyword="+dt,
                name:"vip",
                disp:"唯品会"
            }
            chrome.runtime.sendMessage(message, function(response) {
                console.log(response.msg);
            });
    });
    
    
    icons_container_div.append(drop_icon_web_search)
        .append(drop_icon_shopping_search)
        .append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone())
        .append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone()).append(drop_icon_div.clone());
    
    
    
    
    //scroll_down_act_div = side_bar_div.children(".scroll_act .scroll_down");
    //scroll_up_act_div =  side_bar_div.find(".scroll_up");
    //scroll_up_act_div.html("sdfdsf");
    //console.log(scroll_down_act_div);
    //scroll_down_act_div.html("fdsfdsf")
    scroll_up_act_div.on("dragover",function(evt){
        if(scroll_indicator){
            scroll_indicator = false;
            icons_container_div.animate({scrollTop:'-=2000px'},3000,'linear',function(){
                scroll_indicator = true;
            });
        }
    });
    scroll_down_act_div.on("dragover",function(evt){
        if(scroll_indicator){
            scroll_indicator = false;
            icons_container_div.animate({scrollTop:'+=2000px'},3000,'linear',function(){
                scroll_indicator = true;
            });
        }
    });
    
    
    scroll_up_act_div.on("dragleave",function(evt){
        
        icons_container_div.stop(true);
        scroll_indicator = true;
        
        
    });
    scroll_down_act_div.on("dragleave",function(evt){
        
        icons_container_div.stop(true);
        scroll_indicator = true;
        
        
    });
    if ( window.parent == window) {  
    //if (window.frames.length == parent.frames.length  && window.parent == window) {  


        
        
        $("body").on("dragover",function(evt){

            prompt_div.html("拖至边栏");
            side_bar_div.removeClass("active");;
            dragging_on_content = false;
            
            
            //console.log(dragging_on_content);
            if(!side_bar_div.queue().length)
                side_bar_div.fadeIn(200);
            clearTimeout(hide_timer);
            hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    side_bar_div.fadeOut(200);
            },300);
            evt.preventDefault();
        });
 //       $("body").on("dragleave",function(evt){
 //           console.log(dragging_on_content)
 //
 //       });
        side_bar_div.on("dragover",function(evt){
            prompt_div.html("放于图标");
            side_bar_div.addClass("active");
            dragging_on_content = true;
            evt.preventDefault();
        });
        side_bar_div.on("dragleave",function(evt){
            
            side_bar_div.removeClass("active");
            dragging_on_content = false;
            
/*             hide_timer = setTimeout(function(){
                if(!dragging_on_content)
                    side_bar_div.fadeOut(200);
            },1500); */
            evt.preventDefault();
        });
        side_bar_div.on("drop",function(evt){


            hide_timer = setTimeout(function(){
                if(true)
                    side_bar_div.fadeOut(200);
            },300);
            evt.preventDefault();
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        
        
        
        
        
        
        
        
        
        
        
        
        $("html").append(side_bar_div);
    }
});