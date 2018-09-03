
var brothers_list = null;
var self_tab_id = null;
var self_window_id = null;
var show_brothers = false;
var show_control = false;
document.addEventListener('DOMContentLoaded', function(){
    
    console.log('CONTROL被执行了！');
    
    

    
    
    docs_ctrl_div = $("<div></div>");
    docs_ctrl_div.addClass("injected_chrome_extention docs_ctrl");

    
    //docs_ctrl.hide();                       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
        ctrl_container_div = $("<div></div>")
        ctrl_container_div.addClass("ctrl_container");
        docs_ctrl_div.append(ctrl_container_div);
            general_ctrl_div = $("<div></div>");
            general_ctrl_div.addClass("general_ctrl");
            ctrl_container_div.append(general_ctrl_div);
                close_all_docs_div = $("<div></div>");
                close_all_docs_div.addClass("close_all_docs_div general_ctrl_button");
                close_all_docs_div.click(function(){
                    
                    
                });
                general_ctrl_div.append(close_all_docs_div);
                
                close_others_div = $("<div></div>");
                close_others_div.addClass("close_others general_ctrl_button");
                close_others_div.click(function(){
                    
                    
                });
                general_ctrl_div.append(close_others_div);
                
                close_self_div = $("<div></div>");
                close_self_div.addClass("close_self general_ctrl_button");
                close_self_div.click(function(){
                    
                    
                });
                general_ctrl_div.append(close_self_div);
                
                collapse_self_div = $("<div></div>");
                collapse_self_div.addClass("collapse_self general_ctrl_button");
                collapse_self_div.click(function(){
                    
                    
                });
                general_ctrl_div.append(collapse_self_div);
                
                
            
            brothers_ctrl_div = $("<div></div>");
            brothers_ctrl_div.addClass("brothers_ctrl");
            ctrl_container_div.append(brothers_ctrl_div);
                
            
/*             parent_ctrl_div = $("<div></div>");
            parent_ctrl_div.addClass("parent_ctrl");
            ctrl_container_div.append(parent_ctrl_div); */
        
        collapse_act_div = $("<div></div>");
        collapse_act_div.addClass("collapse_act");
        collapse_act_div.click(function(){
            ctrl_container_div.slideToggle()
            
        });
        docs_ctrl_div.append(collapse_act_div);
        //docs_ctrl_div.append(collapse_act_div).append(general_ctrl_div).append(brothers_ctrl_div).append(parent_ctrl_div);
    
    
    if ( window.parent == window) {  
    //if (window.frames.length == parent.frames.length  && window.parent == window) {  
        message = {msg_type : "get_self_tab_index"}
        chrome.runtime.sendMessage(message, function(response) {
            console.log("This TAB's INDEX: "+response.tab_index);
            self_tab_id = response.tab_id;
        });
        
        message = {msg_type : "get_self_window_id"}
        chrome.runtime.sendMessage(message, function(response) {
            console.log("This TAB's Window ID: "+response.window_id);
            self_window_id = response.tab_id;
        });
        
        message = {msg_type : "get_self_tab_id"}
        chrome.runtime.sendMessage(message, function(response) {
            console.log("This TAB's ID: "+response.tab_id);
            self_tab_id = response.tab_id;
        });

        message = {msg_type : "get_brothers_list"}
        chrome.runtime.sendMessage(message, function(response) {
            console.log(response.brothers_list);
            brothers_list = response.brothers_list;
            for (counter = 0; counter < brothers_list.length; counter++ ){
                brother_ctrl_div = $("<div></div>");
                brother_ctrl_div.addClass("brother_ctrl");
                    brother_jump_div = $("<div>JUMP</div>");
                    brother_jump_div.html(brothers_list[counter].disp);
                    brother_jump_div.addClass("brother_jump");
                    brother_jump_div.attr("tab_id",brothers_list[counter].tab_id);
                    brother_jump_div.click(function(){
                        console.log("brother: -");
                        console.log($(this).attr("tab_id"));
                        
                        message = {msg_type : "highlight_tab", tab_id:$(this).attr("tab_id")}
                        chrome.runtime.sendMessage(message, function(response) {
                            
                            
                        });
                    });
                    brother_ctrl_div.append(brother_jump_div);
                    
                    brother_close_div = $("<div>CLOSE</div>");
                    brother_close_div.addClass("brother_close");
                    brother_close_div.attr("tab_id",brothers_list[counter].tab_id);
                    brother_close_div.click(function(){
                        message = {msg_type : "close_tab",tab_id:$(this).attr("tab_id")}
                        chrome.runtime.sendMessage(message, function(response) {
                            console.log("parent:==111=")
                            if (response.resp_type == 'ok'){
                                console.log("parent:===")
                                console.log()
                                
                                
                            }
                            
                        });
                        $(this).parent().remove();
                    });
                    brother_ctrl_div.append(brother_close_div);
                    
                brothers_ctrl_div.append(brother_ctrl_div);
                console.log(parseInt(self_tab_id)+" VS "+parseInt(brothers_list[counter].tab_id));
                if(parseInt(self_tab_id) == parseInt(brothers_list[counter].tab_id)){
                    show_brothers = true;
                    show_control = true;
                }
            }
            if(show_brothers){
                console.log("show_brothers")
                brothers_ctrl_div.show();
            }else{
                console.log("NO show_brothers")
                brothers_ctrl_div.hide();
            }
            
            if(show_control){
                console.log("show_CTRL")
                docs_ctrl_div.show();
                docs_ctrl_div.css("visibility","visible")
            }else{
                console.log("NO show_CTRL")
                docs_ctrl_div.hide();
                docs_ctrl_div.css("visibility","hidden")
            }
        });
        
        $("html").append(docs_ctrl_div);


        
    }
});