package com.example.ems.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.entity.Employee;
import com.example.ems.service.EmployeeService;

import jakarta.persistence.EntityNotFoundException;



@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    private final EmployeeService employeeService;

    // Manually define constructor to initialize final field
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee) {
        return employeeService.postEmployee(employee);
    }
    
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
    	return employeeService.getAllEmployees();
    }
    
    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEployee(@PathVariable Long id){
    	try {
    		employeeService.deleteEmployee(id);
    		return new ResponseEntity<>("Employee with ID " + id + " deleted successfully",HttpStatus.OK);
    	}catch(EntityNotFoundException e) {
    		return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    	}
    }
    
    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
    	Employee employee = employeeService.getEmployeeById(id);
        if(employee == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(employee);
    }
    
    @PutMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id,@RequestBody Employee employee){
    	Employee updateEmployee = employeeService.updateEmployee(id, employee);
    	
    	if(updateEmployee == null ) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    	return ResponseEntity.ok(updateEmployee);
    }
}