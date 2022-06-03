import MailchimpSubscribe from "react-mailchimp-subscribe";
import CustomForm from "./customform";

// sets up mailing component using mail chimp subscribe, uses custom form to create a custom form for it
export default function Mailing({mTitle,mText,mImg}) {
    const u = "<u>";
    const id = "<id>";
    const postUrl = `https://gmail.us20.list-manage.com/subscribe/post?u=${u}&id=${id}`;

  return (
    <div>
      <table className="mailing">
          <tbody>
              <tr>
                <td>
                    <span className="mTitle">{mTitle}</span>
                    <br/>
                    {mText}
                </td>
                <td> <img  alt="freebe" src={"https://drive.google.com/uc?export=view&id="+mImg} /></td>
                <td className="mailForm">
                <MailchimpSubscribe 
                url={postUrl}
                render={({ subscribe, status, message }) => (
                    <CustomForm
                        status={status} 
                        message={message}
                        onValidated={formData => subscribe(formData)}
                    />
                )}
                />
                </td>
              </tr>
          </tbody>
        </table>
    </div>
  )
}
