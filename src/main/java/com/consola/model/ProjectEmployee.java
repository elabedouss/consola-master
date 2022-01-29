package com.consola.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Project_Employee", catalog = "consola")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class ProjectEmployee implements java.io.Serializable {

	private static final long serialVersionUID = 1L;
	private ProjectEmployeeId projectEmployeeId;
	
	public ProjectEmployee() {
	}
	
	public ProjectEmployee(ProjectEmployeeId projectEmployeeId) {
		this.projectEmployeeId = projectEmployeeId;
	}
	
	@EmbeddedId
	public ProjectEmployeeId getProjectEmployeeId() {
		return projectEmployeeId;
	}
	public void setProjectEmployeeId(ProjectEmployeeId projectEmployeeId) {
		this.projectEmployeeId = projectEmployeeId;
	}
	
}