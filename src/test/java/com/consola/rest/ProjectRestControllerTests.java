package com.consola.rest;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Date;
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

import com.consola.model.Project;
import com.consola.model.ProjectEmployee;
import com.consola.model.ProjectEmployeeId;
import com.consola.model.Status;
import com.consola.repositories.ProjectEmployeeRepository;
import com.consola.repositories.ProjectRepository;

@RunWith(SpringRunner.class)
public class ProjectRestControllerTests {

	private MockMvc mockMvc;

	@Mock
	private ProjectRepository projectRepository;

	@Mock
	private ProjectEmployeeRepository projectEmployeeRepository;

	@InjectMocks
	private ProjectRestController projectRestController;

	Project project = new Project();
	Status statusObj = new Status();
	ProjectEmployee projectEmployeeObj = new ProjectEmployee();

	LocalDate localDate = LocalDate.of(2021, Month.JANUARY, 01);
	ZoneId defaultZoneId = ZoneId.systemDefault();
	Date date = Date.from(localDate.atStartOfDay(defaultZoneId).toInstant());

	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.standaloneSetup(projectRestController).build();

		statusObj.setId(3);

		project.setId(9999);
		project.setName("Unit test");
		project.setShortName("UT");
		project.setStartDate(date);
		project.setEndDate(date);
		project.setStatus(statusObj);

		projectEmployeeObj.setProjectEmployeeId(new ProjectEmployeeId(9999, "Oussama"));
	}

	@Test
	public void getProjectsPaginated() throws Exception {
		List<Project> projects = Arrays.asList(project);
		Mockito.when(projectRepository.findAll()).thenReturn(projects);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/projects")).andExpect(MockMvcResultMatchers.status().isOk());

	}

	@Test
	public void getallProjects() throws Exception {
		List<Project> projects = Arrays.asList(project);
		Mockito.when(projectRepository.findAll()).thenReturn(projects);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/projects/all"))
				.andExpect(MockMvcResultMatchers.status().isOk());

	}

	@Test
	public void getProjectById() throws Exception {
		Optional<Project> resultObj = Optional.of(project);

		resultObj.get().setId(9999);
		resultObj.get().setName("Unit test");
		resultObj.get().setShortName("UT");
		resultObj.get().setStartDate(date);
		resultObj.get().setEndDate(date);
		resultObj.get().setStatus(statusObj);

		Mockito.when(projectRepository.findById(9999)).thenReturn(resultObj);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/projects/9999").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(jsonPath("$.id").value(9999)).andExpect(jsonPath("$.name").value("Unit test"))
				.andExpect(jsonPath("$.shortName").value("UT"));
		Mockito.verify(projectRepository).findById(9999);
	}

	@Test
	public void checkProjectEmployee() throws Exception {
		Optional<ProjectEmployee> projectEmployee = Optional.of(projectEmployeeObj);

		projectEmployee.get().setProjectEmployeeId(new ProjectEmployeeId(9999, "Oussama"));

		Mockito.when(projectEmployeeRepository.findById(new ProjectEmployeeId(9999, "Oussama")))
				.thenReturn(projectEmployee);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/projects/check/9999/employee/Oussama")
				.accept(MediaType.APPLICATION_JSON)).andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"));
		Mockito.verify(projectEmployeeRepository).findById(new ProjectEmployeeId(9999, "Oussama"));
	}

	@Test
	public void saveProject() throws Exception {
		String jsonString = "{\n" + "\"id\":9999,\n" + "\"name\":\"Unit test\",\n" + "\"shortName\":\"UT\"\n" + "}";

		Mockito.when(projectRepository.saveAndFlush(project)).thenReturn(project);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/projects/save")
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

		assertEquals(201, mvcResult.getResponse().getStatus());
	}

	@Test
	public void addProjectEmployee() throws Exception {
		String jsonString = "{\n" + "\"projectId\":9999,\n" + "\"employeeId\":\"Oussama\"\n" + "}";

		ProjectEmployee projectEmployee = new ProjectEmployee();

		projectEmployee.setProjectEmployeeId(new ProjectEmployeeId(9999, "Oussama"));

		Mockito.when(projectEmployeeRepository.save(new ProjectEmployee(new ProjectEmployeeId(9999, "Oussama"))))
				.thenReturn(projectEmployee);

		MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/projects/project-employee")
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

		assertEquals(201, mvcResult.getResponse().getStatus());
	}

	@Test
	public void deleteProjectById() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.delete("/api/projects/9999").accept(MediaType.APPLICATION_JSON))
				.andExpect(MockMvcResultMatchers.status().isAccepted());
	}

}
