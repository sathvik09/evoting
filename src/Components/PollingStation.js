import React, { useState, useEffect, useRef} from "react";
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
import { sha256 } from "js-sha256";
import { async } from "regenerator-runtime";
import { getDatabase, ref, child, push, update, onValue } from "firebase/database";
import { auto } from "@popperjs/core";

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

  const inputVal = useRef("");
  const [prompt, changePrompt] = useState("--");
  

function updateVoteStatus(username,password) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    username: username,
    password: password,
    hasVoted: true,
  };

  // Get a key for a new Post.
  let v = localStorage.getItem("voterId");

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + v] = postData;

  return update(ref(db), updates);
}



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
const starCountRef = ref(db, 'users/' + localStorage.getItem("voterId"));
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data.password);
  const val = inputVal.current.value;
  if(data.hasVoted){
    changeResultsDisplay(true);
    changeButtonStatus(true);
    alert("you have voted already for this year");
  }
  else{
    const a = async ()=>{
      if(data.password == sha256(val)){
      console.log("adgadfg");
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
      
    }
  }
  a();
  
  updateVoteStatus(data.username,data.password);
  changeResultsDisplay(true);
}
});

  };

  return (
    <Container>
      <Row>
        <Row>
        <div className="" style={{
        display:"flex",
        margin:"auto",
        width:"70%"
      }}>
          <p
          
          >Enter Password</p>
        <input
        placeholder="Enter password before voting" ref={inputVal} />
        </div>
        </Row>

       <CandidateCard candidateURL={candidate1URL} showresults={showresults} candidateVotes={candidate1Votes} buttonStatus={buttonStatus} addVote={addVote} index={0} />
       <CandidateCard candidateURL={candidate2URL} showresults={showresults} candidateVotes={candidate2Votes} buttonStatus={buttonStatus} addVote={addVote} index={1} />
       <CandidateCard candidateURL={candidate3URL} showresults={showresults} candidateVotes={candidate3Votes} buttonStatus={buttonStatus} addVote={addVote} index={2} />
       <CandidateCard candidateURL={candidate4URL} showresults={showresults} candidateVotes={candidate4Votes} buttonStatus={buttonStatus} addVote={addVote} index={3} /> 
       <CandidateCard candidateURL={candidate5URL} showresults={showresults} candidateVotes={candidate5Votes} buttonStatus={buttonStatus} addVote={addVote} index={4} />
      </Row>
      <Row className='justify-content-center d-flex align-items-center'>
          <div
            style={{
              margin:"5vw",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#c4c4c4",
              height: "5vh",
              width:"20vw",
              alignItems: "center",
              padding: "1vw",
              textAlign: "center",
            }}
          >
            {prompt}
          </div>
        </Row>
    </Container>
  );
};

export default PollingStation;


/*


*/