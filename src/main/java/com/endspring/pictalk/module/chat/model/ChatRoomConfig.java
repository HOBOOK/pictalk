package com.endspring.pictalk.module.chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomConfig {
    private boolean isHideNotification;
    private boolean isEditNotification;
    private boolean isMoreNotification;
}
