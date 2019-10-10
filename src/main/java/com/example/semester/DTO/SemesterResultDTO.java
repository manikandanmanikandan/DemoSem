package com.example.semester.DTO;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.example.semester.Entity.SemesterResult;

import lombok.Data;
@Data
public class SemesterResultDTO {

	private Long id;

	private String name;

	private String registerNumber;

	private Integer markOne;

	private Integer markTwo;

	private Integer markThree;

	private Integer totalMark;

	private Double average;
	
	
	public SemesterResultDTO() {}

	public SemesterResultDTO(SemesterResult semesterResult){

	this.id = semesterResult.getId();
	this.name = semesterResult.getName();
	this.registerNumber = semesterResult.getRegisterNumber();
	this.markOne = semesterResult.getMarkOne();
	this.markTwo = semesterResult.getMarkTwo();
	this.markThree = semesterResult.getMarkThree();
	this.totalMark = semesterResult.getTotalMark();
	this.average = semesterResult.getAverage();



	}

	
	
}
