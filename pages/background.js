        var last_exploded_tags = new Array();
        
        chrome.runtime.onMessage.addListener(
            function(message, sender, sendResponse) {
                if (sender.tab){ //From Content Script
                    console.log("===========START"+message.msg_type);
                    switch(message.msg_type){

                        case 'to_open_exploded_tag':{
                            chrome.tabs.create({url:message.url},function(tab){      //ASYNC!!!!
                                console.log("Tab Opened From Background, ID: " + tab.id);
                                last_exploded_tags.push({
                                    url : message.url,
                                    name:message.name,
                                    disp:message.disp,
                                    tab_id : tab.id,
                                    parent_tab_id : sender.tab.id
                                    
                                });
                                
                                
                            });
                            console.log("Tab Open AT END");
                            break;
                        }
                        case 'to_clear_exploded_list':{
                            last_exploded_tags = [];
                            console.log("last_exploded_tags Cleared!");
                            break;
                        }
                        
                        
                        case 'get_self_tab_id':{
                            sendResponse({resp_type : "ok",tab_id : sender.tab.id});
                            break;
                        }
                        case 'get_self_window_id':{
                            sendResponse({resp_type : "ok",window_id : sender.tab.windowId});
                            break;
                        }
                        case 'get_self_tab_index':{
                            sendResponse({resp_type : "ok",tab_index : sender.tab.index});
                            break;
                        }
                        case 'get_brothers_list':{
                            sendResponse({resp_type : "ok",brothers_list : last_exploded_tags});
                            break;
                        }
                        
                        
                        case 'highlight_tab':{
                            console.log("highlight_tab111:" + message.tab_id);
                            chrome.tabs.get(parseInt(message.tab_id),function(tab){
                                console.log("highlight_tab222:" + message.tab_id);
                                chrome.tabs.highlight({windowId:tab.windowId,tabs:tab.index},function(){
                                    
                                    
                                });
                                
                                
                            });
                            sendResponse({resp_type : "ok"});
                            break;
                        }
                        case 'close_tab':{
                            chrome.tabs.remove(parseInt(message.tab_id),function(tab){

                            });
                            sendResponse({resp_type : "ok"});
                            break;
                        }
                        
                    }
                    console.log("===========END"+message.msg_type);
                    
                    
                    sendResponse({msg: "ok"});
                    
                    
                    
                } else{    //From Extension 
                    
                    
                    
                }
                console.log(sender.tab ?
                        "来自内容脚本：" + sender.tab.url +" TAB ID:" + sender.tab.id:
                        "来自扩展程序");
                console.log("\n\n\n\n");
                //console.log(request);
                
                //sendResponse({msg: "再见"});
        });
        //console.log("fg")