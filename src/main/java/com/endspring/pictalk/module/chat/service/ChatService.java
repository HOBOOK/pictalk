package com.endspring.pictalk.module.chat.service;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import com.endspring.pictalk.module.chat.repository.ChatRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class ChatService {
    private ChatRepository chatRepository;

    public List<ChatRoom> readAll(){
        return (List<ChatRoom>)chatRepository.findAll();
    }

    public ChatRoom createRoom(ChatRoom chatRoom) throws  Exception{
        return chatRepository.save(chatRoom);
    }

    public void deleteRoomById(String id) throws Exception{
        chatRepository.delete(chatRepository.findById(id).orElseThrow(NoSuchElementException::new));
    }

    public ChatRoom readRoomById(String id) throws Exception{
        return chatRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

}
