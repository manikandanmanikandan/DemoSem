package com.example.semester.DTO;

import com.example.semester.Enum.CodeDescription;

import lombok.Data;

@Data
public class BaseDTO {

	Boolean status;
	Integer code;
	String description;
	Object content;
	public BaseDTO() {}
	
	public BaseDTO(CodeDescription codedescription,boolean status, Object response)
	{
		this.code=codedescription.code;
		this.description=codedescription.description;
		this.status=status;
		this.setContent(response);
	}
	public BaseDTO(String description,Integer code,boolean status, Object response)
	{
		this.code=code;
		this.description=description;
		this.status=status;
		this.setContent(response);
	}
	public BaseDTO(boolean status,CodeDescription codedescription, Object response,String msg)
	{
		this.code=codedescription.code;
		this.description=codedescription.description+":"+msg;
		this.status=status;
		this.setContent(response);
	}
	public BaseDTO(CodeDescription constraintViolation, boolean status, String msg) {
		this.description=constraintViolation.description+":"+msg;
		this.status=status;
		this.code=constraintViolation.code;
	}
}
