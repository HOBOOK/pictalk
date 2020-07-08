package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SinglePageController {
    @GetMapping("/chat")
    public String chat(){
        return "app/chat";
    }

    @GetMapping("/mypage")
    public String mypage(){
        return "app/mypage";
    }
}
