package com.endspring.pictalk.module.chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ChatController {
    @RequestMapping("/")
    public String main(){
        return "app/chat/chat";
    }
    @RequestMapping("/chat")
    public String chat(){
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
}
