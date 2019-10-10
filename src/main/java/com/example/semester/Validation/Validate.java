package com.example.semester.Validation;

import com.example.semester.Enum.CodeDescription;
import com.example.semester.Exception.BadRequestException;

import org.springframework.util.StringUtils;


public class Validate {
	public static void notnull(Object obj,CodeDescription codeDescription)
	{
		if(obj==null || StringUtils.isEmpty(obj))
		{
			System.out.println("Object Not Found");
			throw new BadRequestException(codeDescription);
		}
	}
	
	public static void notnull(Object obj,CodeDescription codedescription,String fieldname)
	{
		if(obj==null || StringUtils.isEmpty(obj))
		{
			throw new BadRequestException(codedescription,fieldname);
			
		}
	}
	
	public static void notnull(long id , CodeDescription codedescription)
	{
		if(id<1)
		{
			throw new BadRequestException(codedescription);
		}
	}
	
	
	
}
