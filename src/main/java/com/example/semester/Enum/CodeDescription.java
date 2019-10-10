package com.example.semester.Enum;

public enum CodeDescription {

	SUCCESS(200,"Response Success"),
	CREATED(201,"Created"),
	ACCEPTED(202,"Created"),
	N0T_FOUND(404,"Not Found"),
	BAD_REQUEST(400,"Bad Request"),
	CONSTRAINT_VIOLATION(1062,"CONSTRAINT VIOLATION EXCEPTION"),
	INTERNAL_SERVER_ERROR(500,"Internal Server Error"),
	INVALID_DATA(1001,"Invalid Request"),
	PARAMETER_MISSING(1002,"Missing Parameter"),
	SOMETHING_WENT_WRONG(1004,"Something Went Wrong Try Again!"),
	DATA_ACCESS_EXCEPTION(10056,"Data Access Exception"),
	REGISTER_NUMBER(1009,"Student Id ");
	
	public Integer code;
	public String description;

	private CodeDescription(){}
	private CodeDescription(int code,String description){
		this.code=code;
		this.description=description;
	}
	private CodeDescription(int code,String description,String parameter){
		this.code=code;
		this.description=description+" : "+parameter;
	}
	public Integer getCode() {
		return code;
	}
	public String getDescription() {
		return description;
	}
	
	
	
	
	
}
