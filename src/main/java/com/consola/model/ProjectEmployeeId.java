package com.consola.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serial;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ProjectEmployeeId implements java.io.Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    @Column(name = "projectId", nullable = false)
    private Integer projectId;
    @Column(name = "employeeId", nullable = false)
    private String employeeId;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((employeeId == null) ? 0 : employeeId.hashCode());
        result = prime * result + ((projectId == null) ? 0 : projectId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ProjectEmployeeId other = (ProjectEmployeeId) obj;
        if (employeeId == null) {
            if (other.employeeId != null)
                return false;
        } else if (!employeeId.equals(other.employeeId))
            return false;
        if (projectId == null) {
            if (other.projectId != null)
                return false;
        } else if (!projectId.equals(other.projectId))
            return false;
        return true;
    }

}