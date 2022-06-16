import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "../css/NewPoll.css";

const NewPoll = (props) => {

  const candidateName1 = useRef();
  const candidateName2 = useRef();

  const candidateName1URL = useRef();
  const candidateName2URL = useRef();

  const promptRef = useRef();

  const [disableButton, changeDisable] = useState(false);
  const [fields,addField] = useState([]);

  const sendToBlockChain = async () => {
    changeDisable(true);
    await window.contract.addUrl({
      name: candidateName1.current.value,
      url: candidateName1URL.current.value,
    });

    await window.contract.addUrl({
      name: candidateName2.current.value,
      url: candidateName2URL.current.value,
    });

    await window.contract.addCandidatePair({
      prompt: promptRef.current.value,
      name1: candidateName1.current.value,
      name2: candidateName2.current.value,
    });

    await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
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
  );
};

export default NewPoll;
