import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { GetAllMessageAPIType } from "../../api/post_message_api";
import { sendMessage } from "../../redux/SendMessageRedux/send_message_redux";
import { getIsSuccessMessage } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { UploadImg } from "../Home/UploadImg";

type FormType = {};
export const Form = (props: FormType) => {
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);

  const initialRef: any = null;
  const captchaRef = useRef(initialRef);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [homePage, setHomePage] = useState("");
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState("");
  //
  const [selectedFile, setSelectedFile] = useState([]);
  console.log(selectedFile, "selectedFile");
  const [preview, setPreview] = useState([]);

  const [isVerificationToken, setIsVerificationToken] = useState(false);

  const onSendToken = (value: any) => {
    /* check */
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
    /*     setName("");
    setEmail("");
    setHomePage("");
    setMessage("");
    setValidation("");
    setIsVerificationToken(false); */
  };
  //-----
  return (
    <>
      <form onSubmit={onSendMessage} className="z__index__6 position__relative form__post">
        <h1 className="h1__bold">Leave a message</h1>
        {/*     name */}
        <div>
          <input
            type="text"
            className="input"
            placeholder="Your name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* email */}
        <div>
          <input
            type="email"
            className="input"
            placeholder="Your e-mail*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* home page */}
        <div>
          <input
            type="text"
            className="input"
            placeholder="Home page"
            value={homePage}
            onChange={(e) => setHomePage(e.target.value)}
          />
        </div>
        {/* message */}
        <div>
          <textarea
            className="textarea__height"
            placeholder="Your message*"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
        />

        <UploadImg
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        {/* button */}
        <div>
          <button className="btn">Send message</button>
        </div>
      </form>
    </>
  );
};
