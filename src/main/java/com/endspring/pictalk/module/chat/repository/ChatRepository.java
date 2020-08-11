package com.endspring.pictalk.module.chat.repository;

import com.endspring.pictalk.module.chat.model.ChatRoom;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ChatRepository extends ReactiveCrudRepository<ChatRoom, String> {
    Mono<ChatRoom> findById(String id);
    Flux<ChatRoom> findAll();
}
