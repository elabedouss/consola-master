package com.consola.repositories;

import com.consola.model.Employee;
import com.consola.model.Vacation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationRepository extends JpaRepository<Vacation, Integer>, JpaSpecificationExecutor<Vacation> {
	
	List<Vacation> findAllByEmployee(Employee employee);
}