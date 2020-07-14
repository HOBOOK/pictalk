package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SigninController {

    @RequestMapping("/signin")
    public String sigin(){
        return "signin";
    }

    @RequestMapping("/register")
    public String register(){
        return "register";
    }

    @RequestMapping("/findPassword")
    public String findPassword(){
        return "findPassword";
    }

    @RequestMapping("/personal")
    public String personal(){
        return "mypage_personal";
    }

    @RequestMapping("/follow")
    public String follow(){
        return "mypage_follow";
    }

    @RequestMapping("/pictures")
    public String pictures(){
        return "mypage_pictures";
    }

    @RequestMapping("/mypage")
    public String mypage(){
        return "app/mypage";
    }

}
