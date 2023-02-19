import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { sendMessage } from "../../redux/SendMessageRedux/send_message_redux";
import { getIsSuccessMessage } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { UploadImg } from "../Home/UploadImg";
import sanitizeHtml from 'sanitize-html';

type FormType = {};
export const Form = (props: FormType) => {
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);
  const initialRef: any = null;
  const captchaRef = useRef(initialRef);
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
  const [isVerificationToken, setIsVerificationToken] = useState(false);
  //send token captcha
  const onSendToken = (value: any) => {
    if (value) {
      setIsVerificationToken(true);
      setValidation("");
    }
    value.preventDefault();
  };
  // SendMessage
  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* check */
    if (name.length === 0 || email.length === 0 || message.length === 0) {
      return setValidation("All field require");
    }
    captchaRef.current.reset();
    if (isVerificationToken === false) {
      return setValidation("Confirm the captcha");
    }
    dispatch(sendMessage(name, email, message, homePage, selectedFile));
    /* clean */
    setName("");
    setEmail("");
    setHomePage("");
    setMessage("");
    setValidation("");
    setIsVerificationToken(false);
    setSelectedFile([]);
    setPreview([]);
  };
  //-----
  return (
    <>
      <form
        onSubmit={onSendMessage}
        className="z__index__6 position__relative form__post"
      >
        <h1 className="mb-4">Leave a message</h1>
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

        <ReCAPTCHA
          ref={captchaRef}
          sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
          onChange={onSendToken}
          className="my-3"
        />

        <UploadImg
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        {/* button */}
        <div className="text-end">
          <button className="btn btn-primary mt-4">Send message</button>
        </div>
      </form>
    </>
  );
};
