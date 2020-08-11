//package com.endspring.pictalk.module.chat.config;
//
//import com.endspring.pictalk.module.chat.model.ChatRoom;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.mongodb.core.MongoOperations;
//import org.springframework.stereotype.Component;
//
//import java.util.UUID;
//
//@Component
//public class InitDatabase {
//    @Bean
//    CommandLineRunner init(MongoOperations operations) {
//        return args -> {
//            operations.dropCollection(ChatRoom.class);
//
//            operations.insert(new ChatRoom(UUID.randomUUID().toString()));
//            operations.insert(new ChatRoom(UUID.randomUUID().toString()));
//            operations.insert(new ChatRoom(UUID.randomUUID().toString()));
//            operations.insert(new ChatRoom(UUID.randomUUID().toString()));
//
//            operations.findAll(ChatRoom.class).forEach(id -> {
//                System.out.println(id.toString());
//            });
//        };
//    }
//}
