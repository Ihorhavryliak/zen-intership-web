import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onRegistration } from "../../redux/AuthReducer/Auth_reducer";
import { getIsSuccessMessage } from "../../redux/AuthReducer/Auth_selector";
import { AppDispatch } from "../../redux/store";

export const FormRegister = () => {
  const dispatch: AppDispatch = useDispatch();
  const isSuccessSend = useSelector(getIsSuccessMessage);
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
  });
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
  const [password, setPassword] = useState("");
  const onSetPassword = (value: string) => {
    setPassword(value);
    setValidation({ ...validation, password: "" });
  };

  // SendMessage
  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
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
    } else if (password.length === 0) {
      return setValidation({ ...validation, password: "Field require" });
    }

    dispatch(onRegistration(name, email, password));
  };
  //-----//
  return (
    <>
      {(isSuccessSend === null || isSuccessSend === false) && (
        <form
          onSubmit={onSendMessage}
          className="z__index__6 position__relative"
        >
          <h1 className="h1__bold">Sign-up</h1>
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
          {/* password */}
          <div>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Your password*"
              value={password}
              onChange={(e) => onSetPassword(e.target.value)}
            />
          </div>
          {/*   validation */}
          {validation.password.length > 0 && (
            <div className="error">{validation.password}</div>
          )}
          {/* button */}
          <div>
            <button className="btn btn-primary">Sign-up</button>
          </div>
          {/* error */}
          {isSuccessSend === false && (
            <div className="error">An error occurred, try again please</div>
          )}
        </form>
      )}
      {isSuccessSend === true && (
        <div className="fs-1">
          <div className="fs-1">You successfully registered</div>
          <div className="text-center">
            <NavLink to="/" className="btn btn-success">
              Go to home
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
