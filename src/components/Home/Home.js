import React,{useEffect,useContext} from "react";


import { Container,Row,Col,Card,ListGroup} from 'react-bootstrap';
import { isLoggedinContext } from "../Context/Context";

import Loader from 'react-loader-spinner'

import Jumbo from "../Jumbo/Jumbo"


const Home=(props)=>{
    const [LogIn]=useContext(isLoggedinContext);

    useEffect(()=>{
            props.render(LogIn.userId);
        },[LogIn.userId,LogIn.token])
    
 

    let renderList;
    if(props.todos.length===0){
        renderList=<h4 style={{textAlign:"center"}}>No todos found</h4>;
    }
    else{
      let list=props.todos;
        renderList=list.map((l)=>{
               return <ListGroup.Item style={{background:"#E9ECEF",color:"",textAlign:"center", borderRadius:"20px", padding:"20px",marginBottom:"20px"}} key={l._id} onClick={()=>props.onRemove(l._id)}>{l.title}</ListGroup.Item>
           })
           
    }


    let loaded=props.loading;
    return(
        <>
  <Jumbo text="To-Do-List"/>
  <Container>
      <Row>
          <Col >
        <Card style={{background:""}} >
            <Card.Body>
            <ListGroup  variant="flush" >
                {renderList.length!==0 && <h6 style={{textAlign:"center",fontSize:"small",color:"#697077"}}>Click on todo for deleting</h6>}
            {renderList}
            {loaded && <Loader
            type="Bars"
            color="#343A40"
            height={100}
            width={100}
            timeout={3000}
            style={{textAlign:"center"}}
             />}
            </ListGroup>
            
              
            </Card.Body>
        </Card> 
          </Col>
      </Row>
  </Container>
</>
    );
}

export default Home;