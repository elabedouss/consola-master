package com.consola.rest;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.consola.model.Notification;
import com.consola.model.Vacation;
import com.consola.repositories.NotificationRepository;
import com.consola.repositories.VacationRepository;

@RunWith(SpringRunner.class)
public class NotificationRestControllerTests {

	private MockMvc mockMvc;

	@Mock
	private NotificationRepository notificationRepository;

	@Mock
	private VacationRepository vacationRepository;

	@InjectMocks
	private NotificationRestController notificationRestController;

	Notification notification = new Notification();
	Vacation vacation = new Vacation();


	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(notificationRestController).build();

		notification.setId(999);
		vacation.setId(9);

	}

	@Test
	public void getNotificationsPaginated() throws Exception {
		List<Notification> notificationList = Arrays.asList(notification,notification);
		Mockito.when(notificationRepository.findAll()).thenReturn(notificationList);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/notifications/user/oussama"))
				.andExpect(MockMvcResultMatchers.status().isOk());

	}

	@Test
	public void getCountNotificationById() throws Exception {
		List<Vacation> vacationList = Arrays.asList(vacation,vacation);
		long resultObj = 1;

		Mockito.when(notificationRepository.countByVacationIn(vacationList)).thenReturn(resultObj);
		MvcResult mvcResult = mockMvc.perform(
				MockMvcRequestBuilders.get("/api/notifications/count/oussama").accept(MediaType.APPLICATION_JSON))
				.andReturn();

		assertEquals(200, mvcResult.getResponse().getStatus());
	}

	@Test
	public void getNotificationById() throws Exception {
		Optional<Notification> resultObj = Optional.of(notification);
		Mockito.when(notificationRepository.findById(999)).thenReturn(resultObj);

		mockMvc.perform(MockMvcRequestBuilders.get("/api/notifications/999").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(jsonPath("$.id").value(999));
		Mockito.verify(notificationRepository).findById(999);

	}

//
	@Test
	public void deleteNotificationById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/notifications/999").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isAccepted());

	}
}
