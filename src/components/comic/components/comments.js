import {HashLink as Link } from "react-router-hash-link";
import { useState } from "react"
import axios from "axios";

// comments form
// posts data to current path (for variables) and sends name and comment variables
export default function Comments({comments, addComment, center, currChapter, chapters}) {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    var currPath = window.location.href;

    function handleClick (name, comment) {
        if(name === "" || comment === "") {
            setError("Please enter name and comment");
        }
        else {
            setError("");
            addComment(name, comment);
            axios.post(currPath,{name:name,comment:comment})
            .then(response => {
              })
            .catch(error => {
                console.log(error)
               })
        }
    }
  return (
    <div className={`comments ${center ? "commentsCenter" : ""}`} >
      <h4>The list! The list! You've got to join the <Link to="/#mailing">mailing list!</Link></h4>
       <hr/>
       <h2>{chapters[currChapter]}</h2>
       <h4 style={{margin:"0px"}}>A penny for your thoughts?</h4>
        <span className="commentForm">
        <span>Add comment: </span> &nbsp; &nbsp;
        <input type="text" style={{width:"20%"}} placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)}></input>
        &nbsp;
        <input type="text" style={{width:"45%"}} placeholder="Comment..." value={comment} onChange={(e) => setComment(e.target.value)}></input>
        <button onClick={() => handleClick(name,comment)}>add</button>
        </span>
        <br/>
        <span style={{color:"red"}}>{error}</span>
      {comments.length > 0 ?
      <ul>
      {comments.map((comment, index) =>
          <span key={index}>
          <li><span className="username">{comment.name}</span><span className="comment">{comment.comment}</span></li>
          <hr/>
          </span>
      )}
      </ul>
      : "No comments yet, why won't yours be the first?"}
    </div>
  )
}
