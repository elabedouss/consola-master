package com.consola.dto;

import java.util.Date;

import com.consola.model.Employee;
import com.consola.model.VacationStatus;

public class VacationDTO {

	private int id;
	private Employee employee;
	private Date requestDate;
	private Date startDate;
	private Date endDate;
	private float duration;
	private String comment;
	private VacationStatus vacationStatus;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Date getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public float getDuration() {
		return duration;
	}

	public void setDuration(float duration) {
		this.duration = duration;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public VacationStatus getVacationStatus() {
		return vacationStatus;
	}

	public void setVacationStatus(VacationStatus vacationStatus) {
		this.vacationStatus = vacationStatus;
	}

}