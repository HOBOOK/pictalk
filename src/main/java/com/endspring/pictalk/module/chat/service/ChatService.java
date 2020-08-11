package com.endspring.pictalk.module.chat.service;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import com.endspring.pictalk.module.chat.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public Flux<ChatRoom> readAll(){
        return chatRepository.findAll();
    }

}
