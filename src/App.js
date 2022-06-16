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
import NavBar from './Components/NavBar';

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
  const [voterId,setVoterId] = useState("");

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
    localStorage.setItem("Candidate3", namePair[2]);
    localStorage.setItem("Candidate4", namePair[3]);
    localStorage.setItem("Candidate5", namePair[4]);
    localStorage.setItem("prompt", prompt);
    window.location.replace("PollingStation");
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
        <Login /> 
        </Route>
        <Route exact path='/home'>
        <NavBar />
        <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path='/register'>
          <Register setVoterId={setVoterId} voterIdS={voterId} />
        </Route>
        <Route exact path='/PollingStation'>
        <NavBar />
          <PollingStation voterId={voterId} />
        </Route>
        <Route exact path='/NewPoll'>
        <NavBar />
          <NewPoll />
        </Route>
      </Switch>
    </Router>
  );
}
