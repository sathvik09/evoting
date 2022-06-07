import React, { useEffect, useState,useRef } from "react";
import { Form,Nav } from "react-bootstrap";

// sha 256 for hashing
import { sha256, sha224 } from 'js-sha256';

// realtime db
import "firebase/auth";
import Database from "firebase/database"
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';


import "../css/Login.css"

import firebase from '../../util/firebase'
import { getDatabase, ref, set } from "firebase/database";

const Login = ()=>{
    const inputUser = useRef("");
    const inputPass = useRef("");
    const voterId = useRef("");
    const onButtonClick = event => {
        // `current` points to the mounted text input element
        event.preventDefault();

        firebase
        .auth()
        .createUserWithEmailAndPassword(inputUser.current.value,inputPass.current.value)
        .catch(err=>{
          switch(err.code){
            case "auth/email-already-in-use":
            case "auth/user-disabled":
            // case "auth/user-not-found":
            //   setEmailError(err.message);
            //   break;
            // case "auth/wrong-password":
            //   setPasswordError(err.message);
            //   break;
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
        <h3>Register Here</h3>

        <label for="username">Voter ID</label>
        <input type="text" placeholder="Voter Id" id="voterId" ref={voterId} />

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" ref={inputUser} />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" ref={inputPass} />

        <Nav>
              <Nav.Link href='/'>Login</Nav.Link>
            </Nav>

        <button onClick={onButtonClick}>Register</button>
    </form>
    </div>
        );
}

export default Login;