package com.consola.dto;

import java.util.Date;

import com.consola.model.Vacation;

public class NotificationDTO {

	private int id;
	private Vacation vacation;
	private String message;
	private Date date;
	private boolean seen;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Vacation getVacation() {
		return vacation;
	}

	public void setVacation(Vacation vacation) {
		this.vacation = vacation;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public boolean isSeen() {
		return seen;
	}

	public void setSeen(boolean seen) {
		this.seen = seen;
	}

}