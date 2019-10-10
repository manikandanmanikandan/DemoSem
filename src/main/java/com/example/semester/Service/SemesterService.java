package com.example.semester.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.semester.DTO.BaseDTO;
import com.example.semester.DTO.PaginationRequestDTO;
import com.example.semester.DTO.PaginationResponseDTO;
import com.example.semester.DTO.SemesterResultDTO;
import com.example.semester.Entity.SemesterResult;
import com.example.semester.Enum.CodeDescription;
import com.example.semester.Repository.SemesterRepository;
import com.example.semester.Validation.Validate;

@Service
public class SemesterService {

	@Autowired
	SemesterRepository semesterRepository;

	// Add
	public Object addStudentDetails(SemesterResultDTO semesterResultDTO) {
		try {
			Validate.notnull(semesterResultDTO, CodeDescription.INVALID_DATA);
			Validate.notnull(semesterResultDTO.getName(), CodeDescription.PARAMETER_MISSING, "name");
			Validate.notnull(semesterResultDTO.getRegisterNumber(), CodeDescription.PARAMETER_MISSING, "registerName");
			Validate.notnull(semesterResultDTO.getMarkOne(), CodeDescription.PARAMETER_MISSING, "markOne");
			Validate.notnull(semesterResultDTO.getMarkTwo(), CodeDescription.PARAMETER_MISSING, "markTwo");
			Validate.notnull(semesterResultDTO.getMarkThree(), CodeDescription.PARAMETER_MISSING, "markThree");

			SemesterResult semesterResult = new SemesterResult(semesterResultDTO);
			semesterRepository.save(semesterResult);
		}catch (DataIntegrityViolationException divEX) {
			if (divEX.getMostSpecificCause().toString().contains("UNI_REGNUM")) {
		return new BaseDTO(CodeDescription.REGISTER_NUMBER, false,semesterResultDTO.getRegisterNumber()+ " already exists");
		}
				
		}catch (Exception e) {
			return new BaseDTO(CodeDescription.INTERNAL_SERVER_ERROR, false, "");
		}
		return new BaseDTO(CodeDescription.SUCCESS, true, "");

	}

	// Get By id
	public Object getStudentById(Long id) {
		try {
			// Validation
			Validate.notnull(id, CodeDescription.PARAMETER_MISSING, "id");
			SemesterResult semesterResult = semesterRepository.getOne(id);
			SemesterResultDTO semesterResultdto = new SemesterResultDTO(semesterResult);
			return new BaseDTO(CodeDescription.SUCCESS, true, semesterResultdto);
		} catch (Exception e) {
			return new BaseDTO(CodeDescription.INTERNAL_SERVER_ERROR, false, "");
		}
	}

	// update
	public Object updateStduentDetails(SemesterResultDTO semesterResultDTO) {
		try {
			Validate.notnull(semesterResultDTO, CodeDescription.INVALID_DATA);
			Validate.notnull(semesterResultDTO.getId(), CodeDescription.PARAMETER_MISSING, "id");
			Validate.notnull(semesterResultDTO.getName(), CodeDescription.PARAMETER_MISSING, "name");
			Validate.notnull(semesterResultDTO.getRegisterNumber(), CodeDescription.PARAMETER_MISSING, "registerName");
			Validate.notnull(semesterResultDTO.getMarkOne(), CodeDescription.PARAMETER_MISSING, "markOne");
			Validate.notnull(semesterResultDTO.getMarkTwo(), CodeDescription.PARAMETER_MISSING, "markTwo");
			Validate.notnull(semesterResultDTO.getMarkThree(), CodeDescription.PARAMETER_MISSING, "markThree");
			SemesterResult semesterResult = new SemesterResult(semesterResultDTO);
			semesterRepository.save(semesterResult);
		}catch (DataIntegrityViolationException divEX) {
			if (divEX.getMostSpecificCause().toString().contains("UNI_REGNUM")) {
		return new BaseDTO(CodeDescription.REGISTER_NUMBER, false,semesterResultDTO.getRegisterNumber()+ " already exists");
			}
				
		} catch (Exception e) {
			return new BaseDTO(CodeDescription.INTERNAL_SERVER_ERROR, false, "");
		}
		return new BaseDTO(CodeDescription.SUCCESS, true, "");

	}

	// Delete
	public Object deleteById(Long id) {
		try {
			SemesterResult sr = semesterRepository.getOne(id);
			if (sr != null) {
				semesterRepository.deleteById(id);
				return new BaseDTO(CodeDescription.SUCCESS, true, "delete id ");
			} else
				return new BaseDTO(CodeDescription.N0T_FOUND, false, CodeDescription.N0T_FOUND.getDescription());
		} catch (Exception ex) {
			return new BaseDTO(CodeDescription.DATA_ACCESS_EXCEPTION, false, null);
		}
	}
	
	
	/*
	 * //pagianation public Object getSemesterResultPagination(PaginationRequestDTO
	 * paginationRequestDTO) {
	 * Validate.notnull(paginationRequestDTO,CodeDescription.INVALID_DATA); String
	 * str= null; String sortField=paginationRequestDTO.getSortField();
	 * if(paginationRequestDTO.getStr() != null &&
	 * !paginationRequestDTO.getStr().trim().isEmpty() ) str =
	 * paginationRequestDTO.getStr(); Pageable pageable = null;
	 * if(paginationRequestDTO.getSortOrder().equalsIgnoreCase("ASC")){ pageable =
	 * PageRequest.of(paginationRequestDTO.getPage(),paginationRequestDTO.getSize(),
	 * Sort.Direction.ASC,sortField); }else{ pageable =
	 * PageRequest.of(paginationRequestDTO.getPage(),paginationRequestDTO.getSize(),
	 * Sort.Direction.DESC,sortField); }
	 * 
	 * Page<SemesterResult> semesterTemplate =semesterRepository.findAll(pageable);
	 * PaginationResponseDTO pagenationResponseDTO=new PaginationResponseDTO();
	 * pagenationResponseDTO.setNumberofelement(semesterTemplate.getNumberOfElements
	 * ());
	 * pagenationResponseDTO.setTotalelement(semesterTemplate.getTotalElements());
	 * pagenationResponseDTO.setTotalpage(semesterTemplate.getTotalPages());
	 * 
	 * ArrayList<SemesterResultDTO> semesterTemplatedto =new
	 * ArrayList<SemesterResultDTO>(); for(SemesterResult
	 * entity:semesterTemplate.getContent()) { SemesterResultDTO data =new
	 * SemesterResultDTO(entity); semesterTemplatedto.add(data); }
	 * pagenationResponseDTO.setContents(semesterTemplatedto);
	 * 
	 * return new BaseDTO(CodeDescription.SUCCESS,true,pagenationResponseDTO);
	 * 
	 * }
	 */
	 
	
	
	//pagianation
		public Object getSemesterResultPagination() {
			try {
				List<SemesterResult> semesterTemplate = new ArrayList<SemesterResult>();
		        semesterTemplate =semesterRepository.getAll();
		    System.out.println("semesterTemplate semesterTemplate ::"+semesterTemplate.size());
			ArrayList<SemesterResultDTO> semesterTemplatedto =new ArrayList<SemesterResultDTO>();
			for(SemesterResult entity:semesterTemplate){
				SemesterResultDTO data =new SemesterResultDTO(entity);
				semesterTemplatedto.add(data);		    
			}			
			return new BaseDTO(CodeDescription.SUCCESS,true,semesterTemplatedto);	
			
		}catch (Exception e) {
			return new BaseDTO(CodeDescription.INTERNAL_SERVER_ERROR, false, "");
		}
		}

}
