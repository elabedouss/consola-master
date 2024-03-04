package com.consola.model;

import java.io.Serial;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Employee")
public class Employee implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsible")
    private Employee responsible;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleId")
    private Role role;
    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "fullName", nullable = false)
    private String fullName;
    @Column(name = "email", nullable = false)
    private String email;
    @Temporal(TemporalType.DATE)
    @Column(name = "joinDate", nullable = false, length = 10)
    private Date joinDate;
    @Temporal(TemporalType.DATE)
    @Column(name = "leaveDate", length = 10)
    private Date leaveDate;
    @Column(name = "initialBalance", nullable = false, precision = 12, scale = 0)
    private float initialBalance;
    @Column(name = "currentBalance", nullable = false, precision = 12, scale = 0)
    private float currentBalance;

    public Employee(String username) {
        this.username = username;
    }

}