import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


import React,{useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from 'axios';
import { Container,Row,Col } from 'react-bootstrap';


import './App.css';



import Header from "./components/Header/Header"
import Home from "./components/Home/Home"
import Create from "./components/Create/Create"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp" 
import { isLoggedinContext } from "./components/Context/Context";







function App() {
  const [LogIn,setLogIn] =useState({
    isLogIn:false,
    userId:"",
    token:null,
    expiration:null
  });

  const [todos,setTodos]= useState([]);

  const [isLoading,setLoading]=useState(true);

  let uid=LogIn.userId;
  let token=LogIn.token;

  const Render=(uid)=>{
    let list;
      axios.get(`http://localhost:5000/list/${uid}`,{
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer "+token
          }     
         })
      .then(res=>{
        list=res.data.todos;
        // console.log(list)
        setTodos(list);
        // setLoading(false); 
      })
  }


  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem("userData"));
    if(storedData && storedData.token ){
      setLogIn({
        isLogIn:true,
        userId:storedData.userId,
        token:storedData.token,
        expiration:new Date(storedData.expiration)
      })
    }
  },[token]);

  



     

  
  

  const addHandler=(todo)=>{
    setLoading(true); 

    let uid=LogIn.userId;
    const list = {
      title: todo,
      creator:uid
    };
    axios.post("http://localhost:5000/add",list,{
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+token
        }    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      Render(uid);
      setLoading(false); 
    })
    
  }

  const removeHandler=(index)=>{
    setLoading(true); 

    axios.delete(`http://localhost:5000/todo/${index}`,{

      headers: {
        'Content-Type': 'application/json',
      "Authorization":"Bearer "+token
      }
    })
    .then(res => {
      console.log(res);
      console.log(res.data);
      Render(uid);
      setLoading(false); 

    });
  }

  // let check=LogIn.isLogIn;
  

  return (
    <Router>
    <isLoggedinContext.Provider value={[LogIn,setLogIn]}>
    <Header/>
    <Container>
      <Row className="mr-2">
        <Col>

        <Switch>
      <Route path="/" exact>
          {token?<Home  loading={isLoading} render={Render} todos={todos} onRemove={removeHandler}/>:<Redirect to='/login'/>}
      </Route>
      <Route path="/create" exact>
      {token?<Create onAdd={addHandler} />:<Redirect to='/login'/>}
      </Route>
      <Route path="/login" exact>
      <Login  render={Render}/>
      </Route>
      <Route path="/signup" exact>
      <SignUp  render={Render}/>
      </Route>
    </Switch>

        </Col>
      </Row>
    </Container>
    </isLoggedinContext.Provider>

     
  </Router>
  );
}

export default App;
