package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ManagementController {

    @GetMapping("/dashboard")
    public String dashboard(){
        return "app/dashboard";
    }

    @GetMapping("/file")
    public String file(){
        return "app/file";
    }

    @GetMapping("/account")
    public String account(){
        return "app/account";
    }

    @GetMapping("/info")
    public String info(){
        return "app/info";
    }
}
