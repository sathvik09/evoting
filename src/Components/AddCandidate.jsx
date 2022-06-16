import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const AddCandidate = ({candidate,candidateName1URL,candidateName1})=>(
    <Form.Group className='mb-3'>
<Form.Group className='mb-3'>
            <Form.Label>Candidiate {candidate} Name</Form.Label>
              <Form.Control
                ref={candidateName1}
                placeholder='Enter Candidate Name'
                ></Form.Control>
          </Form.Group>
                  <Form.Group className='mb-3'>
                  <Form.Label>Candidate {candidate} Image URL</Form.Label>
                  <Form.Control
                    ref={candidateName1URL}
                    placeholder='enter Image URL'
                  ></Form.Control>
                </Form.Group>
    </Form.Group>
)

export default AddCandidate;