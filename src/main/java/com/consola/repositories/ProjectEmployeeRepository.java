package com.consola.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.consola.model.ProjectEmployee;
import com.consola.model.ProjectEmployeeId;

@Repository
public interface ProjectEmployeeRepository extends JpaRepository<ProjectEmployee, ProjectEmployeeId>, JpaSpecificationExecutor<ProjectEmployee> {

}
