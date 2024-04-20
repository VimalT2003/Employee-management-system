import React, { useState } from 'react'
import "./PostEmployee.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

function PostEmployee() {
    const navigate=useNavigate();
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        phone:"",
        department:""
    })

    const handleInputChange = (event)=> {
         const {name,value}= event.target;
        setFormData({
            ...formData,
            [name]:value,
        })   
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/employee", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(formData)
            })

            const data = await response.json();
            console.log("Employee created : ", data)
            Swal.fire({
                title: "Employee Created!",
                text: "Employee added successfully!",
                icon: "success"
              });
            navigate('/')

        } catch (error) {
            console.log("Eror creating Employee : ",error.message);
        }
    }
    return (
        <div className='center-form'>
            <h1 className="mb-4"> <FontAwesomeIcon  icon={faPersonCirclePlus} /> Add new Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleInputChange}
                   />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleInputChange}
                   />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                   />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control
                      type="text"
                      name="department"
                      placeholder="Enter department"
                      value={formData.department}
                      onChange={handleInputChange}
                   />
                </Form.Group>

                <Button variant="primary" type="submit" className='w-100 transform'>Post Employee</Button>
            </Form>

        </div>
    );
}

export default PostEmployee
