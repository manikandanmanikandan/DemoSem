package com.example.semester.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.semester.Entity.SemesterResult;

public interface SemesterRepository extends JpaRepository<SemesterResult,Long>{

	@Query("Select s from SemesterResult s order by s.id Asc")
	List<SemesterResult> getAll();

}
