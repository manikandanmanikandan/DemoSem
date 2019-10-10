package com.example.semester.DTO;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class PaginationResponseDTO {

long totalelement;
	
	int totalpage;
	
	int numberofelement;
	
	List contents =new ArrayList();
}
