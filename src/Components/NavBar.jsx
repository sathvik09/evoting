import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

import { login, logout } from "../utils";

import BlockVoteLogo from "../assets/evote1.jpg";

import firebase from "../../util/firebase"
import "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';


const NavBar = ()=>{
    const signOut = ()=>{
        firebase.auth().signOut()
        .then(()=>window.location.replace("/"))
      }
    return(
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
)}

export default NavBar;