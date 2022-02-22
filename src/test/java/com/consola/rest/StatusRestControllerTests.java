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

import com.consola.model.Status;
import com.consola.repositories.StatusRepository;

@RunWith(SpringRunner.class)
public class StatusRestControllerTests {

	private MockMvc mockMvc;

	@Mock
	private StatusRepository statusRepository;

	@InjectMocks
	private StatusRestController statusRestController;

	Status status = new Status();

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(statusRestController).build();

		status.setId(99);
		status.setName("Unit test");
	}

	@Test
	public void getStatusPaginated() throws Exception {
		List<Status> statuslist = Arrays.asList(status);
		Mockito.when(statusRepository.findAll()).thenReturn(statuslist);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/status")).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void getStatusById() throws Exception {
		Optional<Status> resultObj = Optional.of(status);

		Mockito.when(statusRepository.findById(99)).thenReturn(resultObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/status/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(jsonPath("$.id").value(99)).andExpect(jsonPath("$.name").value("Unit test"));
		Mockito.verify(statusRepository).findById(99);
	}

	@Test
	public void saveStatus() throws Exception {
		String jsonString = "{\n" + "\"id\":99,\n" + "\"name\":\"Unit test\"\n" + "}";

		Mockito.when(statusRepository.saveAndFlush(status)).thenReturn(status);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/status/save")
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

		assertEquals(201, mvcResult.getResponse().getStatus());
		assertEquals("Status is updated successsfully", mvcResult.getResponse().getContentAsString());
	}

	@Test
	public void deleteStatusById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/status/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isAccepted());
	}
}
