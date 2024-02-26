package com.consola.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
@Table(name = "Notification", catalog = "consola")
public class Notification implements java.io.Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vacationId", nullable = false)
    private Vacation vacation;
    @Column(name = "message", nullable = false, length = 500)
    private String message;
    @Temporal(TemporalType.DATE)
    @Column(name = "date", nullable = false, length = 10)
    private Date date;
    @Column(name = "seen", nullable = false)
    private boolean seen;


}