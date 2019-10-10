package com.example.semester.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.semester.DTO.PaginationRequestDTO;
import com.example.semester.DTO.SemesterResultDTO;
import com.example.semester.Service.SemesterService;


@RestController
@RequestMapping("/semester")
public class SemesterController {

	@Autowired
	SemesterService semesterService;
	
	// To List all Semester result for student results
	  @RequestMapping(value="/list",method=RequestMethod.GET) 
	  public Object getsemesterResultList(){
	  return semesterService.getSemesterResultPagination();
	  }
	
	//To add student details 
		@RequestMapping(value="/add",method=RequestMethod.POST)
		public Object addStudentDetails(@RequestBody SemesterResultDTO semesterResultDTO){
			return semesterService.addStudentDetails(semesterResultDTO);
		}
	
	
		//To get Student based on id
		@RequestMapping(value="/{id}",method=RequestMethod.GET)
		public Object getStudentById(@PathVariable Long id){
			return semesterService.getStudentById(id);
		}
	
	
		//To Update Student Details 
		@RequestMapping(value="/update", method=RequestMethod.PUT)
		public Object updateStduentDetails(@RequestBody SemesterResultDTO semesterResultDTO){
			return semesterService.updateStduentDetails(semesterResultDTO);
		}
		
		//To delete Student Detail 
		@RequestMapping(value="/delete/{id}",method=RequestMethod.DELETE)
		public Object deleteById(@PathVariable("id") Long id){
			return semesterService.deleteById(id);
		}
		
	
}
