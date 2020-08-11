package com.endspring.pictalk.module.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    private String id;
    private String title;
    private String description;

    public ChatRoom(String id){
        this.id = id;
    }
}
