import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';



const Dashboard = () => {

  const navigate= useNavigate();

  const[employees, setEmployees] = useState([]);

  useEffect(() =>{
    const fetchEmployees = async() =>{
      try {
        const response= await fetch("http://localhost:8080/api/employees");
        const data = await response.json();
        setEmployees(data)

      } catch (error) {
        console.log("Eror creating Employee : ",error.message);
      }
    }

    fetchEmployees();

  },[])

  const handleDelete = async (EmployeeId) =>{
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${EmployeeId}`, {
        method:"DELETE",
      });

      if(response.ok){
        setEmployees((preEmployee) =>
          preEmployee.filter((employees) => employees.id !==EmployeeId)
        )
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Deleted successfully"
        });
      }
      console.log(`Employee with ID ${EmployeeId} deleted successfully` )
    } catch (error) {
      console.log("Error deleting employee:",error.message);
    }

  }

  const handleUpdate = (employeeId) =>{
    navigate(`/employee/${employeeId}`);
  }

  return (
    <div>
      <Container className='mt-5'>
        <Row>
          <Col>
          <h1 className='text-center'>Employee's List</h1>
          <Table striped bordered hover responsive className="mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) =>(
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Button variant="outline-secondary"
                      className="transform" 
                      onClick={()=>handleUpdate(employee.id)}>
                      Update
                    </Button>{" "}
                    <Button variant="outline-danger"
                      className="transform"
                      onClick={()=>handleDelete(employee.id)}>
                      Delete
                    </Button>{" "}
                  </td>
                </tr>

              ))}
            </tbody>

          </Table>
          </Col>
        </Row>

       </Container>
    </div>
  )
}

export default Dashboard
