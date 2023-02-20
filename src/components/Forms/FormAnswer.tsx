import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { sendAnswer } from "../../redux/PostMessageRedux/post_message_redux";
import { getIsSuccessMessage } from "../../redux/PostMessageRedux/post_message_selector";
import { AppDispatch } from "../../redux/store";
import { UploadImg } from "../Home/UploadImg";
import sanitizeHtml from "sanitize-html";
import { isValidUrl } from "../../utils/validationUrl";

export const FormAnswer = (props: FormType) => {
  const { isConnected } = props;
  const { childId } = props;
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);
  const initialRef: any = null;
  const captchaRef = useRef(initialRef);
  const [validation, setValidation] = useState({
    homePage: "",
    name: "",
    email: "",
    message: "",
    token: "",
  });
  //set data
  const [name, setName] = useState("");
  const onSetName = (value: string) => {
    setName(value);
    setValidation({ ...validation, name: "" });
  };
  const [email, setEmail] = useState("");
  const onSetEmail = (value: string) => {
    setEmail(value);
    setValidation({ ...validation, email: "" });
  };
  const [homePage, setHomePage] = useState("");
  const onSetHomePage = (value: string) => {
    setHomePage(value);
    setValidation({ ...validation, homePage: "" });
  };
  //sanitizeHtml
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const sanitizedInputValue = sanitizeHtml(event.target.value, {
      allowedTags: ["a", "code", "i", "strong", "span"],
      allowedAttributes: {
        a: ["href", "title", "class"],
      },
    });
    setMessage(sanitizedInputValue);
    setValidation({ ...validation, message: "" });
  };

  // files
  const [selectedFile, setSelectedFile] = useState([]);
  const [isVerificationToken, setIsVerificationToken] = useState(false);
  const [preview, setPreview] = useState([]);

  //send token captcha
  const onSendToken = (value: any) => {
    if (value) {
      setIsVerificationToken(true);
      setValidation({ ...validation, token: "" });
    }
    value.preventDefault();
  };
  // SendMessage
  const onSendAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check validation ---
    const pattern = /^[a-zA-Z0-9]+$/;
    if (!pattern.test(name)) {
      return setValidation({
        ...validation,
        name: "No correct enter name. Example: Bred",
      });
    }
    const patternEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!patternEmail.test(email)) {
      return setValidation({ ...validation, email: "No valid email" });
    }
    if (name.length === 0) {
      return setValidation({ ...validation, name: "Field require" });
    } else if (email.length === 0) {
      return setValidation({ ...validation, email: "Field require" });
    } else if (message.length === 0) {
      return setValidation({ ...validation, message: "Field require" });
    }
    if (!isValidUrl(homePage)) {
      return setValidation({ ...validation, homePage: "Not correct url" });
    }
    if (isVerificationToken === false) {
      return setValidation({ ...validation, token: "Confirm captcha" });
    }
    //send ---
    dispatch(sendAnswer(name, email, message, homePage, childId, selectedFile));
    /* clean */
    setName("");
    setEmail("");
    setHomePage("");
    setMessage("");
    setSelectedFile([]);
    setPreview([]);
    setValidation({
      homePage: "",
      name: "",
      email: "",
      message: "",
      token: "",
    });
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
            onChange={(e) => onSetName(e.target.value)}
          />
          {validation.name.length > 0 && (
            <div className="error">{validation.name}</div>
          )}
        </div>
        {/* email */}
        <div>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Your e-mail*"
            value={email}
            onChange={(e) => onSetEmail(e.target.value)}
          />
          {validation.email.length > 0 && (
            <div className="error">{validation.email}</div>
          )}
        </div>
        {/* home page */}
        <div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Home page"
            value={homePage}
            onChange={(e) => onSetHomePage(e.target.value)}
          />
          {validation.homePage.length > 0 && (
            <div className="error">{validation.homePage}</div>
          )}
        </div>
        {/* message */}
        <div>
          <textarea
            className="form-control mb-3"
            placeholder="Your message*"
            value={message}
            onChange={handleInputChange}
          />
          {/*   buttons */}
          <div className="mb-3 d-flex justify-content-end">
            <button
              type="button"
              onClick={() => setMessage(message + "<i> </i>")}
              className="btn btn-outline-primary me-2"
            >
              [i]
            </button>
            <button
              type="button"
              onClick={() => setMessage(message + "<strong> </strong>")}
              className="btn btn-outline-primary me-2"
            >
              [strong]
            </button>
            <button
              type="button"
              onClick={() => setMessage(message + "<code> </code>")}
              className="btn btn-outline-primary me-2"
            >
              [code]
            </button>
            <button
              type="button"
              onClick={() => setMessage(message + "<a href=”” title=””> </a>")}
              className="btn btn-outline-primary me-2"
            >
              [a]
            </button>
          </div>
        </div>
        {validation.message.length > 0 && (
          <div className="error">{validation.message}</div>
        )}
        {isSuccessSend === false && (
          <div className="error">An error occurred, try again please</div>
        )}
        <hr className="mb-0" />
        <UploadImg
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
        {/*    reCAPTCHA */}
        <div className="mt2">
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={`${process.env.REACT_APP_SITE_KEY_CAPTCHA_ANSWER}`}
            onChange={onSendToken}
          />
        </div>
        {validation.token.length > 0 && (
          <div className="error">{validation.token}</div>
        )}
        {/* button */}
        <div className="text-end">
          <button
            disabled={isConnected}
            type="submit"
            className="btn btn-primary mt-4"
          >
            Send answer
          </button>
        </div>
      </form>
    </>
  );
};

type FormType = {
  childId: number;
  isConnected: boolean;
};
