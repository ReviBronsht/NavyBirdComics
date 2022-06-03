import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import './contact.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

// contact form via emailjs 
export default function Contact() {
  const [successMsg, setSuccessMsg] = useState("");

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('<service>', '<template>', form.current, '<id>')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    e.target.reset();
    setSuccessMsg("Success!");
  };

  return (
    <div>
      <br/>
      <h2>Contact me?</h2>
      <h4>I'm all ears!</h4>
      <img className="contactBird" alt="contact bird" src='/img/contact_bird.PNG'/>
      <br/>
      <br/>
      <div className='contactContainer'>
      <form ref={form} onSubmit={sendEmail}>
        <table>
          <tbody>
            <tr>
              <td>
              <label htmlFor="from_name">Name: </label>
              </td>
              <td>
              <input type="text" id="from_name" name="from_name" required/>
              </td>
            </tr>
            <tr>
              <td>
              <label htmlFor="from_email">Email: </label>
              </td>
              <td>
              <input type="email"id="from_email" name="from_email" required/>
              </td>
            </tr>
            <tr>
              <td>
              <label className="messageLabel" htmlFor="message">Message: </label>
              </td>
              <td>
              <textarea id="message" name="message" required/>
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td className="submitTD">
              <input type="submit" value="Send" />
              </td>
            </tr>
            <tr>
              <td>
              </td>
              <td className='succesMsg'>
              {successMsg}
              </td>
            </tr>
          </tbody>
        </table>
    </form>
      <div className='contactInfo'>
      <h4>You can use the form to your right, or the info here!</h4>
      Contact me by email: <a href = "mailto: navybirdcomics@gmail.com">navybirdcomics@gmail.com</a>
      <br/>
      <br/>
      <span className='socialIcons'>
      <a href = "https://www.instagram.com/navy.bird.art/" target="_blank"><InstagramIcon /></a>
      &nbsp;
      &nbsp;
      <a href = "https://www.twitter.com/NavyBirdArt" target="_blank"><TwitterIcon /></a>
      </span>
      </div>
    </div>
    </div>
  )
}
