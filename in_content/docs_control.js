document.addEventListener('DOMContentLoaded', function(){

    console.log('CONTROL被执行了！');
    docs_ctrl_div = $("<div></div>");
    docs_ctrl_div.addClass("injected_chrome_extention docs_ctrl");

    
    //docs_ctrl.hide();                       //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    collapse_act_div = $("<div></div>");
    collapse_act_div.addClass("collapse_act");
    
    general_ctrl_div = $("<div></div>");
    general_ctrl_div.addClass("general_ctrl");
        
        close_all_docs_div = $("<div></div>");
        close_all_docs_div.addClass("close_all_docs_div general_ctrl_button");
        
        close_others_div = $("<div></div>");
        close_others_div.addClass("close_others general_ctrl_button");
        
        close_self_div = $("<div></div>");
        close_self_div.addClass("close_self general_ctrl_button");
        
        collapse_self_div = $("<div></div>");
        collapse_self_div.addClass("collapse_self general_ctrl_button");
        
        general_ctrl_div.append(close_all_docs_div).append(close_others_div)
            .append(close_self_div).append(collapse_self_div);
        
    
    docs_ctrl_div.append(collapse_act_div).append(general_ctrl_div);
    if (window.frames.length == parent.frames.length  && window.parent == window) {  
        $("html").append(docs_ctrl_div);
    }
});