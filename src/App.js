import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";
import Register from "./Components/Register";

// images
import BlockVoteLogo from "./assets/evote1.jpg";

import getConfig from "./config";
import Login from "./Components/Login";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

import firebase from "../util/firebase"
import "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

export default function App() {
  const [user, setUser] = useState("");

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setUser(user);
      }
      else{
        setUser("");
      }
    })
  },[user])

  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  const signOut = ()=>{
    firebase.auth().signOut()
    .then(()=>window.location.replace("/"))
  }

  return (
    <Router>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={BlockVoteLogo} style = {{width:90}}></img>
          </Navbar.Brand>
          <Navbar.Text style={{fontSize:'40px', marginTop:'10px', fontFamily:'Indie Flower', fontWeight:800, color:"#1F58BF"}}>
            {'BlockVote'}
          </Navbar.Text>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "LogintoNear" : window.accountId}
              </Nav.Link>
              <Nav.Link onClick={signOut}>
                SignOut
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path='/'>
        <Login /> 
        </Route>
        <Route exact path='/home'>
        <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path='/register'>
          <Register />
        </Route>
        <Route exact path='/PollingStation'>
          <PollingStation />
        </Route>
        <Route exact path='/NewPoll'>
          <NewPoll />
        </Route>
      </Switch>
    </Router>
  );
}
