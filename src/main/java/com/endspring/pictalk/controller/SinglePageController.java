package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SinglePageController {
    @GetMapping("/")
    public String test(){
        return "app/chat";
    }
    @GetMapping("/chat")
    public String chat(){
        return "app/chat";
    }

    @RequestMapping(value = "modal/modal_chat", method = RequestMethod.GET)
    public String chatModal(){
        return "modal/modal_chat";
    }

    @RequestMapping(value = "modal/modal_chat_profile", method = RequestMethod.GET)
    public String chatModalProfile(){
        return "modal/modal_chat_profile";
    }

    @GetMapping("/configuration")
    public String configuration(){
        return "app/configuration";
    }

    @GetMapping("/mypage")
    public String mypage(){
        return "personal";
    }
    @GetMapping("/personal")
    public String personal(){
        return "personal";
    }
    @GetMapping("/follow")
    public String follow(){
        return "follow";
    }
    @GetMapping("/pictures")
    public String pictures(){
        return "pictures";
    }
}
