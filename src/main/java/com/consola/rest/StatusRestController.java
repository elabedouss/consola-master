package com.consola.rest;

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

import com.consola.dto.StatusDTO;
import com.consola.model.Status;
import com.consola.repositories.StatusRepository;

@RestController
@RequestMapping("/api/status")
public class StatusRestController {

	@Autowired
	private StatusRepository statusRepository;
	
	private ModelMapper mapper = new ModelMapper();
	
	@GetMapping("")
	public ResponseEntity<Page<Status>> status(
			@RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(name = "pageIndex", defaultValue = "0", required = false) Integer pageIndex) {
		return new ResponseEntity<>(statusRepository.findAll(PageRequest.of(pageIndex, pageSize)), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public Optional<Status> statusById(@PathVariable("id") int id) {
		return statusRepository.findById(id);
	}
	
	@PostMapping("/save")
	public Status saveStatus(@RequestBody StatusDTO status) {
		return statusRepository.saveAndFlush(mapper.map(status, Status.class));
	}
	
	@DeleteMapping("/{id}")
	public void deleteStatusById(@PathVariable("id") int id) {
		 statusRepository.deleteById(id);
	}

}