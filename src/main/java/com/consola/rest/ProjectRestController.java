package com.consola.rest;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.consola.dto.ProjectDTO;
import com.consola.dto.ProjectEmployeeIdDTO;
import com.consola.model.Project;
import com.consola.model.ProjectEmployee;
import com.consola.model.ProjectEmployeeId;
import com.consola.repositories.ProjectEmployeeRepository;
import com.consola.repositories.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
public class ProjectRestController {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private ProjectEmployeeRepository projectEmployeeRepository;

	private ModelMapper mapper = new ModelMapper();

	@GetMapping("")
	public ResponseEntity<Page<Project>> getProjectsPaginated(
			@RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(name = "pageIndex", defaultValue = "0", required = false) Integer pageIndex) {
		return new ResponseEntity<>(projectRepository.findAll(PageRequest.of(pageIndex, pageSize)), HttpStatus.OK);
	}

	@GetMapping("check/{projectId}/employee/{employeeId}")
	public Optional<ProjectEmployee> checkProjectEmployee(@PathVariable("projectId") Integer projectId,
			@PathVariable("employeeId") String employeeId) {
		ProjectEmployeeId id = new ProjectEmployeeId(projectId, employeeId);
		return projectEmployeeRepository.findById(id);
	}

	@PostMapping("/project-employee")
	public ProjectEmployee addProjectEmployee(@RequestBody ProjectEmployeeIdDTO projectEmployeeId) {
		ProjectEmployeeId id = mapper.map(projectEmployeeId, ProjectEmployeeId.class);
		return projectEmployeeRepository.save(new ProjectEmployee(id));
	}

	@GetMapping("/all")
	public ResponseEntity<List<Project>> getAllProjects() {
		return new ResponseEntity<>(projectRepository.findAll(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Optional<Project>> getProjectById(@PathVariable("id") int id) {
		return new ResponseEntity<>(projectRepository.findById(id), HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<Object> saveProject(@RequestBody ProjectDTO project) {
		projectRepository.saveAndFlush(mapper.map(project, Project.class));
		return new ResponseEntity<>("Project is updated successsfully", HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteProjectById(@PathVariable("id") int id) {
		projectRepository.deleteById(id);
		return new ResponseEntity<>("Project is deleted successsfully", HttpStatus.ACCEPTED);
	}

}