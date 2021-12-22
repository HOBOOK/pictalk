package com.endspring.pictalk.module.chat.controller;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import com.endspring.pictalk.module.chat.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ChatRestController {
    private ChatService chatService;
    @GetMapping("/test")
    public List<ChatRoom> readAllRoom(){
        return chatService.readAll();
    }

    @PostMapping("/test")
    public ChatRoom createRoom(@RequestBody ChatRoom chatRoom) throws Exception{
        return chatService.createRoom(chatRoom);
    }
}
