package com.endspring.pictalk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ManagementController {

    @GetMapping("/console")
    public String console(){
        return "app/console/dashboard";
    }

    @GetMapping("/console/dashboard")
    public String dashboard(){
        return "app/console/dashboard";
    }

    @GetMapping("/console/file")
    public String file(){
        return "app/console/file";
    }

    @GetMapping("/console/account")
    public String account(){
        return "app/console/account";
    }

    @GetMapping("/console/chatroom")
    public String chatroom(){
        return "app/console/chatroom";
    }

    @GetMapping("/console/info")
    public String info(){
        return "app/console/modal/info";
    }

    @GetMapping("/console/add")
    public String add(){
        return "app/console/modal/add";
    }
}
