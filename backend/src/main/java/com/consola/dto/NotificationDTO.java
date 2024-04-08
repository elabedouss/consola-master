package com.consola.dto;

import java.util.Date;

import com.consola.model.Vacation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDTO {

    private int id;
    private Vacation vacation;
    private String message;
    private Date date;
    private boolean seen;

}