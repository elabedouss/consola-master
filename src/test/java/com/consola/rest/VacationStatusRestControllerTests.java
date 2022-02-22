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

import com.consola.model.VacationStatus;
import com.consola.repositories.VacationStatusRepository;

@RunWith(SpringRunner.class)
public class VacationStatusRestControllerTests {

	private MockMvc mockMvc;

	@Mock
	private VacationStatusRepository vacationStatusRepository;

	@InjectMocks
	private VacationStatusRestController vacationStatusRestController;

	VacationStatus vacationStatus = new VacationStatus();

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(vacationStatusRestController).build();

		vacationStatus.setId(99);
		vacationStatus.setName("Accepted");
	}

	@Test
	public void getRolesPaginated() throws Exception {
		List<VacationStatus> vacationStatuslist = Arrays.asList(vacationStatus);
		Mockito.when(vacationStatusRepository.findAll()).thenReturn(vacationStatuslist);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/vacation-status"))
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void getRoleById() throws Exception {
		Optional<VacationStatus> resultObj = Optional.of(vacationStatus);

		Mockito.when(vacationStatusRepository.findById(99)).thenReturn(resultObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/vacation-status/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(jsonPath("$.id").value(99)).andExpect(jsonPath("$.name").value("Accepted"));
		Mockito.verify(vacationStatusRepository).findById(99);
	}

	@Test
	public void saveRole() throws Exception {
		String jsonString = "{\n" + "\"id\":99,\n" + "\"name\":\"Accepted\"\n" + "}";

		Mockito.when(vacationStatusRepository.saveAndFlush(vacationStatus)).thenReturn(vacationStatus);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/vacation-status/save")
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

		assertEquals(201, mvcResult.getResponse().getStatus());
	}

	@Test
	public void deleteRoleById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/vacation-status/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isAccepted());
	}
}
