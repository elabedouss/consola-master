package com.consola.rest;

import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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

import com.consola.dto.VacationDTO;
import com.consola.model.Employee;
import com.consola.model.Vacation;
import com.consola.model.VacationStatus;
import com.consola.repositories.VacationRepository;

@AllArgsConstructor
@RestController
@RequestMapping("/api/vacations")
public class VacationRestController {

    private final VacationRepository vacationRepository;

    private final ModelMapper mapper = new ModelMapper();

    @GetMapping("")
    public ResponseEntity<Page<Vacation>> vacations(
            @RequestParam(name = "pageSize", defaultValue = "10", required = false) Integer pageSize,
            @RequestParam(name = "pageIndex", defaultValue = "0", required = false) Integer pageIndex) {
        return new ResponseEntity<>(vacationRepository.findAll(PageRequest.of(pageIndex, pageSize)), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Vacation>> vacationById(@PathVariable("id") int id) {
        return new ResponseEntity<>(vacationRepository.findById(id), HttpStatus.OK);
    }

    @GetMapping("/approve/{id}")
    public void approveVacation(@PathVariable("id") int id) {
        Optional<Vacation> op = vacationRepository.findById(id);
        if (op.isPresent()) {
            Vacation v = op.get();
            v.setVacationStatus(new VacationStatus(2));
            vacationRepository.save(v);
        }
    }

    @GetMapping("/reject/{id}")
    public void rejectVacation(@PathVariable("id") int id) {
        Optional<Vacation> op = vacationRepository.findById(id);
        if (op.isPresent()) {
            Vacation v = op.get();
            v.setVacationStatus(new VacationStatus(3));
            vacationRepository.save(v);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Object> saveVacation(@RequestBody VacationDTO vacation) {
        return new ResponseEntity<>(vacationRepository.saveAndFlush(mapper.map(vacation, Vacation.class)),
                HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteVacationById(@PathVariable("id") int id) {
        vacationRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<List<Vacation>> allVacationsByUsername(@PathVariable("username") String username) {
        return new ResponseEntity<>(vacationRepository.findAllByEmployee(new Employee(username)), HttpStatus.OK);

    }
}