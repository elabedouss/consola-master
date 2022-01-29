package com.consola.dto;

public class ProjectEmployeeIdDTO {

	private Integer projectId;
	private String employeeId;

	public ProjectEmployeeIdDTO() {

	}

	public ProjectEmployeeIdDTO(Integer projectId, String employeeId) {
		this.projectId = projectId;
		this.employeeId = employeeId;
	}

	public int getProjectId() {
		return this.projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getEmployeeId() {
		return this.employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

}