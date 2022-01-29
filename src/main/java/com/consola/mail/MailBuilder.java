package com.consola.mail;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.FileCopyUtils;

import com.consola.model.Employee;
import com.consola.model.Vacation;

public class MailBuilder {

	@Autowired
	private MessageSource messageSourceMail;

	public String buildMailForPassword(Employee e) throws IOException {
		String mail = readFile("password.html");
		mail.replace(MailConstants.FULLNAME_KEY, e.getFullName());
		mail.replace(MailConstants.USERNAME_KEY, e.getUsername());
		mail.replace(MailConstants.PASSWORD_KEY, e.getPassword());
		return mail;
	}
	
	public String buildMailForNotification(Vacation v) throws IOException {
		String mail = readFile("notification.html");
		mail.replace(MailConstants.FULLNAME_KEY, v.getEmployee().getFullName());
		mail.replace(MailConstants.ID_KEY, v.getId()+"");
		mail.replace(MailConstants.STATUS_KEY, v.getVacationStatus().getName());
		return mail;
	}

	public String subjectForPasswordMail() {
		return messageSourceMail.getMessage("password.mail.subject", null, Locale.ENGLISH);
	}
	
	public String subjectForNotificationMail() {
		return messageSourceMail.getMessage("notification.mail.subject", null, Locale.ENGLISH);
	}

	private String readFile(String fileName) throws IOException {
		Resource resource = new ClassPathResource(fileName);
		InputStream inputStream = resource.getInputStream();
		byte[] bdata = FileCopyUtils.copyToByteArray(inputStream);
		return new String(bdata, StandardCharsets.UTF_8);
	}

}