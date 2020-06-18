import React,{useState} from "react";
import {Card,Col,Row,Container,Form,Button} from "react-bootstrap";
import {Link} from "react-router-dom";

import Jumbo from "../Jumbo/Jumbo"

const Create =(props)=>{
    const [input,setInput]=useState("");


    const inputHandler=(event)=>{

        let set=event.target.value;
        setInput(set);
    }

    return(
        <Container>
            <Jumbo text="Create A TODO"/>
                <Row>
                 <Col>
                    <Card style={{ marginTop:"",padding:"20px",borderRadius:"20px"}}>
                        <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Add TODOS</Form.Label>
                                <Form.Control type="text" value={input} onChange={(event)=>inputHandler(event)} placeholder="Enter here..." />
                            </Form.Group>
                            <Link to="/"><Button variant="dark" onClick={()=>props.onAdd(input)} type="button">
                               Add
                            </Button>
                            </Link>
                            </Form>
                        </Card.Body>
                        </Card>
                </Col>
            </Row>
        </Container>
       
    );
}

export default Create;