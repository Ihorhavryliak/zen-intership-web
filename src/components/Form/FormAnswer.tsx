import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { sendAnswer } from "../../redux/SendMessageRedux/send_message_redux";
import { getIsSuccessMessage } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { UploadImg } from "../Home/UploadImg";
import sanitizeHtml from 'sanitize-html';

type FormType = {
  childId: number
};

export const FormAnswer = (props: FormType) => {
  const {childId} = props;
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);
  //set data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [homePage, setHomePage] = useState("");
  //sanitizeHtml
  const [message, setMessage] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const sanitizedInputValue = sanitizeHtml(event.target.value, {
      allowedTags: ['a', 'code', 'i', 'strong', 'span'],
      allowedAttributes: {
        'a': ['href', 'title', 'class']
      }
    });
    setMessage(sanitizedInputValue);
  };
  const [validation, setValidation] = useState("");
  // files
  const [selectedFile, setSelectedFile] = useState([]);
  const [preview, setPreview] = useState([]);

  // SendMessage
  const onSendAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* check */
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return setValidation("All field require");
    }
    dispatch(sendAnswer(name, email, message, homePage, childId, selectedFile));
    /* clean */
    setName("");
    setEmail("");
    setHomePage("");
    setMessage("");
    setValidation("");
    setSelectedFile([]);
    setPreview([]);
  };
  //-----
  return (
    <>
      <form
        onSubmit={onSendAnswer}
        className="z__index__6 position__relative form__post mt-4"
      >
        {/*     name */}
        <div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Your name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* email */}
        <div>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Your e-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* home page */}
        <div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Home page"
            value={homePage}
            onChange={(e) => setHomePage(e.target.value)}
          />
        </div>
        {/* message */}
        <div>
          <textarea
            className="form-control mb-3"
            placeholder="Your message*"
            value={message}
            onChange={handleInputChange}
          />
        </div>
        {validation.length > 0 && (
          <div className="not__valid">{validation}</div>
        )}
        {isSuccessSend === false && (
          <div className="not__valid">An error occurred, try again please</div>
        )}
        {/*    reCAPTCHA */}

      {/*   <ReCAPTCHA
          ref={captchaRef}
          sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
          onChange={onSendToken}
        /> */}

        <UploadImg
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        {/* button */}
        <div className="text-end">
          <button className="btn btn-primary mt-4">Send answer</button>
        </div>
      </form>
    </>
  );
};
