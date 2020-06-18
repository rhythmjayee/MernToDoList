import React from "react"

import {Row,Col,Jumbotron} from "react-bootstrap"


const Jumbo=(props)=>{
    return(
        // <Container>
      <Row style={{marginTop:"30px",paddingTop:"50px"}}>
          <Col style={{marginTop:"",}}>
          <Jumbotron style={{borderRadius:"50px",padding:"10px"}} >
              <h1 style={{textAlign:"center"}}>{props.text}</h1>
          </Jumbotron>
          
          </Col>
      </Row>
//   </Container>
    );
}


export default Jumbo;