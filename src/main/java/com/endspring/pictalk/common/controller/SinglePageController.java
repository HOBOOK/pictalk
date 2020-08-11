package com.endspring.pictalk.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SinglePageController {
    @RequestMapping("/")
    public String main(){
        return "app/chat/chat";
    }
    @RequestMapping("/chat")
    public String chat(){
        return "app/chat/chat";
    }
    @RequestMapping("/layout/layout_main")
    public String layoutMain(){
        return "layout/layout_main";
    }

    @RequestMapping("/mychat")
    public String myChat(){
        return "app/chat/chat";
    }
    @RequestMapping(value = "modal/modal_chat", method = RequestMethod.GET)
    public String chatModal(){
        return "app/chat/modal/modal_chat";
    }

    @RequestMapping(value = "modal/modal_chat_profile", method = RequestMethod.GET)
    public String chatModalProfile(){
        return "app/chat/modal/modal_chat_profile";
    }

    @RequestMapping("/configuration")
    public String configuration(){
        return "app/configuration/configuration";
    }

    @RequestMapping("/mypage")
    public String mypage(){
        return "app/mypage";
    }
    @RequestMapping("/mypage/personal")
    public String personal(){
        return "personal";
    }
    @RequestMapping("/mypage/follow")
    public String follow(){
        return "follow";
    }
    @RequestMapping("/mypage/pictures")
    public String pictures(){
        return "pictures";
    }
}
