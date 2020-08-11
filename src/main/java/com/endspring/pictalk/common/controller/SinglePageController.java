package com.endspring.pictalk.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SinglePageController {
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
