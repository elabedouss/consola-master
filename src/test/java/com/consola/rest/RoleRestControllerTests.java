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

import com.consola.model.Role;
import com.consola.repositories.RoleRepository;

@RunWith(SpringRunner.class)
public class RoleRestControllerTests {

	private MockMvc mockMvc;

	@Mock
	private RoleRepository roleRepository;

	@InjectMocks
	private RoleRestController roleRestController;

	Role role = new Role();

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(roleRestController).build();

		role.setId(99);
		role.setName("admin");
	}

	@Test
	public void getRolesPaginated() throws Exception {
		List<Role> roleslist = Arrays.asList(role);
		Mockito.when(roleRepository.findAll()).thenReturn(roleslist);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/roles")).andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	public void getRoleById() throws Exception {
		Optional<Role> resultObj = Optional.of(role);

		Mockito.when(roleRepository.findById(99)).thenReturn(resultObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/roles/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(jsonPath("$.id").value(99)).andExpect(jsonPath("$.name").value("admin"));
		Mockito.verify(roleRepository).findById(99);
	}

	@Test
	public void saveRole() throws Exception {
		String jsonString = "{\n" + "\"id\":99,\n" + "\"name\":\"admin\"\n" + "}";

		Mockito.when(roleRepository.saveAndFlush(role)).thenReturn(role);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/roles/save")
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

		assertEquals(201, mvcResult.getResponse().getStatus());
	}

	@Test
	public void deleteRoleById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/roles/99").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isAccepted());
	}
}
