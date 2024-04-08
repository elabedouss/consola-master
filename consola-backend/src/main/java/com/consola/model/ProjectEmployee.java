package com.consola.model;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Project_Employee")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProjectEmployee implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private ProjectEmployeeId projectEmployeeId;

}