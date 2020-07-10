package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SinglePageController {
    @GetMapping("/chat")
    public String chat(){
        return "app/chat";
    }

    @RequestMapping(value = "modal/modal_chat", method = RequestMethod.GET)
    public String chatModal(){
        return "modal/modal_chat";
    }

    @GetMapping("/mypage")
    public String mypage(){
        return "app/mypage";
    }
}
