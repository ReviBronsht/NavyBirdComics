import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useState } from "react";

// custom form component for mailchimp with custom status
export default function CustomForm({ status, message, onValidated }) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [showCheck, setShowCheck] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        email &&
        firstName &&
        email.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email,
            b_name: firstName,
        });
        setShowCheck(true);
    }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3 style={{margin:"0px"}}>It would be dreadful if you didn't join the list!</h3>
        join my mailing list
        {status === "sending" && (
          <div className="mcSending">
            sending...
          </div>
        )}
        {status === "error" && (
          <div 
            className="mcError"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            className="mcSuccess"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
      {showCheck ? <div>(Check your promotions folder!)</div> : ""}
        <div>
          <input
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            value={firstName}
            placeholder="Your name..."
          />

          <input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="your@email.com"
            required
          />

        </div>

        <input
          label="subscribe"
          type="submit"
        />
      </form>
    </div>
  )
}
