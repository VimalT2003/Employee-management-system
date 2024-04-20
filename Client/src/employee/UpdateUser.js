import React, { useEffect } from 'react'
import { useState } from 'react';
import "./UpdateUser.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faUserPen } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';



const UpdateUser = () => {

    const {id} = useParams();
    const navigate = useNavigate()

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

    useEffect(()=>{
        const fetchEmployee = async ()=>{
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                const data = await response.json();
                setFormData(data)

            } catch (error) {
                console.log("Eror creating Employee : ",error.message);
            }
        }

        fetchEmployee();

    },[id])

    const handleUpdate = async (e) =>{
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
            method:"PUT",
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(formData)
        })
        const data =await response.json();
        console.log("User Updated :",data );
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
            title: "Updated successfully"
          });
        navigate('/')
        } catch (error) {
            console.log("Eror creating Employee : ",error.message);
        }
    }
   
  return (
    <div className='center-form'>
    <h1 className='mb-4'> <FontAwesomeIcon  icon={faUserPen} /> Edit Employee</h1>
    <Form onSubmit={handleUpdate}>
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

        <Button variant="primary" type="submit" className='w-100 transform' >
        Edit Employee</Button>
    </Form>

</div>
  )
}

export default UpdateUser
