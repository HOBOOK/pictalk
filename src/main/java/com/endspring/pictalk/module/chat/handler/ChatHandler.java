//package com.endspring.pictalk.module.chat.handler;
//
//import com.endspring.pictalk.module.chat.model.ChatRoom;
//import com.endspring.pictalk.module.chat.repository.ChatRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.reactive.functionmon.BodyInserters;
//import org.springframework.web.reactive.function.server.ServerRequest;
//import org.springframework.web.reactive.function.server.ServerResponse;
//import reactor.core.publisher.Flux;
//import reactor.core.publisher.Mono;
//
//import java.util.HashMap;
//import java.util.List;
//
//@Component
//public class ChatHandler {
//    @Autowired
//    private ChatRepository chatRepository;
//
//    public Mono<ServerResponse> readAllRoom(ServerRequest request){
//        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromProducer(chatRepository.findAll(), ChatRoom.class));
//    }
//
//
//    public Mono<ServerResponse> createRoom(@RequestBody ChatRoom chatRoom){
//        return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromProducer(chatRepository.save(chatRoom), ChatRoom.class));
//    }
//}
