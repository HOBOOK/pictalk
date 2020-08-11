package com.endspring.pictalk.common.controller;

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


}
