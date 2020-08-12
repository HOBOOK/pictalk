package com.endspring.pictalk.module.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(value="chatroom")
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {
    @Id
    private String id;
    private String title;
    private String description;
    private String img;
    private String managerId;
    private String accessKey;
    private String notification;

    private int type;
    private int max;

    private boolean isPrivate;

    private LocalDateTime createDate;

    private Message[] messages;

    private String[] categories;

    private Participant[] participants;

    private Participant[] likes;

    private Image[] savedImages;

    private ChatRoomConfig chatRoomConfig;

    public ChatRoom(String id){
        this.id = id;
    }
}
