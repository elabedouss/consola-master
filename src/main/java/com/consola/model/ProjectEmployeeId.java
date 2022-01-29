package com.consola.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ProjectEmployeeId implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private Integer projectId;
	private String employeeId;
	
	public ProjectEmployeeId() {

	}

	public ProjectEmployeeId(Integer projectId, String employeeId) {
		this.projectId = projectId;
		this.employeeId = employeeId;
	}

	@Column(name = "projectId", nullable = false)
	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	@Column(name = "employeeId", nullable = false)
	public String getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

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