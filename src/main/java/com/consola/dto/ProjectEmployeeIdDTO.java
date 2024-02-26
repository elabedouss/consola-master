package com.consola.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectEmployeeIdDTO {

    private Integer projectId;
    private String employeeId;

}