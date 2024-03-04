package com.consola.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Vacation")
public class Vacation implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeId", nullable = false)
    private Employee employee;
    @Temporal(TemporalType.DATE)
    @Column(name = "requestDate", nullable = false, length = 10)
    private Date requestDate;
    @Temporal(TemporalType.DATE)
    @Column(name = "startDate", nullable = false, length = 10)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    @Column(name = "endDate", nullable = false, length = 10)
    private Date endDate;
    @Column(name = "duration", nullable = false, precision = 12, scale = 0)
    private float duration;
    @Column(name = "comment", length = 300)
    private String comment;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vacationStatusId", nullable = false)
    private VacationStatus vacationStatus;

}