package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ManagementController {

    @GetMapping("/console")
    public String dashboard(){
        return "app/dashboard";
    }

    @GetMapping("/console/file")
    public String file(){
        return "app/file";
    }

    @GetMapping("/console/account")
    public String account(){
        return "app/account";
    }

    @GetMapping("/console/info")
    public String info(){
        return "app/info";
    }
}
