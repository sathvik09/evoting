import React, { useEffect, useState,useRef } from "react";
import { Form,Nav } from "react-bootstrap";

import "../css/Login.css"

import "firebase/auth";
import firebase from "../../util/firebase";
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
// sha 256 for hashing
import { sha256, sha224 } from 'js-sha256';

const Login = props =>{
    const inputUser = useRef("");
    const inputPass = useRef("");
    const voterId = useRef("");

    const onButtonClick = event => {
        // `current` points to the mounted text input element
        event.preventDefault();
        console.log(inputUser.current.value);
        console.log(inputPass.current.value);
        firebase
        .auth()
        .signInWithEmailAndPassword(inputUser.current.value,inputPass.current.value)
        .then(()=>window.location.replace(window.location.href + "home"))
        .catch(err=>{
          switch(err.code){
            case "auth/invalid-email": alert("INVALID_EMAIL")
            case "auth/invalid-password": alert("INVALID_PASSWORD")
          }
        })

        
        inputUser.current.value = "";
        inputPass.current.value = "";
      };

        return (
            <div className="">
            <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>

        <label for="username">Voter ID</label>
        <input type="text" placeholder="Voter Id" id="voterId" ref={voterId} />

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" ref={inputUser} />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" ref={inputPass} />

        <Nav>
              <Nav.Link href='/register'>Register</Nav.Link>
            </Nav>
        <button onClick={onButtonClick}>Log In</button>
    </form>
    </div>
        );
}

export default Login;