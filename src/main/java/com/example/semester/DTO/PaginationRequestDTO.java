package com.example.semester.DTO;

import lombok.Data;

@Data
public class PaginationRequestDTO {
	Integer page;
	Integer size;
	Boolean sortDesc = true;
	String sortField = "id";
	String sortOrder = "asc";
	String str;
	
}
