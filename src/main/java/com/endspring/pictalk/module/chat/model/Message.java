package com.endspring.pictalk.module.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;
    private String type;
    private int state;
    private String content;
    private String sender;
    private LocalDateTime date;
    private int index;
}
