import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { sendAnswer } from "../../redux/SendMessageRedux/send_message_redux";
import { getIsSuccessMessage } from "../../redux/SendMessageRedux/send_message_selector";
import { AppDispatch } from "../../redux/store";
import { UploadImg } from "../Home/UploadImg";
import sanitizeHtml from "sanitize-html";
import { isValidUrl } from "../../utils/validationUrl";

type FormType = {
  childId: number;
};

export const FormAnswer = (props: FormType) => {
  const { childId } = props;
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);
  const [validation, setValidation] = useState({
    homePage: "",
    name: "",
    email: "",
    message: "",
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
  const [preview, setPreview] = useState([]);

  // SendMessage
  const onSendAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //check validation ---
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
    //send ---
    dispatch(sendAnswer(name, email, message, homePage, childId, selectedFile));
    /* clean */
    setName("");
    setEmail("");
    setHomePage("");
    setMessage("");
    setSelectedFile([]);
    setPreview([]);
    setValidation({ homePage: "", name: "", email: "", message: "" });
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
          <div className="mb-3">
            <button
              onClick={() => setMessage(message + "<i> </i>")}
              className="btn btn-outline-primary me-2"
            >
              [i]
            </button>
            <button
              onClick={() => setMessage(message + "<strong> </strong>")}
              className="btn btn-outline-primary me-2"
            >
              [strong]
            </button>
            <button
              onClick={() => setMessage(message + "<code> </code>")}
              className="btn btn-outline-primary me-2"
            >
              [code]
            </button>
            <button
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
        <UploadImg
          preview={preview}
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
        />
             {/*    reCAPTCHA */}

        {/*   <ReCAPTCHA
          ref={captchaRef}
          sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
          onChange={onSendToken}
        /> */}
        {/* button */}
        <div className="text-end">
          <button className="btn btn-primary mt-4">Send answer</button>
        </div>
      </form>
    </>
  );
};
