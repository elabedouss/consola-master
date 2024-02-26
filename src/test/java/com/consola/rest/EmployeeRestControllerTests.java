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

import com.consola.model.Employee;
import com.consola.repositories.EmployeeRepository;

@RunWith(SpringRunner.class)
public class EmployeeRestControllerTests {

    private MockMvc mockMvc;

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeRestController employeeRestController;

    Employee employee = new Employee();

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(employeeRestController).build();

        employee.setUsername("Oussama");
        employee.setPassword("admin");

    }

    @Test
    public void getEmployeePaginated() throws Exception {
        List<Employee> employeelist = Arrays.asList(employee, employee);
        Mockito.when(employeeRepository.findAll()).thenReturn(employeelist);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees")).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getEmployeeById() throws Exception {
        Optional<Employee> resultObj = Optional.of(employee);

        Mockito.when(employeeRepository.findById("Oussama")).thenReturn(resultObj);
        mockMvc.perform(MockMvcRequestBuilders.get("/api/employees/Oussama").accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(jsonPath("$.username").value("Oussama"));
        Mockito.verify(employeeRepository).findById("Oussama");
    }

    @Test
    public void saveEmployee() throws Exception {
        String jsonString = """
                {
                    "username": "Oussama"
                }
                """;

        Mockito.when(employeeRepository.saveAndFlush(employee)).thenReturn(employee);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/employees/save")
                .contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString)).andReturn();

        assertEquals(201, mvcResult.getResponse().getStatus());
    }

    @Test
    public void employeeLogin() throws Exception {
        Optional<Employee> resultObj = Optional.of(employee);

        String jsonString = """
                {
                    "username": "Oussama",
                    "password": "admin"
                }
                """;

        Mockito.when(employeeRepository.findByUsernameAndPassword(employee.getUsername(), employee.getPassword()))
                .thenReturn(resultObj);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/employees/login")
                        .contentType(MediaType.APPLICATION_JSON_VALUE).content(jsonString))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void EmployeeStatusById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/employees/Oussama").accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isAccepted());
    }
}
