package com.consola.dto;

import java.util.Date;

import com.consola.model.Employee;
import com.consola.model.VacationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationDTO {

    private int id;
    private Employee employee;
    private Date requestDate;
    private Date startDate;
    private Date endDate;
    private float duration;
    private String comment;
    private VacationStatus vacationStatus;

}