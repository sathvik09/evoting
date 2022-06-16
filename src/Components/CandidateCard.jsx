import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const CandidateCard = props=>{

    return(
        <Col className='jutify-content-center d-flex'>
        <Container>
          <Row style={{ marginTop: "5vh", backgroundColor: "#c4c4c4" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "3vw",
              }}
            >
              <img
                style={{
                  height: "35vh",
                  width: "20vw",
                }}
                src={props.candidateURL}
              ></img>
            </div>
          </Row>
          {props.showresults ? (
            <Row
              className='justify-content-center d-flex'
              style={{ marginTop: "5vh" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "8vw",
                  padding: "10px",
                  backgroundColor: "#c4c4c4",
                }}
              >
                {props.candidateVotes}
              </div>
            </Row>
          ) : null}
          <Row
            style={{ marginTop: "5vh" }}
            className='justify-content-center d-flex'
          >
            <Button disabled={props.buttonStatus} onClick={() => props.addVote(props.index)}>
              Vote
            </Button>
          </Row>
        </Container>
      </Col>
    )
}

export default CandidateCard;