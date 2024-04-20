package com.example.ems.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.ems.entity.Employee;
import com.example.ems.repository.EmployeeRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional // Enable transaction management
public class EmployeeService {
  
    private final EmployeeRepository employeeRepository;
    
    @Autowired // Autowire the repository
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    
    public Employee postEmployee(Employee employee) {
        // Ensure proper error handling
        try {
            return employeeRepository.save(employee);
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // You may throw custom exceptions or handle the error accordingly
            return null;
        }
    }
    
    public List<Employee>getAllEmployees(){
    	return employeeRepository.findAll();
    }
    
    public void deleteEmployee(Long id) {
    	if(!employeeRepository.existsById(id)) {
    		throw new EntityNotFoundException("Employee with ID "+ id + " not found");
    	}
    	employeeRepository.deleteById(id);
    }
    
    public Employee getEmployeeById(Long id) {
    	return employeeRepository.findById(id).orElse(null);
    }
    
    public Employee updateEmployee(Long id,Employee employee) {
    	Optional<Employee> optionalEmployee = employeeRepository.findById(id);
    	if(optionalEmployee.isPresent()) {
    		Employee existingEmployee = optionalEmployee.get();
    		
    		existingEmployee.setEmail(employee.getEmail());
    		existingEmployee.setName(employee.getName());
    		existingEmployee.setPhone(employee.getPhone());
    		existingEmployee.setDepartment(employee.getDepartment());
    		
    		return employeeRepository.save(existingEmployee);
    	}
    	return null;
    }
}