import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";
import CandidateCard from "./CandidateCard";


// realtime db
import "firebase/auth";
import Database from "firebase/database"
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
import firebase from '../../util/firebase'
import { getDatabase } from "firebase/database";
import { ref as sRef } from 'firebase/storage';

const PollingStation = ({voterId}) => {
  const [candidate1URL, changeCandidate1Url] = useState(LoadingCircles);
  const [candidate2URL, changeCandidate2Url] = useState(LoadingCircles);
  const [candidate3URL, changeCandidate3Url] = useState(LoadingCircles);
  const [candidate4URL, changeCandidate4Url] = useState(LoadingCircles);
  const [candidate5URL, changeCandidate5Url] = useState(LoadingCircles);

  const [showresults, changeResultsDisplay] = useState(false);
  const [buttonStatus, changeButtonStatus] = useState(false);

  const [candidate1Votes, changeVote1] = useState("--");
  const [candidate2Votes, changeVote2] = useState("--");
  const [candidate3Votes, changeVote3] = useState("--");
  const [candidate4Votes, changeVote4] = useState("--");
  const [candidate5Votes, changeVote5] = useState("--");

  const [prompt, changePrompt] = useState("--");

  useEffect(() => {
    const getInfo = async () => {
      // vote count stuff
      let voteCount = await window.contract.getVotes({
        prompt: localStorage.getItem("prompt"),
      });
      changeVote1(voteCount[0]);
      changeVote2(voteCount[1]);
      changeVote3(voteCount[2]);
      changeVote4(voteCount[3]);
      changeVote5(voteCount[4]);

      // image stuff

      changeCandidate1Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate1"),
        })
      );
      changeCandidate2Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate2"),
        })
      );
      changeCandidate3Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate3"),
        })
      );
      changeCandidate4Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate4"),
        })
      );
      changeCandidate5Url(
        await window.contract.getUrl({
          name: localStorage.getItem("Candidate5"),
        })
      );
      

      changePrompt(localStorage.getItem("prompt"));

      // vote checking stuff

      let didUserVote = await window.contract.didParticipate({
        prompt: localStorage.getItem("prompt"),
        user: window.accountId,
      });

      changeResultsDisplay(didUserVote);
      changeButtonStatus(didUserVote);
    };

    getInfo();
  }, []);

  const addVote = async (index) => {
   // changeButtonStatus(true);

    const db = getDatabase();    
    await window.contract.addVote({
      prompt: localStorage.getItem("prompt"),
      index: index,
    });

    await window.contract.recordUser({
      prompt: localStorage.getItem("prompt"),
      user: window.accountId,
    });

    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem("prompt"),
    });
    changeVote1(voteCount[0]);
    changeVote2(voteCount[1]);
    changeVote3(voteCount[2]);
    changeVote4(voteCount[3]);
    changeVote5(voteCount[4]);
    
    changeResultsDisplay(true);
    localStorage.setItem("voterId",true);

  };

  return (
    <Container>
      <Row>
       <CandidateCard candidateURL={candidate1URL} showresults={showresults} candidateVotes={candidate1Votes} buttonStatus={buttonStatus} addVote={addVote} index={0} />
       <CandidateCard candidateURL={candidate2URL} showresults={showresults} candidateVotes={candidate2Votes} buttonStatus={buttonStatus} addVote={addVote} index={1} />
       <CandidateCard candidateURL={candidate3URL} showresults={showresults} candidateVotes={candidate3Votes} buttonStatus={buttonStatus} addVote={addVote} index={2} />
       <CandidateCard candidateURL={candidate4URL} showresults={showresults} candidateVotes={candidate4Votes} buttonStatus={buttonStatus} addVote={addVote} index={3} /> 
       <CandidateCard candidateURL={candidate5URL} showresults={showresults} candidateVotes={candidate5Votes} buttonStatus={buttonStatus} addVote={addVote} index={4} />
      </Row>
    </Container>
  );
};

export default PollingStation;


/*
<Row className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#c4c4c4",
              height: "20vh",
              alignItems: "center",
              padding: "2vw",
              textAlign: "center",
            }}
          >
            {prompt}
          </div>
        </Row>

*/