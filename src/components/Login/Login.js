import React, { useState,useContext } from "react";
import axios from 'axios';


import {Card,Col,Row,Container,Form,Button} from "react-bootstrap";
import { isLoggedinContext } from "../Context/Context";

import Jumbo from "../Jumbo/Jumbo"
import { Redirect} from "react-router-dom";

const Login=(props)=>{
    const [LogIn,setLogIn]=useContext(isLoggedinContext);
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    });

    const inputHandler=(event)=>{
        console.log(event.target.name);
        let value=event.target.value;
        setInputs({
            ...inputs,
            [event.target.name]:value
        })
       
    }

    

    const submitHandler=()=>{
        const user=inputs;
        axios.post("http://localhost:5000/login",user)
      .then(res=>{
        // console.log(res.status);
    //   console.log(res.data);
    //   console.log(res.data.user._id);
    let uId=res.data.userId;
    let tok=res.data.token;

        if(res.data!==null){
         setLogIn({
             userId:uId,
             isLogIn:true,
             token:tok
         });
        //  const tokenExpirationDate=new Date(new Date().getTime+100*60*60);
         localStorage.setItem(
             'userData',
             JSON.stringify({userId:uId,token:tok})
         );
             props.render(uId);
            }
      });
    }
    let check=LogIn.token;

    if(check){
        return  <Redirect strict from="/login" to="/" />
    }

    return(
        <Container>
            <Jumbo text="Login"/>
            <Row>
                <Col>
                <Card style={{  }}>
            <Card.Body>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={inputs.email} name="email" onChange={inputHandler} placeholder="Enter email" />
                    
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={inputs.password} name="password" onChange={inputHandler} placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={submitHandler} type="button">
                    Submit
                </Button>
            </Form>
        </Card.Body>
        </Card>
                
           
                </Col>
            </Row>
        </Container>
    );
}



export default Login;