import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { async } from "regenerator-runtime";
import "../css/NewPoll.css"
import AddCandidate from "./AddCandidate";

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
  await window.contract.addToPromptArray({ prompt: promptRef.current.value });

    alert("head back to home page");
  };

  return (
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
  );
};

export default NewPoll;
