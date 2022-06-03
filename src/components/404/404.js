import {HashLink as Link } from "react-router-hash-link";
import './404.css';


export default function NotFound() {
  return (
    <div>
        <br/>
        <br/>
      <h3>404 <span style={{fontWeight:"normal"}}>Oh no! Seems like you got lost!</span></h3>
      <br/>
      <br/>
      <Link to="/"><button>Not to worry, return to safety here 🠮</button></Link>
      <br/>
      <br/>
      <img alt="404 bird" className='notfoundBird' src="img/404_bird.PNG"/>
    </div>
  )
}
