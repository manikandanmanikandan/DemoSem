package com.example.semester.Exception;

import com.example.semester.Enum.CodeDescription;

import lombok.Getter;

public class BadRequestException extends RuntimeException{
private static final long serialVersionUID = 591l;
	
	@Getter 
	private Integer code;
	
	@Getter
	private String description;
	
	boolean status = false;

	public BadRequestException(){}
	
	public BadRequestException(CodeDescription codedescription)
	{
		this.code=codedescription.code;
		this.description=codedescription.description;
		this.status=false;
		
		
		this.code=10001;
		this.description="Bad Request Exception";
		this.status=false;
	}
	public BadRequestException(CodeDescription codedescription, String parameter)
	{
		this.status=false;
		this.code=codedescription.code;
		this.description=codedescription.description+": '"+parameter+"'";
	}
}
