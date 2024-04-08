package com.consola.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Project")
public class Project implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "statusId", nullable = false)
    private Status status;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "shortName")
    private String shortName;
    @Temporal(TemporalType.DATE)
    @Column(name = "startDate", nullable = false, length = 10)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    @Column(name = "endDate", length = 10)
    private Date endDate;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "Project_Employee", joinColumns = {
            @JoinColumn(name = "projectId", nullable = false, updatable = false, insertable = false)}, inverseJoinColumns = {
            @JoinColumn(name = "employeeId", nullable = false, updatable = false, insertable = false)})
    private Set<Employee> employees = new HashSet<>(0);


}