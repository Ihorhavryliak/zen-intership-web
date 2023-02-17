import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { AppDispatch } from "../../../redux/store";


type FormRegister = {};
export const FormRegister = (props: FormRegister) => {
  const dispatch: AppDispatch = useDispatch();
  //const isSuccessSend = useSelector(getIsSuccessMessage);

  const initialRef: any = null;
  const captchaRef = useRef(initialRef);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState("");
  const [isVerificationToken, setIsVerificationToken] = useState(false);

  // SendMessage
  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* check */
    if (name.length === 0 || email.length === 0 ) {
      return setValidation("All field require");
    }
    captchaRef.current.reset();
    if (isVerificationToken === false) {
      return setValidation("Confirm the captcha");
    }
    //dispatch(sendMessage(name, email, message, homePage));
    /* clean */
    setName("");
    setEmail("");
    setValidation("");
    setIsVerificationToken(false);
  };
  //-----
  return (
    <>
      <form onSubmit={onSendMessage} className="z__index__6 position__relative">
        <h1 className="h1__bold">Sghn-up</h1>
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
          {/* password */}
          <div>
          <input
            type="password"
            className="input"
            placeholder="Your password*"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      {/*   validation */}
        {validation.length > 0 && (
          <div className="not__valid">{validation}</div>
        )}
      {/*   {isSuccessSend === false && (
          <div className="not__valid">An error occurred, try again please</div>
        )} */}
        {/* button */}
        <div>
          <button className="btn">Send message</button>
        </div>
      </form>
    </>
  );
};
