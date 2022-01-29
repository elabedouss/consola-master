package com.consola.repositories;

import com.consola.model.VacationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VacationStatusRepository extends JpaRepository<VacationStatus, Integer>, JpaSpecificationExecutor<VacationStatus> {

}
