import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
<<<<<<< HEAD
import "../css/NewPoll.css";
=======
import { async } from "regenerator-runtime";
import "../css/NewPoll.css"
import AddCandidate from "./AddCandidate";
>>>>>>> polling

const NewPoll = (props) => {
  const candidateName1 = useRef();
  const candidateName2 = useRef();
  const candidateName3 = useRef();
  const candidateName4 = useRef();
  const candidateName5 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();
  const candidateName3URL = useRef();
  const candidateName4URL = useRef();
  const candidateName5URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);
  const [fields,addField] = useState([]);

  const addUrl = async () =>{
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName3.current.value,
      url: candidateName3URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName4.current.value,
      url: candidateName4URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName5.current.value,
      url: candidateName5URL.current.value,
    });
  }

  const sendToBlockChain = async () => {
  //  changeDisable(true);
   await addUrl();
   await window.contract.addCandidatePair({
    prompt: promptRef.current.value,
    name1: candidateName1.current.value,
    name2: candidateName2.current.value,
    name3: candidateName3.current.value,
    name4: candidateName4.current.value,
    name5: candidateName5.current.value,
  });
  await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
<<<<<<< HEAD
    <div className="cover">
            <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>

        <label for="username">Voter ID</label>
        <input type="text" placeholder="Voter Id" id="voterId" />

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username"  />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" />
        
        <button>Log In</button>
    </form>
    </div>
    
    // <Container style={{ marginTop: "10px" }}>
    //   <Form>
    //     <Form.Group className='mb-3'>
    //       <Form.Label>Candidiate 1 Name</Form.Label>
    //       <Form.Control
    //         ref={candidateName1}
    //         placeholder='Enter Candidate Name'
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='mb-3'>
    //       <Form.Label>Candidate 1 Image URL</Form.Label>
    //       <Form.Control
    //         ref={candidateName1URL}
    //         placeholder='enter Image URL'
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='mb-3'>
    //       <Form.Label>Candidiate 2 Name</Form.Label>
    //       <Form.Control
    //         ref={candidateName2}
    //         placeholder='Enter Candidate Name'
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='mb-3'>
    //       <Form.Label>Candidate 2 Image URL</Form.Label>
    //       <Form.Control
    //         ref={candidateName2URL}
    //         placeholder='enter Image URL'
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='mb-3'>
    //       <Form.Label>Prompt</Form.Label>
    //       <Form.Control ref={promptRef} placeholder='Add Prompt'></Form.Control>
    //     </Form.Group>
    //   </Form>

    //   <Button
    //     disabled={disableButton}
    //     onClick={sendToBlockChain}
    //     variant='primary'
    //   >
    //     Submit
    //   </Button>
    // </Container>
=======
    <Container style={{ marginTop: "10px" }}>
    <Form>
      <AddCandidate candidate={1} candidateName1={candidateName1} candidateName1URL={candidateName1URL} />
      <AddCandidate candidate={2} candidateName1={candidateName2} candidateName1URL={candidateName2URL} />
      <AddCandidate candidate={3} candidateName1={candidateName3} candidateName1URL={candidateName3URL} />
      <AddCandidate candidate={4} candidateName1={candidateName4} candidateName1URL={candidateName4URL} />
      <AddCandidate candidate={5} candidateName1={candidateName5} candidateName1URL={candidateName5URL} />
      <Form.Group className='mb-3'>
        <Form.Label>Prompt</Form.Label>
        <Form.Control ref={promptRef} placeholder='Add Prompt'></Form.Control>
      </Form.Group>
      <div className="button-cover">
      <Button
        disabled={disableButton}
        onClick={sendToBlockChain}
        variant='primary'
      >
        Submit
      </Button>
      </div>
    </Form>
    </Container>
>>>>>>> polling
  );
};

export default NewPoll;
