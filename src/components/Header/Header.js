import React,{useContext} from "react";
import {Navbar,Nav} from "react-bootstrap"

import {Link} from "react-router-dom";

import { isLoggedinContext } from "../Context/Context";

// import "./Header.css";



const Header=()=>{
  const [LogIn,setLogIn]=useContext(isLoggedinContext);



  const logoutHandler=()=>{
    setLogIn({
      ...LogIn,
      isLogIn:false,
      token:null
    });
    localStorage.removeItem("userData");
  }
  // let check=LogIn.isLogIn;
  let token=LogIn.token;
  
    return(
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
   <Link to="/"><Navbar.Brand >To-Do-List</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav style={{padding:"10px"}} className="mr-auto">
     {token?<Link  to="/create" style={{ textDecoration: 'none',color:"white" }}>Create</Link>:null}
    </Nav>
    <Nav style={{padding:"10px"}}>
       {!token?
       <>
       <Link  to="/login" style={{ textDecoration: 'none',color:"white",padding:"5px",marginRight:"10px" }}>Login</Link>
        <Link  to="/signup" style={{ textDecoration: 'none',color:"white",padding:"5px",marginRight:"10px"  }}>SignUp</Link> 
        </>:     
        <Link  to="/login" onClick={logoutHandler} style={{ textDecoration: 'none',color:"white" }}>logout</Link> 
      }  
    </Nav >
  </Navbar.Collapse>
</Navbar>
    );
}

export default Header;