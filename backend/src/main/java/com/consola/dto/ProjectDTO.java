package com.consola.dto;

import java.util.Date;

import com.consola.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private int id;
    private Status status;
    private String name;
    private String shortName;
    private Date startDate;
    private Date endDate;

}