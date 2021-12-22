package com.endspring.pictalk.module.chat.repository;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatRepository extends MongoRepository<ChatRoom, String> {
    Optional<ChatRoom> findById(String id);
}
