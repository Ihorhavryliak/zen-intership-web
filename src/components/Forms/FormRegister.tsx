import {  useState } from "react";
import { useDispatch } from "react-redux";
import { onRegistration } from "../../redux/AuthReducer/Auth_reducer";
import { AppDispatch } from "../../redux/store";

type FormRegister = {};

export const FormRegister = (props: FormRegister) => {
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  // SendMessage
  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* check */
    if (name.length === 0 || email.length === 0) {
      return setValidation("All field require");
    }
    dispatch(onRegistration(name, email, password));
    /* clean */
    setName("");
    setEmail("");
    setPassword("");
    setValidation("");
  };
  //-----//
  return (
    <>
      <form onSubmit={onSendMessage} className="z__index__6 position__relative">
        <h1 className="h1__bold">Sign-up</h1>
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
        {/* password */}
        <div>
          <input
            type="password"
            className="form-control mb-3"
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
          <button className="btn btn-primary">Sign-up</button>
        </div>
      </form>
    </>
  );
};
