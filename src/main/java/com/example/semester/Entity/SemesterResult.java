package com.example.semester.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.example.semester.DTO.SemesterResultDTO;

import lombok.Data;

@Data
@Entity

@Table(name = "semester_result" , uniqueConstraints={
@UniqueConstraint(name="UNI_REGNUM",columnNames={"register_number"})})
public class SemesterResult {

@Id
@GeneratedValue(strategy=GenerationType.AUTO)
private Long id;

@Column(length=50)
private String name;

@Column(name="register_number")
private String registerNumber;

@Column(name="mark_one")
private Integer markOne;

@Column(name="mark_two")
private Integer markTwo;

@Column(name="mark_three")
private Integer markThree;

@Column(name="total_mark")
private Integer totalMark;

@Column(name="average")
private Double average;

public SemesterResult() {}

public SemesterResult(SemesterResultDTO semesterResultDTO){

this.id = semesterResultDTO.getId();
this.name = semesterResultDTO.getName();
this.registerNumber = semesterResultDTO.getRegisterNumber();
this.markOne = semesterResultDTO.getMarkOne();
this.markTwo = semesterResultDTO.getMarkTwo();
this.markThree = semesterResultDTO.getMarkThree();
this.totalMark = semesterResultDTO.getTotalMark();
this.average = semesterResultDTO.getAverage();



}



}