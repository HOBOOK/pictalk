//package com.endspring.pictalk.module.chat.service;
//
//import com.endspring.pictalk.module.chat.model.ChatRoom;
//import com.endspring.pictalk.module.chat.repository.ChatRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//
//@Service
//public class ChatService {
//    @Autowired
//    private ChatRepository chatRepository;
//
//    public Flux<ChatRoom> readAll(){
//        return chatRepository.findAll();
//    }
//
//    public Mono<ChatRoom> createRoom(ChatRoom chatRoom){
//        return chatRepository.save(chatRoom);
//    }
//
//    public Mono<Void> deleteRoomById(String id){
//        Mono<ChatRoom> deleteChatRoom = chatRepository.findById(id);
//        return Mono.when(deleteChatRoom).then();
//    }
//
//    public Mono<ChatRoom> readRoomById(String id){
//        return chatRepository.findById(id);
//    }
//
//}
